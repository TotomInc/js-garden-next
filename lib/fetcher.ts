export async function fetcher(...args: [string]) {
  const res = await fetch(...args);

  return res.json();
}
