"use strict";const sw=self;function getRes(e){return new Promise((s=>{""===e&&(e="index.html");const t=indexedDB.open("Mono");t.onsuccess=()=>{const n=t.result;if(n.objectStoreNames.length){const n=t.result.transaction("monoRes","readonly").objectStore("monoRes").get(e);n.onsuccess=()=>{if(n.result){const e=n.result.d;e.arrayBuffer().then((t=>{s(new Response(t,{headers:{"Content-Type":e.type}}))}))}else s(new Response("Hmm...somewhere that got lost on the way &#129300 maybe a bug",{headers:{"Content-Type":"text/html"}}))}}else n.close(),fetch(e).then(s).catch((()=>s(new Response("Hmm...perhaps there is no internet &#129300",{headers:{"Content-Type":"text/html"}}))))}}))}sw.skipWaiting(),sw.addEventListener("fetch",(e=>{const s=new URL(e.request.url).pathname.substr(1);"GET"===e.request.method&&["","manifest.json","index.css","mono.js","index.js","sw.js","ico/on.ico","ico/off.ico","ico/logo.jpg","ico/logo_512.png"].includes(s)&&e.respondWith(getRes(s))}));