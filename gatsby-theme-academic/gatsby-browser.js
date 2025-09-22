import {
  wrapPageElement as _wrapPageElement,
} from './src/utils/providers';

export const wrapPageElement = _wrapPageElement;

export const onRouteUpdate = () => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  if (!('serviceWorker' in window.navigator)) {
    return;
  }

  window.navigator.serviceWorker
    .register('/sw.js')
    .then((reg) => {
      reg.update();
    })
    .catch((error) => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('Service worker registration failed', error);
      }
    });
};

// trigger an immediate page refresh when an update is found
export const onServiceWorkerUpdateReady = () => {
  console.log('update found, reload the page');
  window.location.reload(true);
};
