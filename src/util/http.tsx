// https://www.carlrippon.com/fetch-with-async-await-and-typescript/
export async function http(
  request: RequestInfo
): Promise<any> {
  const response = await fetch(request);
  // console.log(response.ok)
  const body = await response.json();
  return body;
}