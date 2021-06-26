
import { createServer } from "http";
import { readFileSync } from "fs";
import { Server, Socket } from "socket.io";

// Server settings from the settings.json file
type Settings = { port: number, devMode: boolean };
const settings: Settings = JSON.parse(readFileSync(`${process.cwd()}/../server/wm/settings.json`).toString());

// === HTTP ===
const serverHTTP = createServer(function (req, res) {

    let file: Buffer,
        type: string;

    switch (req.url) {
        case "/index.css":
            file = readFileSync(`${process.cwd()}/index.css`);
            type = "text/css";
            break;
        case "/index.js":
            file = readFileSync(`${process.cwd()}/index.js`);
            type = "text/javascript";
            break;
        default:
            file = readFileSync(`${process.cwd()}/index.html`);
            type = "text/html";
            break;
    }

    res.setHeader("Content-Type", type);
    res.setHeader("Content-Length", file.length);
    res.write(file);
    res.end();

}).listen(settings.port);

// === WS ===
const serverWS = new Server(serverHTTP);

serverWS.on("connection", (socket: Socket) => {
    socket.on("toServer", (msg: any[]) => {
        console.log("message: " + msg);
        socket.emit("toClient", "Hi Client!");
    });
});
