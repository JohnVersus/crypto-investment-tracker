function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function executedFunction(...args: Parameters<F>) {
    const later = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
export default debounce;
