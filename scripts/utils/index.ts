import {spawn} from "child_process";
import * as path from "path";

export const projectRootPath = path.resolve(__dirname, "../../");

export const packagesPath = path.join(projectRootPath, "packages");

export const componentsPath = path.join(packagesPath, "components");
export const componentsLibPath = path.join(componentsPath, "lib");

export const cliPath = path.join(packagesPath, "cli");
export const cliLibPath = path.join(cliPath, "lib");

export const playPath = path.join(projectRootPath, "play");

export const docPath = path.join(projectRootPath, "doc");

export const readmePath = path.join(projectRootPath, "README.md");
export const licensePath = path.join(projectRootPath, "LICENSE");

export const runCommand = async (command: string, path: string) => {
  //cmd表示命令，args代表参数，如 rm -rf  rm就是命令，-rf就为参数
  const [cmd, ...args] = command.split(" ");
  return new Promise((resolve, reject) => {
    const app = spawn(cmd, args, {
      cwd: path, //执行命令的路径
      stdio: "inherit", //输出共享给父进程
      shell: true, //mac不需要开启，windows下git base需要开启支持
    });
    //执行完毕关闭并resolve
    app.on("close", resolve);
    app.on("error", reject);
  });
};
