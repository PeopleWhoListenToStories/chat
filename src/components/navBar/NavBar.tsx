import React from "react";
import { NavBar, Icon } from "antd-mobile";

interface Props {
  title:string,
  onLeftClick:()=>void
}

const NavBarCom: React.FC<Props> = (props: any) => {

  return (
    <div>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => props.onLeftClick()}
        rightContent={[
          // <Icon key="0" type="search" style={{ marginRight: "16px" }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >
        {props.title}
      </NavBar>
    </div>
  );
};

export default NavBarCom;
