/**
 * THE MAIN CLIENT MODULE
 */
import * as sio from "socket.io-client";
export declare namespace Mono {
    const ws: sio.Socket<import("socket.io-client/build/typed-events").DefaultEventsMap, import("socket.io-client/build/typed-events").DefaultEventsMap>;
    function init(): void;
}
