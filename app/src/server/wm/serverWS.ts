/**
 * WS SERVER
 */

import socketIO from "socket.io";
import http from "http";

import wsUpd from "./wsUpd";

export function create(sHTTP: http.Server) {
    const sWS = new socketIO.Server(sHTTP);
    sWS.on("connection", (socket: socketIO.Socket) => wsUpd(sWS, socket));
    return sWS;
}
