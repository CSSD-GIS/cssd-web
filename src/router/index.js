import Vue from "vue";
import Router from "vue-router";

// 菜单
import MenuIndex from "@/menu/menuIndex.vue";
import Class from "@/views/class/index.vue";
import Test from "@/views/floorOne.vue";
import Img from "@/views/file_up/img_up/index.vue";
import Video from "@/views/file_up/video_up/index.vue";
import Color from "@/color.vue";
import Login from "@/views/login/index.vue";
import One from "@/views/floorOne.vue";
import Time from "@/views/realTime.vue";
import Layout from "@/layout";
Vue.use(Router);

let routes = [{
        path: "/",
        // redirect: '/menu',
        name: "login",
        component: Login,

        meta: {
            title: "登陆界面",
            hasSubMenu: true
        }
    },

    {
        path: "/main",
        name: "menu",
        component: MenuIndex,
        meta: {
            title: "首页", // 菜单标题
            icon: "el-icon-s-home", // 图标
            hasSubMenu: false // 是否包含子菜单，false 没有子菜单；true 有子菜单
        },

        children: [{
                path: "/views/class",
                name: "Class",
                component: Class,

                meta: {
                    title: "课堂画面",
                    icon: "el-icon-user-solid",
                    hasSubMenu: true
                }
            },
            {
                path: "/views/realTime",
                name: "time",
                component: Time,
                meta: {
                    title: "实时画面",
                    icon: "el-icon-user-solid",
                    hasSubMenu: true
                }
            },
            {
                path: "/views/floorOne",
                name: "floor1",
                component: One,
                meta: {
                    title: "检测画面",
                    icon: "el-icon-user-solid",
                    hasSubMenu: true
                }
            },

            {
                path: "/views/img",
                name: "Img",
                component: Img,
                meta: {
                    title: "图片",
                    icon: "el-icon-user-solid",
                    hasSubMenu: true
                }
            },
            {
                path: "/views/video",
                name: "Videot",
                component: Video,
                meta: {
                    title: "视频",
                    icon: "el-icon-user-solid",
                    hasSubMenu: true
                }
            },
            {
                path: "/views/color",
                name: "Color",
                component: Color,
                meta: {
                    title: "颜色",
                    icon: "el-icon-user-solid",
                    hasSubMenu: true
                }
            }
        ]
    }
];

export default new Router({
    routes
});