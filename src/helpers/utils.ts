import { ipcRenderer } from 'electron';
import { Events, StoreResponse } from '../../types/index';

export const onEvent = <R = unknown>(
  event: Events,
  callback: (response: StoreResponse<R>) => void
) => {
  ipcRenderer.on(event, (_, body: StoreResponse<R>) => {
    if (body.error) {
      console.log(`error on "${event}"`);

      console.log(body);
      return;
    }

    callback(body);
  });
};

export const onEventOnce = <R = unknown>(
  event: Events,
  callback: (response: StoreResponse<R>) => void
) => {
  ipcRenderer.once(event, (_, body: StoreResponse<R>) => {
    if (body.error) {
      console.log(`error on "${event}"`);

      console.log(body);
      return;
    }

    callback(body);
  });
};

export const sendEvent = <B = unknown>(event: Events, body?: B) => {
  ipcRenderer.send(event, body);
};

export const fetchEvent = async <B = unknown, R = unknown>(
  event: Events,
  body: B,
  timeout = 5000
): Promise<StoreResponse<R>> => {
  let done = false;

  // send an event
  sendEvent(event, body);

  // wait in promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (done) return;

      done = true;

      reject('request timed out');
    }, timeout);

    ipcRenderer.once(event, (_, response: StoreResponse<R>) => {
      if (done) return;

      done = true;

      if (response.error) {
        reject(response.error);
      } else {
        resolve(response);
      }
    });
  });
};
