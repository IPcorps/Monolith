
/**
 * THE MAIN SERVER MODULE
 */

import http from "http";

import * as appSettings from "./appSettings";
import * as resourcMap from "./resourcMap";
import * as serverHTTP from "./serverHTTP";
import * as serverWS from "./serverWS";

export { appSettings };
if (!appSettings.settings.devMode) resourcMap.create();
export const runHTTP = () => serverHTTP.create();
export const runWS = (sHTTP: http.Server) => serverWS.create(sHTTP);
