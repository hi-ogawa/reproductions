import { createServer, createViteRuntime } from 'vite';

const server = await createServer({});

const runtime = await createViteRuntime(server, {
  sourcemapInterceptor: "prepareStackTrace"
});

await runtime.executeEntrypoint(process.argv[2])
