import { action, observable } from "mobx";
// import { createOrderApi } from "../../api/index";

export default class Poker {
  [key: string]: any;
  @observable off: boolean = false;
  @observable pokerList: any[] = [];

  @action // 保存玩家扑克牌
  async saveUserPoker(params: any) {
    Object.keys(params.outPokerList).forEach((item: any) => {
      if (item !== sessionStorage.getItem("user") && !this.pokerList.find((v:any)=> v.key === item))
        this.pokerList.push({
          key: item,
          value: params.outPokerList[item],
          name: item
        });
    });
  }

  @action // 清除当前房间记录的扑克牌
  async clearPokerList() {
    this.pokerList = [];
    this.off = false;
  }
}
