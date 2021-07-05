
/**
 * APPLICATION SCRIPT (SERVER)
 */

import * as monoserv from "./wm/monoserv";

// HTTP server
const sHTTP = monoserv.runHTTP();

// WebSocket  server
// @ts-ignore
const sWS = monoserv.runWS(sHTTP);


// THE CODE OF THE APPLICATION BEING DEVELOPED
// sWS.on(...)

