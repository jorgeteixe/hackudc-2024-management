import QRCode from "qrcode";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return new Response("You must specify a code", {
      status: 400,
    });
  }

  try {
    const qrPng = await new Promise<Buffer>((resolve, reject) => {
      QRCode.toBuffer(code, (err, buffer) => {
        if (err) reject(err);
        else resolve(buffer);
      });
    });

    return new Response(qrPng, {
      status: 200,
      headers: { "Content-Type": "image/png" },
    });
  } catch (err) {
    return new Response("Error generating QR code: " + err, {
      status: 500,
    });
  }
}
