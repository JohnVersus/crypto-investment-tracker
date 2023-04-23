type AsyncFunction<T> = (...args: any[]) => Promise<T>;

async function retry<T>(
  asyncFunction: AsyncFunction<T>,
  args: unknown[],
  maxRetries = 3
): Promise<T> {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      const result = await asyncFunction(...args);
      if (result) {
        return result;
      }
    } catch (error) {
      console.error(`Error (attempt ${attempts + 1}):`, error);
    }
    attempts++;
  }
  throw new Error("Unable to fetch data after multiple attempts.");
}

export default retry;
