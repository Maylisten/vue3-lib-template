import {series} from "gulp";

import * as tasks from "./modules";

export * from "./modules";

export const build = series(...Object.values(tasks));
