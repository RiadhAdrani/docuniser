import { ipcMain } from 'electron';
import { useWin } from '../main';
import { Events, StoreResponse } from 'types';

type EventCallback<B = unknown, R = unknown> = (body: B) => R;

export const log = (msg: string) => {
  console.log(`[STORE]: ${msg}`);
};

export const on: <B = unknown, R = unknown>(
  event: Events,
  callback: EventCallback<B, R>
) => void = (event, callback) => {
  ipcMain.on(event, (_, body) => {
    log(`received event "${event}"`);

    let response: StoreResponse = { data: undefined };

    try {
      const data = callback(body);

      response.data = data as unknown;
      log(`processed event "${event}" successfully`);
    } catch (error) {
      log(`error processing event "${event}"`);
      log(`body = ${body}`);

      response.error = `${error}`;
    }

    useWin()?.webContents.send(event, response);
  });
};
