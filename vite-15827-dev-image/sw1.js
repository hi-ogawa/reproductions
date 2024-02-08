const cacheList = ['/src/index.css', '/src/assets/react.svg'];

// 2. sw will be installed by the browser when the sw registration is done
this.addEventListener('install', function (event) {
  console.log('[2-install]Service worker installing...');

  event.waitUntil(
    caches.open('sw-v1').then((cache) => cache.addAll(cacheList))
  );
});

// 3. sw will be activated by the browser when the sw installation is done
this.addEventListener('activate', function (event) {
  console.log('[3-activate]Service worker activating...');
});

this.addEventListener('fetch', function (event) {
  const url = new URL(event.request.url);

  if (url.origin === location.origin && cacheList.includes(url.pathname) && !url.search) {
    console.log('cache hit', url.pathname);
    event.respondWith(
      caches.open('sw-v1').then(async function (cache) {
        const response = await cache.match(url.pathname);

        if (response) {
          console.log('cache hit', response);
          return response;
        }

        return fetch(event.request);
      })
    );
  }
});
