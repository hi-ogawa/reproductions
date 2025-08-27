import { TestClient2 } from '../components/client2';
import { TestClient3 } from '../components/client3';

export default async function AboutPage() {
  console.log("[/about]");
  return (
    <div>
      <h3>About page: {new Date().toISOString()}</h3>
      {process.argv.includes('build') ? <TestClient2 /> : <TestClient3 />}
    </div>
  );
}

export const getConfig = async () => {
  return {
    // render: 'static',
    render: 'dynamic',
  } as const;
};
