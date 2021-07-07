
/**
 * APPLICATION SCRIPT (CLIENT)
 */

import { MONO } from "./wm/mono";

// Initializing and connecting a socket
MONO.wsMono.on("connect", async () => console.log("The socket is connected"));

// The first data of the server response: the operating mode and the resource map
MONO.wsMono.on("upds:createMap", (devMode, arrMetaFiles) => {
    console.log(devMode);
    console.log(arrMetaFiles);
});

