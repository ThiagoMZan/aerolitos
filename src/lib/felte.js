import { deserialize } from '$app/forms';

export async function getFelteSuccessResponse(event) {
  const { response } = event.detail;

  const responseText = await response.text();

  return deserialize(responseText);
}