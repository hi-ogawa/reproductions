// NODE_DEBUG=esm npx tsx src/repro-happy-dom.tsx

import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RecoilSync } from 'recoil-sync';

GlobalRegistrator.register({ url: 'http://localhost:3000', width: 1920, height: 1080 });

const el = document.createElement("div")
document.body.appendChild(el);
createRoot(el).render(
  <RecoilRoot>
    <RecoilSync>
      <h1>Test</h1>
    </RecoilSync>
  </RecoilRoot>
);
console.log(el.textContent)
