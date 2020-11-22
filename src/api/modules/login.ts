import request from "../../utils/request"

// 登录
export const LoginApi = (params:any) => request.post('/login-user',params)

// 获取用户信息
export const getUserInfoApi = (params:any) => request.post('/user-info',params)
