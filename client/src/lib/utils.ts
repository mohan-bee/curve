/**
 * Merges class names, filtering out falsy values.
 * Drop-in replacement for the `cn` / `clsx` pattern used across UI components.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
