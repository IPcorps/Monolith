
/**
 * SIMPLE HTTP/HTTPS SERVER
 */

import mFs from "fs";
import mHttpS from "https";
import mHttp from "http";

import * as mAppSettings from "./appSettings";
import * as mMime from "./mime";

export function create() {

    let server: typeof mHttpS | typeof mHttp = mHttpS;
    let options: mHttpS.ServerOptions = {
        key: mFs.readFileSync("../server/crt/localhost.d.key"),
        cert: mFs.readFileSync("../server/crt/localhost.crt"),
    };
    if (!mAppSettings.settings.https) { server = mHttp; options = {}; }

    return server.createServer(options, (req, res) => {

        let file: Buffer,
            type: string;

        if (req.url === "/") req.url = "/index.html";
        const path = process.cwd() + req.url;

        if (mFs.existsSync(path)) {
            file = mFs.readFileSync(path);
            const ext = path.match(/[^.]*$/)?.[0];
            type = mMime.mime[ext ? ext : ""] as string;
        } else {
            file = Buffer.from("Hmm...something strange has happened &#129300");
            type = "text/html";
        }

        res.writeHead(200, {
            "Content-Type": type,
            "Content-Length": file.length,
        }).end(file);

    }).listen(mAppSettings.settings.port);

}
