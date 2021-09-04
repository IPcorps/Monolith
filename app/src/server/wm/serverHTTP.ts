
/**
 * SIMPLE HTTP/HTTPS SERVER
 */

import mFs from "fs";
import mHttpS from "https";
import mHttp from "http";
import mURL from "url";
import mPath from "path";

import * as mAppSettings from "./appSettings";
import * as mMime from "./mime";

export function create() {

    const fHttps = mAppSettings.settings.https;

    let server: typeof mHttpS | typeof mHttp = mHttpS;
    let options: mHttpS.ServerOptions = {
        key: mFs.readFileSync("../server/crt/localhost.d.key"),
        cert: mFs.readFileSync("../server/crt/localhost.crt"),
    };
    if (!fHttps) { server = mHttp; options = {}; }

    return server.createServer(options, (req, res) => {

        let file: Buffer,
            type: string;

        const url = new mURL.URL("http://" + req.headers.host + req.url);
        let pathName = url.pathname;

        if (pathName === "/") pathName = "/index.html";
        const path = process.cwd() + pathName;

        if (mFs.existsSync(path)) {
            file = mFs.readFileSync(path);
            const ext = mPath.extname(path).substr(1);
            type = mMime.mime[ext]!;
        } else {
            file = Buffer.from("Hmm...something strange has happened &#129300");
            type = "text/html";
        }

        res.writeHead(200, {
            "Content-Type": type,
            "Content-Length": file.length,
        }).end(file);

    }).listen(process.env["PORT"] || mAppSettings.settings.port);

}
