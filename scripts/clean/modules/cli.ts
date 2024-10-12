import {parallel, src} from "gulp";
import * as gulpClean from "gulp-clean";
import {cliLibPath, cliPath} from "../../utils";
import * as path from "path";

const readmePath = path.join(cliPath, "README.md");
const licensePath = path.join(cliPath, "LICENSE");

const cleanLib = () => src(cliLibPath, {read: false, allowEmpty: true}).pipe(gulpClean({force: true}));

const cleanReadme = () => src(readmePath, {read: false, allowEmpty: true}).pipe(gulpClean({force: true}));

const cleanLicense = () => src(licensePath, {read: false, allowEmpty: true}).pipe(gulpClean({force: true}));

export const _cleanCli = parallel(cleanLib, cleanLicense, cleanReadme);
