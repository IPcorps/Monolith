
// About the options:
// https://webpack.js.org/configuration/#options,
// https://www.npmjs.com/package/ts-loader

module.exports = {
    mode: "production",
    output: {
        filename: "index.js"
    },
    optimization: {
        emitOnErrors: true,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    compilerOptions: {
                        module: "ESNext",
                        moduleResolution: "node"
                    },
                    context: `${process.cwd()}/app/src/client/wm`,
                    logInfoToStdOut: true
                },
                exclude: /node_modules/
            }
        ],
    }
}
