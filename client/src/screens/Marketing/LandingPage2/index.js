import React from 'react';
import NavBar from '../../../components/Marketing/Navigation/header2';
import Banner from './banner';
import Services from './services';
import HowItWorks from './howItWorks';
import { LandingPage2GlobalStyle as GlobalStyle } from '../../../styles/theme';

const LandingPage2 = () => (
  <React.Fragment>
    <GlobalStyle />
    <NavBar />
    <Banner />
    <Services />
    <HowItWorks />
  </React.Fragment>
);

export default LandingPage2;
