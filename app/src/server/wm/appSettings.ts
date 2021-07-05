
/**
 * APPLICATION SETTINGS
 */

import fs from "fs";

// Settings from the settings.json file
export type Settings = { port: number, devMode: boolean };
export const settings: Settings =
    JSON.parse(fs.readFileSync(`${process.cwd()}/../server/wm/settings.json`).toString());
