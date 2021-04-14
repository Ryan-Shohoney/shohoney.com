const REST_ENDPOINT = 'guests';

export async function getGuests(): Promise<{ guests: Array<{ firstName: string, lastName: string, _id: string }> }> {
  const result = await fetch(`${process.env.SERVICE_URL}/${REST_ENDPOINT}`);
  const json = await result.json();
  return json;
}

export async function get<T>(restEndpoint: string): Promise<T> {
  const result = await fetch(`${process.env.SERVICE_URL}/${restEndpoint}`);
  const json = await result.json();
  return json;
}

export async function post<T>(restEndpoint: string, body: T): Promise<void> {
  const result = await fetch(`${process.env.SERVICE_URL}/${restEndpoint}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function del(restEndpoint: string, body: { _id: string }): Promise<void> {
  console.warn(body);
  await fetch(`${process.env.SERVICE_URL}/${restEndpoint}?party=${body}`, {
    method: 'DELETE',
    body: JSON.stringify(body),
  });
}