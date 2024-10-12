import {parallel, src} from "gulp";
import * as gulpClean from "gulp-clean";
import {componentsLibPath, componentsPath} from "../../utils";
import * as path from "path";

const libReadmePath = path.join(componentsPath, "README.md");
const licensePath = path.join(componentsPath, "LICENSE");

const cleanLib = () => src(componentsLibPath, {read: false, allowEmpty: true}).pipe(gulpClean({force: true}));

const cleanReadme = () => src(libReadmePath, {read: false, allowEmpty: true}).pipe(gulpClean({force: true}));

const cleanLicense = () => src(licensePath, {read: false, allowEmpty: true}).pipe(gulpClean({force: true}));

export const _cleanComponents = parallel(cleanLib, cleanLicense, cleanReadme);
