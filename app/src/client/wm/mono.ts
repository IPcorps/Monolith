
// Library namespace
namespace Mono {

    const ws = require("socket.io-client")();

    // Initializing and connecting a socket
    export function init() {
        ws.on("connect", async () => console.log("The socket is connected"));
    }

}

module.exports = { Mono };
