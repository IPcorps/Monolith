/**
 * === WS SERVER ===
 */

import socketIO from "socket.io";
import http from "http";

import { Settings } from "./settings";
import wsUpd from "./wsUpd";
import wsUsr from "./wsUsr";

export function create(sHTTP: http.Server, _settings: Settings) {

    const sWS = new socketIO.Server(sHTTP);

    sWS.on("connection", (socket: socketIO.Socket) => {
        [wsUpd, wsUsr].forEach(val => val(sWS, socket));
    });

    return sWS;

}
