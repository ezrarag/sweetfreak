export async function postToFacebook(
  message: string,
  imageUrl: string | undefined,
  pageId: string,
  accessToken: string
) {
  const response = await fetch(`https://graph.facebook.com/v23.0/${pageId}/feed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: imageUrl ? `${message}\n${imageUrl}` : message,
      access_token: accessToken,
    }),
  });

  if (!response.ok) {
    throw new Error('Facebook post failed.');
  }

  return response.json();
}
