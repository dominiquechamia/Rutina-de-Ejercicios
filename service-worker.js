// ==========================================
// ✦ SPARKLE ROUTINE ✦
// service-worker.js
// ==========================================

const CACHE_NAME =
    "sparkle-routine-v9";


const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",

    "./images/gif.gif",
    "./images/png.gif",
    "./images/meme.jpg",
    "./images/ts.jpg",

    "./icons/icon-192.png",
    "./icons/icon-512.png",

    "./sounds/sparkle.mp3"
];


// ==========================================
// INSTALAR
// ==========================================

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches
                .open(CACHE_NAME)

                .then(async cache => {

                    /*
                    Guardamos cada archivo por separado.
                    Si uno falta, no rompe toda la app.
                    */

                    await Promise.allSettled(

                        FILES_TO_CACHE.map(
                            file =>
                                cache.add(file)
                        )

                    );

                })

        );


        self.skipWaiting();
    }
);


// ==========================================
// ACTIVAR
// ==========================================

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches
                .keys()

                .then(cacheNames => {

                    return Promise.all(

                        cacheNames.map(
                            cacheName => {

                                if (
                                    cacheName !==
                                    CACHE_NAME
                                ) {

                                    return caches.delete(
                                        cacheName
                                    );

                                }

                            }
                        )

                    );

                })

        );


        self.clients.claim();
    }
);


// ==========================================
// FETCH
// ==========================================

self.addEventListener(
    "fetch",
    event => {

        if (
            event.request.method !== "GET"
        ) {
            return;
        }


        event.respondWith(

            /*
            NETWORK FIRST:
            intenta cargar primero
            la versión nueva.
            */

            fetch(event.request)

                .then(response => {

                    if (
                        !response ||
                        response.status !== 200
                    ) {
                        return response;
                    }


                    const copy =
                        response.clone();


                    caches
                        .open(CACHE_NAME)

                        .then(cache => {

                            cache.put(
                                event.request,
                                copy
                            );

                        });


                    return response;
                })


                .catch(() => {

                    return caches.match(
                        event.request
                    );

                })

        );
    }
);
