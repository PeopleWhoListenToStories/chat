import React from 'react'
import { useObserver } from "mobx-react-lite";
import useStore from "../../context/useStore"

export default function UserPortrait() {
  const {Login} = useStore()
  return useObserver(()=>(
    <div>
      {Login.userInfo.user} -  {Login.userInfo.role === '1' ? '普通账号' : '管理员'}
    </div>
  ))
}
