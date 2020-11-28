/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useStore from "../../context/useStore";
import socket from "../../utils/socket";

import { Toast } from "antd-mobile";

const Login: React.FC = () => {
  const [userOrder, setUserOrder] = useState<string>("666");
  const [pwdOrder, setPwdOrder] = useState<string>("admin");

  const { Login } = useStore();
  const history = useHistory();
  sessionStorage.removeItem("user");

  function changeText(e: any) {
    if (e.target.name === "userOrder") {
      setUserOrder(e.target.value);
    } else if (e.target.name === "pwdOrder") {
      setPwdOrder(e.target.value);
    } else {
      return;
    }
  }

  async function clickLogin() {
    if (userOrder !== "" && pwdOrder !== "") {
      const {status} = await Login.LoginUser({ userOrder, pwdOrder })
      if (status === 200) {
        history.push({
          pathname: "/home",
          state: { id: userOrder },
        });
      }
    } else {
      Toast.info("请输入完善的用户信息");
    }
  }
  return (
    <LoginWrapper>
      <ul>
        <li>
          <label>账号</label>
          <input
            name="userOrder"
            type="search"
            value={userOrder}
            onChange={(e) => {
              changeText(e);
            }}
          />
        </li>
        <li>
          <label>密码</label>
          <input
            name="pwdOrder"
            type="search"
            value={pwdOrder}
            onChange={(e) => {
              changeText(e);
            }}
          />
        </li>
        <li>
          <input
            type="button"
            value="登录"
            onClick={() => {
              clickLogin();
            }}
          />
        </li>
      </ul>
    </LoginWrapper>
  );
};
export default Login;

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ul > li {
    text-align: center;
    padding: 0.2rem 0;
  }
`;
