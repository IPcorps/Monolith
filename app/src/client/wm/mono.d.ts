/**
 * THE MAIN CLIENT MODULE
 */
import * as mSio from "socket.io-client";
import mDexie from "dexie";
export declare namespace MONO {
    export import mWS = mSio;
    const wsMono: mWS.Socket<import("socket.io-client/build/typed-events").DefaultEventsMap, import("socket.io-client/build/typed-events").DefaultEventsMap>;
    export import mDX = mDexie;
    const dxMono: mDX;
}
