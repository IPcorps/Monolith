
// About the options: https://webpack.js.org/configuration/#options

module.exports = {
    mode: "production",
    output: {
        filename: "index.js"
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
                    }
                },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    stats: "summary"
}
