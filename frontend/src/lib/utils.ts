type ClassValue = string | number | boolean | undefined | null | Record<string, boolean>;

/**
 * Combine CSS class names conditionally.
 * Simple implementation without external dependencies.
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flatMap((input) => {
      if (!input) return [];
      if (typeof input === "string" || typeof input === "number") return [String(input)];
      if (typeof input === "object") {
        return Object.entries(input)
          .filter(([, v]) => v)
          .map(([k]) => k);
      }
      return [];
    })
    .join(" ");
}

/**
 * Format a number as Indian Rupees.
 */
export function formatSalary(amount: number | null | undefined): string {
  if (!amount) return "Not disclosed";

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} LPA`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount}`;
}

/**
 * Format a salary range (e.g., "₹18L - ₹35L").
 */
export function formatSalaryRange(
  min: number | null | undefined,
  max: number | null | undefined,
  currency = "INR"
): string {
  if (!min && !max) return "Not disclosed";
  if (min && !max) return `${formatSalary(min)}+`;
  if (!min && max) return `Up to ${formatSalary(max)}`;
  return `${formatSalary(min)} - ${formatSalary(max)}`;
}

/**
 * Format a relative time string (e.g., "2 days ago").
 */
export function timeAgo(dateString: string | null | undefined): string {
  if (!dateString) return "Recently";

  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`;

  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

/**
 * Truncate a string to a max length with ellipsis.
 */
export function truncate(str: string, maxLength = 100): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Generate initials from a name (e.g., "John Doe" → "JD").
 */
export function getInitials(name: string | null | undefined): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Debounce a function call.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Format a number with commas (e.g., 1000000 → "10,00,000" for Indian locale).
 */
export function formatNumber(num: number): string {
  return num.toLocaleString("en-IN");
}

/**
 * Extract skills as a comma-separated string.
 */
export function formatSkills(skills: string[] | undefined | null): string {
  if (!skills || skills.length === 0) return "No skills listed";
  return skills.join(", ");
}

/**
 * Get a color for a badge based on the work mode.
 */
export function getWorkModeColor(
  mode: string | null | undefined
): string {
  switch (mode?.toLowerCase()) {
    case "remote":
      return "var(--success-500)";
    case "hybrid":
      return "var(--warning-500)";
    case "onsite":
      return "var(--primary-500)";
    default:
      return "var(--gray-400)";
  }
}
