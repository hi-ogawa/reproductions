import { TestClient1 } from '../components/client1';

export default async function HomePage() {
  console.log("[/]");
  return (
    <div>
      <h3>Home page: {new Date().toISOString()}</h3>
      <TestClient1 />
    </div>
  );
}


export const getConfig = async () => {
  return {
    // render: 'static',
    render: 'dynamic',
  } as const;
};
