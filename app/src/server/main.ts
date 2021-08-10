
/**
 * APPLICATION SCRIPT (SERVER)
 */

import mHttp from "http";
import mSocketIO from "socket.io";

import * as mMonoserv from "./wm/monoserv";

// HTTP server
const sHTTP = mMonoserv.runHTTP();

// WebSocket server
// @ts-ignore
const sWS = mMonoserv.runWS(sHTTP, init);

// THE CODE OF THE APPLICATION BEING DEVELOPED
function init(_sHTTP: mHttp.Server, _sWS: mSocketIO.Server, _socket: mSocketIO.Socket) {

    console.log("Start the application (server)");

}
