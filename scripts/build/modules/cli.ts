import {dest, parallel, series, src} from "gulp";
import {cliPath, licensePath, readmePath, runCommand} from "../../utils";
import {cleanCli} from "../../clean";

const buildLib = async () => runCommand('pnpm run build', cliPath);

const copyReadme = () => src(readmePath).pipe(dest(cliPath));

const copyLicense = () => src(licensePath).pipe(dest(cliPath));

export const _buildCli = series(cleanCli, parallel(buildLib, copyReadme, copyLicense));
