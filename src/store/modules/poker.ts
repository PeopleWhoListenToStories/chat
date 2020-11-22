import { action, observable } from "mobx";
import { createOrderApi } from "../../api/index";

export default class Poker {
  [key: string]: any;
  @observable off: boolean = false;
  @observable pokerList:any[] = []

  @action // 新增扑克牌方法
  async createOrder(params: any) {
    const result:any = await createOrderApi(params);
    console.log("createOrder...", result);
    if (result.status === 200) {
      // pokerList = result
      this.off = true
      // 过滤出当前用户的手牌
      Object.keys(result.outPokerList).forEach((v:any) => {
        if(v === '111'){
          this.pokerList = result.outPokerList[v]
        }
      })
      return true;
    } else {
      return false;
    }
  }

  @action // 清除当前房间记录的扑克牌
  async clearPokerList(){
    this.pokerList = []
    this.off = false
  }
}
