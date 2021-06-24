
import http from "http";
import fs from "fs";

http.createServer(function (req, res) {

    const readStream = fs.createReadStream(process.cwd() + req.url);

    readStream.on('open', function () {
        readStream.pipe(res);
    });

    readStream.on('error', function (err) {
        res.end(err.toString());
    });

}).listen(3456);
