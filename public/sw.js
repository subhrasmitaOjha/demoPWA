// console.warn("service worker from public ")
let cachedata="aapV1";

this.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(cachedata).then((cache)=>{
            cache.addAll([
                "/static/js/bundle.js",
                "/static/js/main-chunk.js",
                "/static/js/O.chunck.js",
                "/favicon.ico",
                "/locales/en/translation.json",
                "/static/media/Material-Design-Iconic-Font.6ee80f4bf5d3f92f3bf7.woff2",
                "/manifest.json",
                "/static/media/e2e-color-01.1529c5bd8dd148b9bb9bb46580ec0860.svg",
                "/icon192.png",
                "/index.html",
                "/ws",
                "/static/media/logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg",
                "/",
                "/users"
            ])
        })
    )
})
this.addEventListener("fetch",(event)=>{
    if(!navigator.onLine){
        event.respondWith(
            caches.match(event.request).then((result)=>{
                if(result){
                    return result;
                }
                let requestURL = event.request.clone();
                return fetch(requestURL);
            })
        )
    }
    
})