/**
 * WS SERVER
 */

import mSocketIO from "socket.io";
import mHttp from "http";

import mWsUpd from "./wsUpd";

export function create(sHTTP: mHttp.Server) {
    const sWS = new mSocketIO.Server(sHTTP);
    sWS.on("connection", (socket: mSocketIO.Socket) => mWsUpd(sWS, socket));
    return sWS;
}
