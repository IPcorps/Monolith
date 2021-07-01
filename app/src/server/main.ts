
import * as monoserv from "./wm/monoserv";

const sHTTP = monoserv.runHTTP();

const sWS = monoserv.runWS(sHTTP);
