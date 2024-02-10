import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RecoilSync } from 'recoil-sync';

createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <RecoilSync>
      <h1>Test</h1>
    </RecoilSync>
  </RecoilRoot>
);
