import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import DemoLayout from '@/layout/DemoLayout.vue';

const routes: Readonly<RouteRecordRaw[]> = [
  {path: '/', redirect: "/test/demo"},
  {
    path: "/test", component: DemoLayout,
    children: [
      {
        path: "demo", name: "demo", component: () => import("@/pages/DemoPage.vue")
      }
    ]
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
