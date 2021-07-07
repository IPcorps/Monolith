
/**
 * CREATE A RESOURCE MAP
 */

import mFs from "fs";

export interface IMetaFile {
    n: string,
    s: number,
    t: number
}

export const arrMetaFiles: IMetaFile[] = [];

export function create() {
    arrMetaFiles.length = 0;
    function files(dir: string) {
        const dirEnts = mFs.readdirSync(dir, { withFileTypes: true });
        dirEnts.forEach(dirEnt => {
            const path = `${dir}/${dirEnt.name}`;
            if (dirEnt.isDirectory()) files(path);
            else {
                const fStats = mFs.statSync(path);
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
