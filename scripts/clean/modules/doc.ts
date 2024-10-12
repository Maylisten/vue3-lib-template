import {src} from "gulp";
import * as gulpClean from "gulp-clean";
import {docPath} from "../../utils";
import * as path from "path";

const docLibPath = path.join(docPath, "lib");

const cleanLib = () => src(docLibPath, {read: false, allowEmpty: true}).pipe(gulpClean({force: true}));

export const _cleanDoc = cleanLib;
