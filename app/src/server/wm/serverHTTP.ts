
/**
 * SIMPLE HTTP SERVER
 */

import fs from "fs";
import sHTTP from "http";

import * as appSettings from "./appSettings";

export function create() {

    return sHTTP.createServer(function (req, res) {

        let file: Buffer,
            type: string;

        switch (req.url) {
            case "/":
                file = fs.readFileSync(`${process.cwd()}/index.html`);
                type = "text/html";
                break;
            case "/index.css":
                file = fs.readFileSync(`${process.cwd()}/index.css`);
                type = "text/css";
                break;
            default:
                if (!fs.existsSync(process.cwd() + req.url)) return;
                file = fs.readFileSync(process.cwd() + req.url);
                type = "text/javascript";
                break;
        }

        res.writeHead(200, {
            'Content-Type': type,
            'Content-Length': file.length,
        }).end(file);

    }).listen(appSettings.settings.port);

}
