const CACHE_NAME = "myamauta-v1"; //Nombre de la cache para almacenar los archivos de la aplicación

const urlsToCache = [ //Lista de URLs de los archivos que se van a cachear para que la aplicación funcione sin conexión a internet
  "./",
  "./index.html",
  "./styles.css",
  "./amauta.js"
];

//Evento de instalación del service worker, se ejecuta cuando el service worker se instala por primera vez
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener("fetch", event => { //Evento de fetch, se ejecuta cada vez que la aplicación hace una solicitud de un recurso (como un archivo HTML, CSS o JS)
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request); //Si el recurso solicitado se encuentra en la cache, se devuelve desde la cache, de lo contrario, se realiza una solicitud de red para obtenerlo
      })
  );
});

