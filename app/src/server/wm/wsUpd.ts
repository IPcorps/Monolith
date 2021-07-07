
/**
 * "upd" EVENTS OF THE WEBSOCKET
 */

import mSocketIO from "socket.io";

import * as mAppSettings from "./appSettings";
import * as mResourcMap from "./resourceMap";

// Called when the client connects to the server
export default function (_sWS: mSocketIO.Server, socket: mSocketIO.Socket) {

    // Sending resource metadata and the work flag
    socket.emit("upds:createMap", mAppSettings.settings.devMode, mResourcMap.arrMetaFiles);

}
