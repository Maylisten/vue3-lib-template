import {series} from "gulp";
import {docPath, runCommand} from "../../utils";
import {cleanDoc} from "../../clean";

const buildLib = async () => runCommand('pnpm run build', docPath);

export const _buildDoc = series(cleanDoc, buildLib);
