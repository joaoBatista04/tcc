import React from 'react';

import { Player } from 'components';
import { MenuLayout } from 'layouts';

import { Strings } from './strings';

import './styles.css';
import HomePage from 'pages/HomePage';

function Home() {
  return (
    <MenuLayout title={Strings.TOOLBAR_TITLE}>
      <HomePage/>
      <Player />
    </MenuLayout>
  );
}

export default Home;
