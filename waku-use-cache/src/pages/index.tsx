import { Link } from 'waku';

import { Counter } from '../components/counter';

export default async function HomePage() {
  return (
    <div>
      <Counter />
      <Link to="/about" className="mt-4 inline-block underline">
        About page
      </Link>
      <CachedComponent />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};

import {
  cacheTag,
  cacheLife,
  revalidateTag,
} from "vite-plugin-react-use-cache/runtime";

async function CachedComponent() {
  "use cache";

  cacheLife("seconds");
  cacheTag("home-page");

  console.log("[Rendering CachedComponent... (1sec)]");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div>
      <div>rendered at {new Date().toString()}</div>
      <form
        action={async () => {
          "use server";
          await revalidateTag("home-page");
        }}
      >
        <button type="submit">Revalidate Home</button>
      </form>
    </div>
  );
}
