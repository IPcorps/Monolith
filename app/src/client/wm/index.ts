
import { io } from "socket.io-client";

console.log("Test");

// client-side
let ws = io();

ws.on("connect", async () => {
    ws.emit("toServer", "Hi Server!");
});

ws.on("toClient", (msg: any[]) => {
    console.log("message: " + msg);
})
