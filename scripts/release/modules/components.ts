import {componentsPath, runCommand} from "../../utils";
import {series} from "gulp";
import {buildComponents} from "../../build";

export const releaseComponents = async () => runCommand("pnpm run release", componentsPath);
export const _releaseComponents = series(buildComponents, releaseComponents);
