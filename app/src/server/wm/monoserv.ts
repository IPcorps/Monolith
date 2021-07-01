
/**
 * === THE MAIN SERVER MODULE ===
 */

import http from "http";

import { settings } from "./settings";
import * as serverHTTP from "./serverHTTP";
import * as serverWS from "./serverWS";

export { settings };
export const runHTTP = () => serverHTTP.create(settings);
export const runWS = (sHTTP: http.Server) => serverWS.create(sHTTP, settings);
