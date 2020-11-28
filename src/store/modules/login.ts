import { action, observable } from "mobx";
import { LoginApi, getUserInfoApi } from "../../api/index";
import { Toast } from "antd-mobile";
import socket from "../../utils/socket";

export default class Login {
  @observable off: boolean = false;
  @observable userInfo: any = {};

  @action
  async LoginUser(params: any) {
    const result: any = await LoginApi(params);
    if (result.status === 200) {
      Toast.info('welcome to home ' + result.user_name  );
      sessionStorage.setItem("user", params.userOrder);
      sessionStorage.setItem("token", result.token);
      socket.emit("userLogin", { user_id: params.userOrder });
    } else {
      Toast.info("登录失败");
    }
    return result;
  }
  @action
  async getUserInfo(params: any) {
    const result: any = await getUserInfoApi(params);
    if (result.status === 200) {
      this.userInfo = result.info;
    }
  }
}
