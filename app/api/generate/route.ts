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
    const qrSvg = await QRCode.toString(code, { type: "svg" });

    return new Response(qrSvg, {
      status: 200,
      headers: { "content-type": "image/svg+xml" },
    });
  } catch (err) {
    return new Response("Error generating QR code", {
      status: 500,
    });
  }
}
