import { unstable_rerenderRoute } from "waku/router/server";
import { prisma } from "../db";

export const Counter = async () => {
  return (
    <form
      className="border-blue-400 -mx-4 mt-4 rounded-sm border border-dashed p-4"
      action={async () => {
        "use server";
        await updateCounter(1);
        unstable_rerenderRoute("/");
      }}
    >
      <div>Count: {getCounter()}</div>
      <button className="rounded-xs bg-black px-2 py-0.5 text-sm text-white">
        Increment
      </button>
    </form>
  );
};

const COUNTER_ID = 1;

async function getCounter() {
  const counter = await prisma.counter.findUnique({
    where: { id: COUNTER_ID },
  });
  return counter?.value ?? 0;
}

async function updateCounter(change: number) {
  const counter = await prisma.counter.upsert({
    where: { id: COUNTER_ID },
    update: { value: { increment: change } },
    create: { id: COUNTER_ID, value: change },
  });
  return counter.value;
}
