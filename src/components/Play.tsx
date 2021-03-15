import React, { Fragment } from "react";
import styled from "styled-components";

interface Iprops {
  title: string;
  data: any[];
}

const Play: React.FC<Iprops> = (props: any) => {
  return (
    <PlayWrapper>
      <TitleWrapper>{props.title}</TitleWrapper>
      <PokerContent>
        {props.data.map((item: any) => {
          return (
            <Fragment>
              {item ? (
                <PokerCard >
                   <CardNum
                  style={{
                    color: `${
                      item.type === 1 || item.type === 4 ? "red" : "black"
                    }`,
                  }}
                >
                  {item.pokerStatus}
                </CardNum>
                <CardNums
                  style={{
                    color: `${
                      item.type === 1 || item.type === 4 ? "red" : "black"
                    }`,
                  }}
                >
                  {item.pokerStatus}
                </CardNums>
                  <li
                    style={{
                      backgroundImage:`url(${item.url})`,
                      width: "100%",
                      height: "100%",
                      backgroundSize: "cover",
                    }}
                  ></li>
                </PokerCard>
              ) : (
                <PokerCard>
                  <li
                    style={{
                      backgroundImage:
                        "url(https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1968914019,545493827&fm=26&gp=0.jpg)",
                      width: "100%",
                      height: "100%",
                      backgroundSize: "cover",
                    }}
                  ></li>
                </PokerCard>
              )}
            </Fragment>
          );
        })}
      </PokerContent>
    </PlayWrapper>
  );
};

export default Play;

const PlayWrapper = styled.div`
  width: 2rem;
  background: skyblue;
  height: 3rem;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const TitleWrapper = styled.div`
  text-align: center;
`;
const PokerContent = styled.div`
  width: auto;
  display: flex;
  transform: rotate(90deg);
`;

const PokerCard = styled.div`
  width: 1rem;
  height: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.05rem;
  position: relative;
  border: 2px solid white;
  padding: 0.01rem;
`;

const CardNum = styled.span`
  width: 0.2rem;
  background: white;
  font-size: 12px;
  font-weight: 600;
  margin-left: 0.03rem;
  position: absolute;
  top: 0;
  left: 0;
`;

const CardNums = styled.span`
  width: 0.2rem;
  background: white;
  font-size: 12px;
  font-weight: 600;
  position: absolute;
  bottom: 0;
  right: 0;
  transform: rotateZ(180deg);
`;
