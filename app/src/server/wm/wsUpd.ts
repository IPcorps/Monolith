
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
    socket.on("updc:getMap",
        (res: (pDevMode: boolean, pArrMeta: mResourcMap.IMetaFile[]) => void) => {
            res(mAppSettings.settings.devMode, mResourcMap.arrMetaFiles);
        });

    // Sending the requested file to the client
    socket.on("updc:getFile", (pPath: string) => {

        const sFile = mFs.createReadStream(pPath);
        sFile.on("data", chunk => socket.emit("upds:retFile", false, chunk));
        const ext = pPath.match(/[^.]*$/)?.[0];
        sFile.on("end", () => socket.emit("upds:retFile", true, mMime.mime[ext ? ext : ""]));
        sFile.on("error", console.log);

    });

}
