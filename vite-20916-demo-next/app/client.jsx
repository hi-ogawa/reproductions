"use client";

export function TestClient() {
  return (
    <div>
      <button onClick={() => {
        testError();
      }}>
        Test error
      </button>
      <button onClick={() => {
        testUnhandledRejection();
      }}>
        Test unhandledrejection
      </button>
    </div>
  );
}

function testError() {
  throw new Error('this is test error')
}


async function testUnhandledRejection() {
  throw new Error('this is test unhandledrejection')
}
