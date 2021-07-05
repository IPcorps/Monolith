
/**
 * CREATE A RESOURCE MAP
 */

import fs from "fs";

export interface IMetaFile {
    n: string,
    s: number,
    t: number
}

export const arrMetaFiles: IMetaFile[] = [];

export function create() {
    arrMetaFiles.length = 0;
    function files(dir: string) {
        const dirEnts = fs.readdirSync(dir, { withFileTypes: true });
        dirEnts.forEach(dirEnt => {
            const path = `${dir}/${dirEnt.name}`;
            if (dirEnt.isDirectory()) files(path);
            else {
                const fStats = fs.statSync(path);
                arrMetaFiles.push({
                    n: path,
                    s: fStats.size,
                    t: fStats.mtimeMs
                });
            };
        });
    }
    files(".");
}
