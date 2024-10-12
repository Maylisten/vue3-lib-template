import {cliPath, runCommand} from "../../utils";
import {series} from "gulp";
import {buildCli} from "../../build";

const releaseCli = () => runCommand("pnpm run release", cliPath);
export const _releaseCli = series(buildCli, releaseCli);
