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
import { unstable_rerenderRoute } from 'waku/router/server';

async function CachedComponent() {
  "use cache";

  cacheLife("minutes");
  cacheTag("home-page");

  console.log("[Rendering CachedComponent... (0.5sec)]");
  await new Promise((resolve) => setTimeout(resolve, 500));

  return (
    <div>
      <div>rendered at {new Date().toString()}</div>
      <form
        action={async () => {
          "use server";
          unstable_rerenderRoute('/');
          await revalidateTag("home-page");
        }}
      >
        <button type="submit">Revalidate Home</button>
      </form>
    </div>
  );
}
