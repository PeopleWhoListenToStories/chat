import React from "react";
import styled from "styled-components";
import { Button } from "antd-mobile";
const Filling: React.FC = () => {
  return (
    <FillingWrapper>
      <Button
        size="small"
        inline
        style={{
          width: ".8rem",
          height: ".8rem",
          marginRight: "4px",
          border: "1px solid #ccc",
          borderRadius: "50%",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          padding:'.1rem 0rem'
        }}
        className="am-button-borderfix"
      >
        放弃
      </Button>
      <Button
        size="small"
        inline
        style={{
          width: ".8rem",
          height: ".8rem",
          marginRight: "4px",
          border: "1px solid #ccc",
          borderRadius: "50%",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          padding:'.1rem 0rem'
        }}
        className="am-button-borderfix"
      >
        加注
      </Button>
    </FillingWrapper>
  );
};
export default Filling;

const FillingWrapper = styled.div`
  position: fixed;
  bottom: 0.2rem;
  right: 0.2rem;
`;
