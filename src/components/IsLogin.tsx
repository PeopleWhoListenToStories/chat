import React, { useEffect, useState } from "react";
import useStore from "../context/useStore"

const IsLogin: React.FC = (Com: any) => {

  const [isLogin, setIsLogin] = useState<boolean>(false);

  return <div>
    isLogin ? <Com ></Com>: <></>
  </div>
}

export default IsLogin
