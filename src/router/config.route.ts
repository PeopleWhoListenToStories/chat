import { IMenuItem, IRouerItem } from "../utils/interface";
import menus from "../router/menu";
import React from "react";

//login
const Main = React.lazy(() => import("../view/main/Main"));
const Login = React.lazy(() => import("../view/login/Login"));
const Poker = React.lazy(() => import("../view/poker/Poker"));

// 错误处理页面
const NoFound = React.lazy(() => import("../view/error/NoFound"));
const NoServer = React.lazy(() => import("../view/error/NoServer"));

const routerConfig = {
  routes: [
    {
      path: "/main",
      meat:{
        name:'主'
      },
      component: Main,
      children: [],
    },
    {
      path: "/poker/:id",
      meat:{
        name:'扑克'
      },
      component: Poker,
    },
    {
      path: "/login",
      meat:{
        name:'登录'
      },
      component: Login,
    },
    {
      path: "/NoServer",
      component: NoServer,
    },
    {
      path: "/",
      redirect: `/main`,
      // redirect: `/main/${getFirstRedirect(menus)}`
    },
    {
      path: "/NoFound",
      component: NoFound,
    },
    {
      path: "*",
      component: NoFound,
    },
  ],
};
export default routerConfig;
