import { NavLink } from "./client";
import "./index.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <nav className="nav">
            <div className="nav-links">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/other">Other</NavLink>
              <NavLink href="/slow/1000">Slow (1s)</NavLink>
              <NavLink href="/slow/2000">Slow (2s)</NavLink>
            </div>
          </nav>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
