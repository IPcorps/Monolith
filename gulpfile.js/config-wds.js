
// For WebDevSynergy

module.exports = {
    ts: {
        use: true,                              // TypeScript -> JavaScript
        dirFrom: "app\\src",                    // Replacing the path from
        dirTo: "app\\out",                      // Replacing the path to
        mini: true,                             // Using minification
        // extjs: ".m.js",                      // Server file extensions for the node
        // middle: true                         // Saving an intermediate non-minified file during minification.
    },
    node: {
        use: true                               // Server file change watcher
    },
    bs: {
        use: true,                              // Browser-sync
        updConf: {                              // Updating the configuration in development mode
            "files": ["app/out/client/**/*"]
        }
    }
}
