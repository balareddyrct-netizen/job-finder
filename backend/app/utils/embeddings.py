"""Embedding Utilities.

Generates text embeddings using Google Gemini API for
vector similarity search in Qdrant.
"""

from typing import Optional
import numpy as np
from app.config import get_settings

settings = get_settings()

# Lazy-loaded Gemini client
_genai_client = None


def _get_genai_client():
    """Get or create the Gemini API client (lazy init)."""
    global _genai_client
    if _genai_client is None:
        try:
            import google.generativeai as genai
            genai.configure(api_key=settings.GEMINI_API_KEY)
            _genai_client = genai
        except Exception as e:
            print(f"⚠️ Gemini API not configured: {e}")
            return None
    return _genai_client


async def generate_embedding(text: str) -> Optional[list[float]]:
    """Generate an embedding vector for the given text using Gemini.

    Args:
        text: The text to embed (will be truncated to 8000 chars).

    Returns:
        A list of floats representing the embedding vector, or None on failure.
    """
    genai = _get_genai_client()
    if not genai or not settings.GEMINI_API_KEY:
        return None

    try:
        # Truncate long text
        text = text[:8000]

        result = genai.embed_content(
            model=f"models/{settings.GEMINI_EMBEDDING_MODEL}",
            content=text,
            task_type="retrieval_document",
        )
        return result["embedding"]
    except Exception as e:
        print(f"Embedding error: {e}")
        return None


async def generate_query_embedding(text: str) -> Optional[list[float]]:
    """Generate an embedding optimized for search queries.

    Uses 'retrieval_query' task type for better search relevance.
    """
    genai = _get_genai_client()
    if not genai or not settings.GEMINI_API_KEY:
        return None

    try:
        text = text[:2000]  # Queries are shorter

        result = genai.embed_content(
            model=f"models/{settings.GEMINI_EMBEDDING_MODEL}",
            content=text,
            task_type="retrieval_query",
        )
        return result["embedding"]
    except Exception as e:
        print(f"Query embedding error: {e}")
        return None


def cosine_similarity(vec_a: list[float], vec_b: list[float]) -> float:
    """Calculate cosine similarity between two vectors."""
    a = np.array(vec_a)
    b = np.array(vec_b)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))


# Qdrant helpers
_qdrant_client = None


def _get_qdrant_client():
    """Get or create the Qdrant client (lazy init)."""
    global _qdrant_client
    if _qdrant_client is None:
        try:
            from qdrant_client import QdrantClient
            _qdrant_client = QdrantClient(
                host=settings.QDRANT_HOST,
                port=settings.QDRANT_PORT,
            )
        except Exception as e:
            print(f"⚠️ Qdrant not available: {e}")
            return None
    return _qdrant_client


async def store_embedding(
    collection: str,
    point_id: str,
    vector: list[float],
    payload: dict | None = None,
) -> bool:
    """Store an embedding vector in Qdrant.

    Args:
        collection: The Qdrant collection name.
        point_id: Unique ID for this point.
        vector: The embedding vector.
        payload: Optional metadata to store with the vector.

    Returns:
        True on success, False on failure.
    """
    client = _get_qdrant_client()
    if not client:
        return False

    try:
        from qdrant_client.models import PointStruct

        client.upsert(
            collection_name=collection,
            points=[
                PointStruct(
                    id=point_id,
                    vector=vector,
                    payload=payload or {},
                )
            ],
        )
        return True
    except Exception as e:
        print(f"Qdrant store error: {e}")
        return False


async def search_similar(
    collection: str,
    query_vector: list[float],
    limit: int = 10,
    score_threshold: float = 0.5,
) -> list[dict]:
    """Search for similar vectors in Qdrant.

    Args:
        collection: The Qdrant collection name.
        query_vector: The query embedding vector.
        limit: Maximum number of results.
        score_threshold: Minimum similarity score.

    Returns:
        List of dicts with 'id', 'score', and 'payload' keys.
    """
    client = _get_qdrant_client()
    if not client:
        return []

    try:
        results = client.search(
            collection_name=collection,
            query_vector=query_vector,
            limit=limit,
            score_threshold=score_threshold,
        )
        return [
            {
                "id": str(hit.id),
                "score": hit.score,
                "payload": hit.payload,
            }
            for hit in results
        ]
    except Exception as e:
        print(f"Qdrant search error: {e}")
        return []
