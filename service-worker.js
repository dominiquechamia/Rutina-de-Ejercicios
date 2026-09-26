// ==========================================
// ✦ SPARKLE ROUTINE ✦
// service-worker.js
// ==========================================


const CACHE_NAME =
    "sparkle-routine-v5";



const FILES_TO_CACHE = [

    "./",

    "./index.html",

    "./style.css",

    "./app.js",

    "./manifest.json",

    "./images/gif.gif",

    "./images/png.gif",

    "./images/meme.jpg",

    "./images/ts.jpg"

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

                .then(cache => {

                    return cache.addAll(
                        FILES_TO_CACHE
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
                                    cacheName
                                    !==
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
            event.request.method
            !==
            "GET"
        ) {

            return;

        }



        event.respondWith(


            fetch(
                event.request
            )


            .then(response => {


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