import React from "react";
import { useObserver } from "mobx-react-lite";
import useStore from "../../context/useStore";
import { useHistory } from "react-router-dom";

export default function UserPortrait() {
  const { Login } = useStore();
  const history = useHistory();
  function cancel() {
    history.push("/login");
    sessionStorage.clear();
  }
  return useObserver(() => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 .1rem",
      }}
    >
      <span>
        {Login.userInfo.user} -{" "}
        {Login.userInfo.role === "1" ? "普通账号" : "管理员"}
      </span>
      <span
        onClick={() => {
          cancel();
        }}
      >
        注销
      </span>
    </div>
  ));
}
