import * as components from "./src";
import {App} from "vue";
import "./style.css";

export * from "./src";

export default {
  install: (Vue: App) => {
    Object.values(components).forEach((component) => {
      Vue.use(component);
    });
  },
};
