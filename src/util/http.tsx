// interface HttpResponse<T> extends Response {
//   parsedBody?: T;
// }
// export async function http<T>(
//   request: RequestInfo
// ): Promise<HttpResponse<T>> {
//   const response: HttpResponse<T> = await fetch(
//     request
//   );

//   try {
//     // may error if there is no body
//     response.parsedBody = await response.json();
//   } catch (ex) {}

//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }
//   return response;
// }
// https://www.carlrippon.com/fetch-with-async-await-and-typescript/
export async function http(
  request: RequestInfo
): Promise<any> {
  const response = await fetch(request);
  // console.log(response.ok)
  const body = await response.json();
  return body;
}