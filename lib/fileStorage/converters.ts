export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as any);
    reader.readAsDataURL(blob as any);
  });
}

export function blobUrlToObject(url: string): Promise<Blob> {
  return fetch(url).then((r) => r.blob());
}

export async function blobUrlToBase64(url: string): Promise<string> {
  return await blobToBase64(await blobUrlToObject(url));
}

export function base64ToBuffer(base64: string): Buffer {
  return Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
}
