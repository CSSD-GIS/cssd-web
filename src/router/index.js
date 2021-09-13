import Vue from "vue";
import Router from "vue-router";
import Topmenu from "@/menu/topindex.vue";
import Login from "@/views/login/index.vue";
import RealTime from "@/views/realTime.vue";
import Show from "@/views/resultShow.vue";
Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "登陆界面",
      hasSubMenu: true,
    },
  },
  {
    path: "/main",
    name: "menu",
    component: Topmenu,
    meta: {
      title: "导航栏", // 菜单标题
      hasSubMenu: false, // 是否包含子菜单，false 没有子菜单；true 有子菜单
    },
    children: [
      {
        path: "/views/realTime",
        name: "time",
        component: RealTime,
        meta: {
          title: "实时画面",
          icon: "el-icon-user-solid",
          hasSubMenu: true,
        },
      },
      {
        path: "/views/show",
        name: "Show",
        component: Show,
        meta: {
          title: "展示",
          hasSubMenu: false,
        },
      },
    ],
  },
];

export default new Router({
  routes,
});
