import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "HackUDC Management",
  description: "APP for managing the hackathon internals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-[#181818] dark:text-white">
        <main className="max-w-sm mx-auto">{children}</main>
      </body>
    </html>
  );
}
