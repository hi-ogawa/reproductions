import { it } from "vitest"
import { RecoilRoot, atom, useRecoilState, useRecoilCallback, useRecoilSnapshot } from 'recoil';
import { RecoilSync } from 'recoil-sync';
import { render } from '@testing-library/react';

it('1', () => {
  render(
    <RecoilRoot>
      <RecoilSync>
        <h1>Test</h1>
      </RecoilSync>
    </RecoilRoot>
  );
});

it('x', () => {
  function Inner() {
    useRecoilSnapshot();
    return <h1>Test</h1>
  }

  render(
    <Inner />
  );

  // render(
  //   <RecoilRoot>
  //     <Inner />
  //   </RecoilRoot>
  // );
});

// it('x', () => {
//   const state = atom({ key: "foo" });

//   function Inner() {
//     useRecoilState(state);
//     return <h1>Test</h1>
//   }

//   render(
//     <Inner />
//   );
// });

// it('y', () => {
//   const state = atom({ key: "foo" });

//   function Inner() {
//     useRecoilState(state);
//     return <h1>Test</h1>
//   }

//   render(
//     <RecoilRoot>
//       <Inner />
//     </RecoilRoot>
//   );
// });


// it('3', () => {
//   render(
//     <RecoilSync>
//       <h1>Test</h1>
//     </RecoilSync>
//   );
// });

// it('2', () => {
//   render(
//     <RecoilRoot>
//       <h1>Test</h1>
//     </RecoilRoot>
//   );
// });
