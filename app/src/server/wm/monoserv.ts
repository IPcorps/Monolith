
/**
 * THE MAIN SERVER MODULE
 */

import mHttp from "http";

import * as mAppSettings from "./appSettings";
import * as mResourceMap from "./resourceMap";
import * as mServerHTTP from "./serverHTTP";
import * as mServerWS from "./serverWS";

export { mAppSettings };
if (!mAppSettings.settings.devMode) mResourceMap.create();
export const runHTTP = () => mServerHTTP.create();
export const runWS = (sHTTP: mHttp.Server) => mServerWS.create(sHTTP);
