import {parallel} from "gulp";
import * as tasks from "./modules";

export * from "./modules";

export const clean = parallel(...Object.values(tasks));
