import React from 'react';
import styled from 'styled-components';

export default function NoFound() {
  return <div className={FoundWrapper}>
    页面找不到了
  </div>
}

const FoundWrapper = styled.div`
  width:100%;
  height:100%;
  display:flex;
  justify-context:center;
  align-items:center;
` 