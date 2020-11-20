import React from 'react';
import styled from 'styled-components';

export default function NoFound() {
  return <div className={ServerWrapper}>
     服务器出错了
  </div>
}

const ServerWrapper = styled.div`
  width:100%;
  height:100%;
  display:flex;
  justify-context:center;
  align-items:center;
` 