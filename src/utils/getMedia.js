export default async function getMedia(constraints) {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

    return mediaStream;
  } catch (err) {
    console.error(err);
  }
}
