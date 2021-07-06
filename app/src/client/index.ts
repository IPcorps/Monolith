
/**
 * APPLICATION SCRIPT (CLIENT)
 */

import { Mono } from "./wm/mono";

// Initializing and connecting a socket connection
Mono.init();

// THE CODE OF THE APPLICATION BEING DEVELOPED
Mono.ws.on("upds:createMap", (devMode, arrMetaFiles) => {
    console.log(devMode);
    console.log(arrMetaFiles);
});
