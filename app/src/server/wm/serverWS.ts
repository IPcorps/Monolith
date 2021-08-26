/**
 * WS SERVER
 */

import mHttp from "http";
import mSocketIO from "socket.io";

import mWsUpd from "./wsUpd";

export function create(sHTTP: mHttp.Server, init: (sHTTP: mHttp.Server, sWS: mSocketIO.Server, socket: mSocketIO.Socket) => void) {
    const sWS = new mSocketIO.Server(sHTTP, { pingTimeout: 6e5 });
    sWS.on("connect", (socket: mSocketIO.Socket) => {
        mWsUpd(sWS, socket);
        init(sHTTP, sWS, socket);
        socket.on("disconnect", console.log);
    });
    return sWS;
}
