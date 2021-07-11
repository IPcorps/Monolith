
/**
 * APPLICATION SCRIPT (SERVER)
 */

import * as mMonoserv from "./wm/monoserv";

// HTTP server
const sHTTP = mMonoserv.runHTTP();

// WebSocket server
// @ts-ignore
const sWS = mMonoserv.runWS(sHTTP);


// THE CODE OF THE APPLICATION BEING DEVELOPED
// sWS.on(...)

