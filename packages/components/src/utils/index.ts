import type {App, Plugin} from "vue";

type SFCWithInstall<T> = T & { install: Exclude<Plugin['install'], undefined> };

export const withInstall = <T>(comp: T) => {
  const component = comp as unknown as SFCWithInstall<typeof comp>;
  component.install = (Vue: App) => {
    Vue.component("AlertButton", component);
  };
  return component;
};
