export async function postToTwitter(
  message: string,
  apiKey: string,
  apiSecret: string,
  accessToken: string,
  accessSecret: string
) {
  const credentials = Buffer.from(
    `${apiKey}:${apiSecret}:${accessToken}:${accessSecret}`
  ).toString('base64');

  const response = await fetch('https://api.twitter.com/2/tweets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify({
      text: message,
    }),
  });

  if (!response.ok) {
    throw new Error('Twitter post failed.');
  }

  return response.json();
}
