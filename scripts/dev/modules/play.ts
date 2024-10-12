import {series} from "gulp";
import {playPath, runCommand} from "../../utils";
import {buildComponents} from "../../build";

const play = () => runCommand("pnpm run dev", playPath);
export const _devPlay = series(buildComponents, play);
