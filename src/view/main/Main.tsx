import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import RouterView from '../../router/RouterView';
import useStore from '../../context/useStore';


// 引入antd
import { Layout } from 'antd';

// 引入菜单配置
import menu from '../../router/menu';

import { FormattedMessage } from 'react-intl'; /* react-intl imports */

const { Header, Sider, Content } = Layout;

const Main: React.FC = (props: any) => {
  const history = useHistory();

  return useObserver(() => <MainWrapper className="Main"  >
    <Layout style={{ overflow: 'hidden' }}>
      
    </Layout>
  </MainWrapper >)
}
// export default injectIntl(Main);
export default Main;

const MainWrapper = styled.div`
  wdith:100%;
  height:100%;
  h2 {
    padding:20px ;
  }
`
