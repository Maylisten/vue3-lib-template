import {dest, parallel, series, src} from "gulp";
import {componentsPath, licensePath, readmePath, runCommand} from "../../utils";
import {cleanComponents} from "../../clean";

const buildLib = async () => runCommand('pnpm run build', componentsPath);

const copyReadme = () => src(readmePath).pipe(dest(componentsPath));

const copyLicense = () => src(licensePath).pipe(dest(componentsPath));

export const _buildComponents = series(cleanComponents, parallel(buildLib, copyReadme, copyLicense));
