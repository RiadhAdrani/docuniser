import fastify from 'fastify';
// @ts-ignore
import { registerProtocol } from 'electron-server';

const server = fastify({ ignoreTrailingSlash: true });

server.get('/hello', () => {
  console.log('/hello');

  return { text: `hello world` };
});

export const start = async () => {
  await registerProtocol({
    scheme: 'my-scheme',
    server,
  });

  await server.listen();
};
