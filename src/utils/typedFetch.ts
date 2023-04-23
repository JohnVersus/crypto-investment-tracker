async function typedFetch<T>(url: string, options?: RequestInit): Promise<T> {
  console.log(url);
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  const data = (await response.json()) as T;
  return data;
}

export default typedFetch;
