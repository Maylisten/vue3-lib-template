import download from "download-git-repo";
import chalk from "chalk";
import ora from "ora";
import path from "path";
import shelljs from "shelljs";
import {readJSON, writeJSON} from "fs-extra";
import {deleteFileLines, replaceFileLetters} from "./utils";
import {UserOptions} from "./options";

const templateRemoteUrl = "Maylisten/vue3-lib-template";
let domain = "";
let gitPath = "";
let name = "";
let completeName = "";
let rootPath = "";
let packagesPath = "";
let cliPath = "";
let scriptsPath = "";
let componentsPath = "";
let playPath = "";
let docPath = "";

const setProjectInfo = (option: UserOptions) => {
  const projectName = option.name;
  gitPath = option.git;
  domain = projectName.trim().split("/").at(-2) ?? "";
  name = projectName.trim().split("/").at(-1);
  completeName = `${domain}${domain ? "/" : ""}${name}`;
  rootPath = path.join(process.cwd(), name);
  packagesPath = path.join(rootPath, 'packages');
  cliPath = path.join(packagesPath, 'cli');
  scriptsPath = path.join(rootPath, 'scripts');
  componentsPath = path.join(packagesPath, 'components');
  playPath = path.join(rootPath, 'play');
  docPath = path.join(rootPath, 'doc');
};

const downloadCompleteTemplate = () => {
  const downSpinner = ora("正在下载模板...").start();
  return new Promise((resolve, reject) => {
    download(templateRemoteUrl, name, {clone: false}, (err) => {
      if (err) {
        downSpinner.fail();
        reject(err);
        return;
      }
      downSpinner.succeed(chalk.green("模板下载成功！"));
      resolve(1);
    });
  });
};

const removeCliDir = () => {
  shelljs.rm("-rf", cliPath);
};

const removeCliPackageJsonScripts = () => {
  const packageJsonPaths = [path.join(rootPath, "package.json"), path.join(scriptsPath, "package.json")];
  packageJsonPaths.forEach(path => {
    deleteFileLines(path, /[Cc]li/);
  });
};

const removeCliScripts = () => {
  const scriptsPaths = ['build', 'clean', "release"].map(dir => path.join(scriptsPath, dir, "modules"));
  const cliFiles = scriptsPaths.map(dir => path.join(dir, 'cli.ts'));
  const indexFiles = scriptsPaths.map(dir => path.join(dir, 'index.ts'));
  cliFiles.filter(filePath => {
    shelljs.rm("-rf", filePath);
  });
  indexFiles.filter(filePath => {
    deleteFileLines(filePath, /[Cc]li/);
  });
};

const removeCli = () => {
  removeCliDir();
  removeCliPackageJsonScripts();
  removeCliScripts();
};

const resetComponentsPackageJson = async () => {
  const componentsPackageJsonPath = path.join(rootPath, "./packages/components/package.json");
  const json = await readJSON(componentsPackageJsonPath, {encoding: 'utf8'}) as Record<string, unknown>;
  json.name = completeName;
  json.version = `0.0.0`;
  json.keywords = [];
  json.description = "";
  json.author = "";
  json.homepage = `${gitPath}`;
  json.main = `./lib/${name}.cjs`;
  json.module = `./lib/${name}.js`;
  json.browser = `./lib/${name}.cjs`;
  json.exports = {
    ".": {
      "import": `./lib/${name}.js`,
      "require": `./lib/${name}.cjs`,
      "types": "./lib/index.d.ts"
    },
    "./style.css": {
      "import": "./lib/style.css",
      "require": "./lib/style.css",
      "default": "./lib/style.css"
    }
  };
  (json.repository as Record<string, unknown>).url = `git+${gitPath}`;
  (json.bugs as Record<string, unknown>).url = `${gitPath}/issues`;
  await writeJSON(componentsPackageJsonPath, json, {spaces: 2});
};

const resetPlayDependence = async () => {
  const replaceFilePaths = [path.join(playPath, "package.json"), path.join(playPath, "src/pages/DemoPage.vue")];
  replaceFilePaths.forEach(filePath => {
    replaceFileLetters(filePath, "@xuhan57/vue3-lib-template-components", completeName);
  });
};

const removeTailwind = async () => {
  const tailwindConfigFilename = "tailwind.config.js";
  const tailwindConfigPaths = [path.join(componentsPath, tailwindConfigFilename), path.join(playPath, tailwindConfigFilename)];
  tailwindConfigPaths.forEach(filePath => {
    shelljs.rm("-rf", filePath);
  });

  const postcssFilePath = path.join(rootPath, "postcss.config.mjs");
  shelljs.rm("-rf", postcssFilePath);

  deleteFileLines(path.join(rootPath, "package.json"), "tailwindcss");
  deleteFileLines(path.join(rootPath, "package.json"), "postcss");

  const styleCssPaths = [path.join(componentsPath, "style.css"), path.join(playPath, "src/style.css")];
  styleCssPaths.forEach(filePath => shelljs.rm("-rf", filePath));

  const entryPaths = [path.join(componentsPath, "index.ts"), path.join(playPath, "src/main.ts")];
  entryPaths.forEach(filePath => deleteFileLines(filePath, "style.css"));

  const tailwindDemoComponentPath = path.join(componentsPath, "src/tailwind-button");
  shelljs.rm("-rf", tailwindDemoComponentPath);

  const componentsEntryPath = path.join(componentsPath, "src/index.ts");
  deleteFileLines(componentsEntryPath, "tailwind-button");
};

const removeDoc = async () => {
  const deletePaths = [
    path.join(docPath),
    ...['build', 'clean', 'dev'].map(dir => path.join(scriptsPath, `${dir}/modules/doc.ts`))
  ];
  deletePaths.forEach(targetPath => shelljs.rm("-rf", targetPath));

  const deleteLinePaths = [
    path.join(rootPath, "package.json"),
    path.join(scriptsPath, "package.json"),
    ...['build', 'clean', 'dev'].map(dir => path.join(scriptsPath, `${dir}/modules/index.ts`))
  ];
  deleteLinePaths.forEach(path => {
    deleteFileLines(path, /[Dd]oc/);
  });
};

const shake = async (options: UserOptions) => {
  const downSpinner = ora("正在初始化模板...").start();
  try {
    const {tailwind, document} = options;
    removeCli();
    await resetComponentsPackageJson();
    await resetPlayDependence();
    if (!tailwind) {
      await removeTailwind();
    }
    if (!document) {
      await removeDoc();
    }
    downSpinner.succeed(chalk.green("模板初始化成功！"));
  } catch (err) {
    downSpinner.fail();
    throw new Error(err);
  }
};

export const downloadTemplate = async (options: UserOptions) => {
  setProjectInfo(options);
  await downloadCompleteTemplate();
  await shake(options);
};
