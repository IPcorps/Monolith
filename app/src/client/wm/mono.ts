
/**
 * THE MAIN CLIENT MODULE
 */

import * as mSio from "socket.io-client";
import mDexie from "dexie";

// Library namespace
export namespace MONO {

    // Connection socket
    export import mWS = mSio;
    export const wsMono = mSio.io({
        reconnection: false
    });

    // Wrapper for IndexedDB
    export import mDX = mDexie;
    export const dxMono = new mDexie("Mono");

    // === 1. WebSocket ===============================================================================

    export interface IMeta {
        n: string,      // Name
        s: number,      // Size
        t: number       // Time
    }

    // Result of a request to the resource server
    export const paramsWS: { devMode: boolean, online: boolean, arrMeta: IMeta[] } = {
        devMode: false,
        online: false,
        arrMeta: []
    }

    // Creating a web socket connection to the resource server and getting a resource map
    export function initWS(): Promise<mWS.Socket> {

        return new Promise((res, rej) => {

            // Initializing and connecting a socket
            wsMono.on("connect", () => {
                paramsWS.online = true;
                console.log(">>> The socket is connected");
                setIcon("ico/on.ico");
            });

            // No connection, offline mode
            wsMono.on("connect_error", () => {
                paramsWS.online = false;
                rej(">>> Offline mode");
                setIcon("ico/off.ico");
            });

            // The first data of the server response: the operating mode and the resource map
            wsMono.on("upds:createMap", (pDevMode: boolean, pArrMeta: IMeta[]) => {
                paramsWS.devMode = pDevMode;
                paramsWS.arrMeta = pArrMeta;
                res(wsMono);
            });

        })

    }

    // ================================================================================================

    // === 2. IndexedDB ===============================================================================

    // - PREPARING FOR THE UPDATE

    export enum eStatus { DONE, INSERT, UPDATE, DELETE };

    export interface IMap {
        n: string,     // Name
        s: number,     // Size
        t: number,     // Time
        e: eStatus,    // Status
        d: Blob        // Data
    }

    // Result of checking for updates
    export const paramsDX: { arrMap: IMap[], sizeUpd: number } = {
        arrMap: [],
        sizeUpd: 0
    };

    export async function initDX(): Promise<mDX> {

        dxMono.version(1).stores({ monoRes: "n" });

        const arrMap = await dxMono.table<IMap>("monoRes").toArray();
        const arrMeta = paramsWS.arrMeta as IMap[];

        begin:
        for (let i = arrMap.length - 1; i >= 0; i--) {

            const elMap = arrMap[i]!;

            for (let j = arrMeta.length - 1; j >= 0; j--) {

                const elMeta = arrMeta[j]!;

                // If a match was found
                if (elMap.n === elMeta.n) {

                    // Check the time stamp
                    if (elMap.t === elMeta.t) {
                        elMap.e = eStatus.DONE;
                    } else {
                        elMap.s = elMeta.s;
                        elMap.t = elMeta.t;
                        elMap.e = eStatus.UPDATE;
                        paramsDX.sizeUpd += elMeta.s;
                    }

                    // Remove the processed element from Meta
                    arrMeta.splice(j, 1);
                    // Go to the next element in the Map
                    continue begin;

                }

            }

            // There are no matches, set the status in Map to delete,
            // if the arrMeta has no length, the application is in development mode or offline
            elMap.e = arrMeta.length ? eStatus.DELETE : eStatus.DONE;

        }

        // Configuring the remaining elements in Meta for loading
        arrMeta.forEach(elMeta => {
            elMeta.e = eStatus.INSERT;
            paramsDX.sizeUpd += elMeta.s;
        });

        // Creating the final update map
        paramsDX.arrMap = [...arrMap, ...arrMeta];

        if (paramsWS.online && !paramsWS.devMode)
            console.log(">>> Data has been created for updating the application");

        return dxMono;

    }

    // - UPDATE INDEXEDDB

    // Update progress
    export const paramsUpd: {
        sizeProgress: number, sizeUpd: number, sizeRes: number,
        cb: undefined | ((sizeProgress: number, sizeUpd: number) => void)
    } = {
        sizeProgress: 0,
        sizeUpd: 0,
        sizeRes: 0,
        cb: undefined
    };

    export function updateMono(): Promise<string> {

        return new Promise((res, rej) => {

            if (paramsWS.online && !paramsWS.devMode)
                console.log(">>> The application update process has started");

            const tblMonoRes = dxMono.table<Partial<IMap>>("monoRes");
            paramsUpd.sizeUpd = paramsDX.sizeUpd;

            paramsDX.arrMap.map((el, i, arr) => async () => {

                if (el.e !== eStatus.DELETE) paramsUpd.sizeRes += el.s;

                if (el.e === eStatus.INSERT || el.e === eStatus.UPDATE) {

                    const blob = await getSrv(el.n);
                    el.e === eStatus.INSERT ?
                        await tblMonoRes.add({ n: el.n, s: el.s, t: el.t, d: blob }) :
                        await tblMonoRes.update(el.n, { s: el.s, t: el.t, d: blob });
                    paramsUpd.sizeProgress += el.s;
                    if (paramsUpd.cb) paramsUpd.cb(paramsUpd.sizeProgress, paramsUpd.sizeUpd);

                } else if (el.e === eStatus.DELETE) await tblMonoRes.delete(el.n);

                if (i == arr.length - 1) {
                    if (paramsWS.online && !paramsWS.devMode)
                        console.log(">>> The application update process is completed");
                    res("OK")
                };

            }).reduce((pre, cur) => pre.then(cur), Promise.resolve());

            if (!paramsDX.arrMap.length) rej(">>> Development mode or there is no data in IndexedDB");

        })

    }

    // ================================================================================================

    // === Loader =====================================================================================

    // Getting a file from the server
    export function getSrv(path: string) {
        return new Promise<Blob>(res => {
            wsMono.emit("updc:getFile", path, (pRes: ArrayBuffer, pType: string) =>
                res(new Blob([pRes], { type: pType })));
        });
    }

    // Getting a file from IndexedDB
    export function getIdb(path: string) {
        return new Promise<Blob>(res => {
            dxMono.table("monoRes").get(path)
                .then((obj: IMap) => res(obj.d));
        });
    }

    // Getting a file depending on the operating mode (development/production)
    export function get(path: string) {
        return paramsWS.devMode ? getSrv(path) : getIdb(path);
    }

    // ================================================================================================

    // === Additional functionality ===================================================================

    // A service worker for launching the application in offline mode
    export function setSW() {
        navigator.storage.persist().then(() => navigator.serviceWorker.register("sw.js"));
    }

    // Setting the icon for displaying the online/offline mode of the application
    async function setIcon(path: string) {
        const el = document.querySelector("link[rel='icon']") as HTMLAnchorElement;
        el.href = path;
        document.head.appendChild(el);
    }

    // ================================================================================================

}

export default MONO;
