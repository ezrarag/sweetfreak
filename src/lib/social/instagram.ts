export async function postToInstagram(
  message: string,
  imageUrl: string,
  businessAccountId: string,
  accessToken: string
) {
  const mediaResponse = await fetch(
    `https://graph.facebook.com/v23.0/${businessAccountId}/media`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: imageUrl,
        caption: message,
        access_token: accessToken,
      }),
    }
  );

  if (!mediaResponse.ok) {
    throw new Error('Instagram media creation failed.');
  }

  const mediaPayload = (await mediaResponse.json()) as { id: string };

  const publishResponse = await fetch(
    `https://graph.facebook.com/v23.0/${businessAccountId}/media_publish`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        creation_id: mediaPayload.id,
        access_token: accessToken,
      }),
    }
  );

  if (!publishResponse.ok) {
    throw new Error('Instagram publish failed.');
  }

  return publishResponse.json();
}
