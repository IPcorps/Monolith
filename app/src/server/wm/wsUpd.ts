
/**
 * "upd" EVENTS OF THE WEBSOCKET
 */

import socketIO from "socket.io";

import * as appSettings from "./appSettings";
import * as resourcMap from "./resourcMap";

// Called when the client connects to the server
export default function (_sWS: socketIO.Server, socket: socketIO.Socket) {

    // Sending resource metadata and the work flag
    socket.emit("upds:createMap", appSettings.settings.devMode, resourcMap.arrMetaFiles);

}
