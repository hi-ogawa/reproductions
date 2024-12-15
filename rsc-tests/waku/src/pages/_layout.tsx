import type { ReactNode } from 'react';
import { Link } from 'waku';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <div style={{ display: 'flex', gap: "0.5rem" }}>
        <Link to="/">
          [/]
        </Link>
        <Link to="/cjs">
          [/cjs]
        </Link>
        <Link to="/cjs2">
          [/cjs2]
        </Link>
        <Link to="/context">
          [/context]
        </Link>
        <Link to="/context2">
          [/context2]
        </Link>
        <Link to="/context3">
          [/context3]
        </Link>
      </div>
      {children}
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
