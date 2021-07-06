
/**
 * THE MAIN CLIENT MODULE
 */

import * as sio from "socket.io-client";

// Library namespace
export namespace Mono {

    // Connection socket
    export const ws = sio.io();

    // Initializing and connecting a socket
    export function init() {
        ws.on("connect", async () => console.log("The socket is connected"));
    }

    // The first data of the server response: the operating mode and the resource map
    ws.on("upds:createMap", (devMode, arrMetaFiles) => {
        console.log(devMode);
        console.log(arrMetaFiles);
    });

}

