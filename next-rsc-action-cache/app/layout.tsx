export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div style={{ border: "1px solid black", padding: "20px" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
