// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
) {
  let timeout: ReturnType<typeof setTimeout>; // Correct timeout type for browser and Node.js

  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };

  debounced.cancel = () => clearTimeout(timeout);

  return debounced;
}
