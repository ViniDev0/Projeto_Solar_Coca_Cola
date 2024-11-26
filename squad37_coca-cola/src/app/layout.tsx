import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Main Page",
  description: "All built In Next App for Solar CocaCola",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <header>
          <h1>Solar CocaCola</h1>
        </header> */}
        {children}
        {/* <footer>
          <p>Direitos reservados CocaCola - 2024</p>
        </footer> */}
      </body>
    </html>
  );
}
