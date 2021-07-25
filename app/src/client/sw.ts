
/// <reference lib="WebWorker" />

const sw = self as typeof self & ServiceWorkerGlobalScope;

sw.skipWaiting();
sw.addEventListener("fetch", (fe: FetchEvent) => {

    const arrRes = ["", "manifest.json", "index.css", "mono.js", "index.js", "sw.js", "favicon.ico"];
    const path = fe.request.url.split("/").pop()!;

    if (fe.request.method === "GET" && arrRes.includes(path)) fe.respondWith((() => getRes(path))());

});

function getRes(path: string) {
    return new Promise<Response>(res => {

        if (path === "") path = "index.html";

        const idb = indexedDB.open("Mono");
        idb.onsuccess = () => {

            const db = idb.result;
            if (db.objectStoreNames.length) {
                const req = idb.result.transaction("monoRes", "readonly").objectStore("monoRes").get(path);
                req.onsuccess = () => {
                    if (req.result) {
                        const blob = req.result.d as Blob;
                        blob.text().then(data => {
                            res(new Response(data, {
                                headers: { "Content-Type": blob.type }
                            }));
                        });
                    } else {
                        res(new Response("Hmm...somewhere that got lost on the way &#129300 maybe a bug", {
                            headers: { "Content-Type": "text/html" }
                        }));
                    }
                }
            } else {
                db.close();
                fetch(path)
                    .then(res)
                    .catch(() => res(new Response("Hmm...perhaps there is no internet &#129300", {
                        headers: { "Content-Type": "text/html" }
                    })));
            };

        }

    })
}
