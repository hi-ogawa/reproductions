import { TestClient } from '../components/client';

export default async function HomePage() {
  return (
    <div>
      <TestClient serverPromise={Promise.resolve("ok")}/>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
