import {docPath, runCommand} from "../../utils";

export const _devDoc = () => runCommand("pnpm run dev", docPath);
