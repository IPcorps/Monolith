
/// <reference lib="WebWorker" />

const sw = self as typeof self & ServiceWorkerGlobalScope;

sw.skipWaiting();
sw.addEventListener("fetch", (fe: FetchEvent) => {

    let path = new URL(fe.request.url).pathname.substr(1);

    fe.respondWith(new Promise<Response>(res => {

        if (path === "") path = "index.html";

        const idb = indexedDB.open("Mono");
        idb.onsuccess = () => {

            // Reading from IndexedDB
            const db = idb.result;
            if (db.objectStoreNames.length) {
                const req = db.transaction("monoRes", "readonly").objectStore("monoRes").get(path);
                req.onsuccess = () => {
                    if (req.result) {
                        const blob = req.result.d as Blob;
                        blob.arrayBuffer().then(data => {
                            res(new Response(data, {
                                headers: { "Content-Type": blob.type }
                            }));
                            db.close();
                        });
                    } else fromNet(fe.request);
                }
            } else fromNet(fe.request);

            // Downloading from the Internet
            function fromNet(req: Request) {
                db.close();
                fetch(req)
                    .then(res)
                    .catch(() => res(new Response(`Hmm...something strange has happened &#129300 
                    ...it is possible that the application is not installed, and there is no Internet at the same time.`, {
                        headers: { "Content-Type": "text/html" }
                    })));
            }

        }

    }));

});
