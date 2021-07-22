
/**
 * "upd" EVENTS OF THE WEBSOCKET
 */

import mSocketIO from "socket.io";
import mFs from "fs";

import * as mAppSettings from "./appSettings";
import * as mResourcMap from "./resourceMap";
import * as mMime from "./mime";

// Called when the client connects to the server
export default function (_sWS: mSocketIO.Server, socket: mSocketIO.Socket) {

    // Sending resource metadata and the development flag
    socket.emit("upds:createMap", mAppSettings.settings.devMode, mResourcMap.arrMetaFiles);

    // Sending the requested file to the client
    socket.on("updc:getFile",
        (path: string, res: (pRes: ArrayBuffer, pType: string) => void) => {
            const ext = path.match(/[^.]*$/)?.[0];
            res(mFs.readFileSync(path), mMime.mime[ext ? ext : ""]!);
        });

}
