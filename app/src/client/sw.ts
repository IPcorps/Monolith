
/// <reference lib="WebWorker" />

const sw = self as typeof self & ServiceWorkerGlobalScope;

sw.skipWaiting();
sw.addEventListener("fetch", (fe: FetchEvent) => {

    const path = new URL(fe.request.url).pathname.substr(1);
    const arrRes = ["", "manifest.json", "index.css", "mono.js", "index.js", "sw.js",
        "ico/on.ico", "ico/off.ico", "ico/logo.png", "ico/logo_512.png"];

    if (fe.request.method === "GET" && arrRes.includes(path)) fe.respondWith((() => getRes(path))());

});

function getRes(path: string) {

    return new Promise<Response>(res => {

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
                        });
                    } else fromNet(path);
                }
            } else fromNet(path);

            // Downloading from the Internet
            function fromNet(path: string) {
                db.close();
                fetch(path)
                    .then(res)
                    .catch(() => res(new Response(`Hmm...something strange has happened &#129300 
                    ...it is possible that the application is not installed, and there is no Internet at the same time.`, {
                        headers: { "Content-Type": "text/html" }
                    })));
            }

        }

    })

}
