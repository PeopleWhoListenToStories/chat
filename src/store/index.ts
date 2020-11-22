import Test from "./modules/test"
import Poker from "./modules/poker"
import Login from "./modules/login"
import Socket from "./modules/socket"

export default {
  Test: new Test(),
  Poker: new Poker(),
  Login: new Login(),
  socketStore: new Socket()
}
