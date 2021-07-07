
/**
 * THE MAIN CLIENT MODULE
 */

import * as mSio from "socket.io-client";
import mDexie from "dexie";

// Library namespace
export namespace MONO {

    // Connection socket
    export import mWS = mSio;
    export const wsMono = mSio.io();

    // Wrapper for IndexedDB
    export import mDX = mDexie;
    export const dxMono = new mDexie("MonoUPD");

}
