import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { IRouerItem } from "../utils/interface"
import { getCookie } from "../utils/myCookie"
import useStore from '../context/useStore'

// 登录白名单
const whileList = ['/login', '/main', '/NoFound', 'NoServer']

interface Iprops {
  routes: IRouerItem[]
}

const RouterView: React.FC<Iprops> = (props) => {
  return <Switch>
    {
      props.routes && props.routes.map(item => {
        // 页面重定向
        if (item.redirect) {
          return <Redirect key={item.path} from={item.path} to={item.redirect}></Redirect>
        }
        return <Route key={item.path} path={item.path} render={(props) => {
          let isPath = props.match.path;
          // 用户登录拦截
          if (!whileList.includes(isPath) && !getCookie('token')) {
            props.history.replace(`/login?redirect=${encodeURIComponent(isPath)}`);
          }

          // 获取不到用户信息就重新获取
          // if (getCookie('token') && !Object.keys(MainStore.user_info).length) {
          //   //  获取用户基本信息
          //   MainStore.getUserInfoAction();
          //   //  获取用户权限信息
          //   MainStore.getMenuListAction()
          // }

          if (item.children) {
            return <item.component {...props} routes={item.children} meta={item.meta}></item.component>
          } else {
            return <item.component {...props} meta={item.meta}></item.component>
          }
        }}></Route>
      })
      // .concat(routes.map((item: any) => {
      //   return <Redirect key={item.path} exact from={item.path} to="/403" />
      // }))
      //.concat(
      //   routes.length ? <Redirect key="404" to="/NoFound" /> : <React.Fragment key="404"></React.Fragment>
      // )
      // window.addEventListener('hashchange', (event: HashChangeEvent) => {
      //   changeRoute(routes,  event.newURL.split('#')[1])
      // })
    }

  </Switch>
}


export default RouterView

// function changeRoute(arr: any[], val: string) {
//   console.log(arr, val, '=========')
//   if (arr.find(item => item.path === val)) {
//     return <Redirect to={val}></Redirect>
//   } else {
//     return <Redirect to='/NoFound' ></Redirect>
//   }
// }
