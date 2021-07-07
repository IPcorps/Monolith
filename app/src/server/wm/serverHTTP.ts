
/**
 * SIMPLE HTTP SERVER
 */

import mFs from "fs";
import mHttp from "http";

import * as mAppSettings from "./appSettings";

export function create() {

    return mHttp.createServer(function (req, res) {

        let file: Buffer,
            type: string;

        switch (req.url) {
            case "/":
                file = mFs.readFileSync(`${process.cwd()}/index.html`);
                type = "text/html";
                break;
            case "/index.css":
                file = mFs.readFileSync(`${process.cwd()}/index.css`);
                type = "text/css";
                break;
            default:
                if (!mFs.existsSync(process.cwd() + req.url)) return;
                file = mFs.readFileSync(process.cwd() + req.url);
                type = "text/javascript";
                break;
        }

        res.writeHead(200, {
            'Content-Type': type,
            'Content-Length': file.length,
        }).end(file);

    }).listen(mAppSettings.settings.port);

}
