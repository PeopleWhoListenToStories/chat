import request from "../../utils/request"

// 创建新订单
export const  createOrderApi  = (params:any) => request.post('/create-order',params)
