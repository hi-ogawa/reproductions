import { TestClient4 } from '../../components/client4';

export default async function AboutPage() {
  console.log("[/wildard/[key]]");
  return (
    <div>
      <h3>About page: {new Date().toISOString()}</h3>
      <TestClient4 />
    </div>
  );
}

export const getConfig = async () => {
  return {
    // render: 'static',
    render: 'dynamic',
  } as const;
};
