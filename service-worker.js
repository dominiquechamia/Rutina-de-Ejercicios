// ==========================================
// ✦ SPARKLE ROUTINE ✦
// service-worker.js
// ==========================================


// Cambia el número de versión cuando hagas
// cambios importantes en la app.
const CACHE_NAME = "sparkle-routine-v6";


// Archivos principales que queremos guardar
// para que la app pueda seguir funcionando
// aunque no haya internet.
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

    "./icons/icon-512.png"

];


// ==========================================
// INSTALACIÓN
// ==========================================

self.addEventListener(
    "install",
    event => {

        console.log(
            "✨ Instalando Sparkle Routine..."
        );


        event.waitUntil(

            caches
                .open(CACHE_NAME)

                .then(cache => {

                    console.log(
                        "✨ Guardando archivos..."
                    );

                    return cache.addAll(
                        FILES_TO_CACHE
                    );

                })

        );


        // Hace que la nueva versión
        // pueda activarse inmediatamente.
        self.skipWaiting();

    }
);


// ==========================================
// ACTIVACIÓN
// ==========================================

self.addEventListener(
    "activate",
    event => {

        console.log(
            "💜 Activando Sparkle Routine..."
        );


        event.waitUntil(

            caches
                .keys()

                .then(cacheNames => {

                    return Promise.all(

                        cacheNames.map(
                            cacheName => {

                                // Borra versiones antiguas.
                                if (
                                    cacheName !==
                                    CACHE_NAME
                                ) {

                                    console.log(
                                        "🗑 Eliminando caché antigua:",
                                        cacheName
                                    );

                                    return caches.delete(
                                        cacheName
                                    );

                                }

                            }
                        )

                    );

                })

        );


        // Hace que esta versión tome
        // el control de la página inmediatamente.
        self.clients.claim();

    }
);


// ==========================================
// PETICIONES / FETCH
// ==========================================

self.addEventListener(
    "fetch",
    event => {

        // Solo guardamos peticiones GET.
        if (
            event.request.method !== "GET"
        ) {

            return;

        }


        event.respondWith(

            // Mientras estás desarrollando,
            // intentamos obtener primero
            // la versión más nueva.
            fetch(
                event.request
            )

                .then(response => {

                    // Si la respuesta no es válida,
                    // simplemente la devolvemos.
                    if (
                        !response ||
                        response.status !== 200
                    ) {

                        return response;

                    }


                    const responseCopy =
                        response.clone();


                    // Actualizamos la caché
                    // con la versión nueva.
                    caches
                        .open(CACHE_NAME)

                        .then(cache => {

                            cache.put(
                                event.request,
                                responseCopy
                            );

                        });


                    return response;

                })


                // Si no hay conexión,
                // usamos lo que está guardado.
                .catch(() => {

                    return caches.match(
                        event.request
                    );

                })

        );

    }
);
