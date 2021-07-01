
// About the options:
// https://webpack.js.org/configuration/#options,
// https://www.npmjs.com/package/ts-loader

module.exports = {
    mode: "production",
    entry: "./app/src/client/wm/mono.ts",
    output: {
        filename: "./app/out/client/mono.js",
        libraryTarget: "umd"
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
                        moduleResolution: "node",
                        declaration: true
                    },
                    context: `${process.cwd()}/app/src/client/wm`,
                    logInfoToStdOut: true
                },
                exclude: /node_modules/
            }
        ],
    }
}
