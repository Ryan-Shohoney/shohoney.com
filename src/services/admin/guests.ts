const REST_ENDPOINT = 'guests';
const API_URI = process.env.GATSBY_SERVICE_URL
export async function getGuests(): Promise<{ guests: Array<{ firstName: string, lastName: string, _id: string }> }> {
  const result = await fetch(`${API_URI}/${REST_ENDPOINT}`);
  const json = await result.json();
  return json;
}

export async function get<T>(restEndpoint: string): Promise<T> {
  const result = await fetch(`${API_URI}/${restEndpoint}`);
  const json = await result.json();
  return json;
}

export async function post<T>(restEndpoint: string, body: T): Promise<void> {
  await fetch(`${API_URI}/${restEndpoint}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function del(restEndpoint: string, body: { _id: string }): Promise<void> {
  fetch(`${API_URI}/${restEndpoint}?party=${body}`, {
    method: 'DELETE',
    body: JSON.stringify(body),
  });
}