import { action, observable } from "mobx";
import { LoginApi, getUserInfoApi } from "../../api/index";

export default class Login {
  @observable off: boolean = false;
  @observable userInfo: any = {};

  @action
  async LoginUser(params: any) {
    const result = await LoginApi(params);
    if (result.status === 200) {
      return true;
    } else {
      return false;
    }
  }
  @action
  async getUserInfo(params: any) {
    const result:any = await getUserInfoApi(params);
    if(result.status === 200){
      this.userInfo = result.info
    }
  }
}
