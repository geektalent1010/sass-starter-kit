import React from 'react';
import styled from 'styled-components';
import {
  landingPage2Colors as colors,
  landingPage2Breakpoints as breakpoints
} from '../../../../styles/theme';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { SecondaryButton } from '../buttons/SecondaryButton';

import BannerObject1 from './bannerObjects/bannerObject1.png';
import BannerObject2 from './bannerObjects/bannerObject2.png';

const Container1 = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: none;
  padding-left: 30px;
  padding-right: 30px;
  @media (min-width: ${breakpoints.medium}) {
    max-width: 750px;
    width: 100%;
  }
  @media (min-width: 992px) {
    max-width: 970px;
    width: 100%;
  }
  @media (min-width: 1220px) {
    max-width: 1170px;
    width: 100%;
  }
`;

const Container2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: -15px;
  margin-right: -15px;
`;

const Container3 = styled.div`
  padding: 0 15px;
  width: 100%;
  @media (min-width: ${breakpoints.small}) {
    width: 70%;
  }
  @media (min-width: ${breakpoints.medium}) {
    width: 50%;
  }
  @media (min-width: ${breakpoints.large}) {
    width: 45%;
  }
`;

const DiscountLabel = styled.div`
  display: inline-block;
  border-radius: 65px;
  border: 1px solid ${colors.athensGray};
  padding: 7px 25px;
  box-shadow: 0px 7px 25px 0px rgba(22, 53, 76, 0.05);
  margin-bottom: 30px;
  background-color: ${colors.white};
`;

const Amount = styled.span`
  font-size: 14px;
  color: ${colors.cinnabar};
  font-weight: 700;
  margin-bottom: 0;
  margin-right: 0.4em;
`;

const Frequency = styled.span`
  color: ${colors.firefly};
  font-weight: 500;
  margin-bottom: 0;
  font-size: 13px;
  @media (min-width: ${breakpoints.small}) {
    font-size: 14px;
  }
`;

const Title = styled.h2`
  color: ${colors.firefly};
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.5;
  margin-bottom: 20px;
  font-size: 22px;
  @media (min-width: ${breakpoints.small}) {
    margin-bottom: 25px;
    font-size: 34px;
  }
  @media (min-width: ${breakpoints.medium}) {
    font-size: 34px;
  }
  @media (min-width: ${breakpoints.large}) {
    font-size: 55px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: ${colors.brightGray};
  line-height: 1.75;
  margin-bottom: 0;
`;

const ButtonWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 30px;
`;

const BannerImageContainer1 = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  @media (max-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const BannerImageContainer2 = styled.div`
  margin-left: auto;
  position: relative;
`;

const DashboardWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  .chatObject {
    position: absolute;
    top: 20px;
    left: 120px;
  }
`;

const Image = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;

const Banner = () => (
  <React.Fragment>
    <Container1>
      <Container2>
        <Container3>
          <DiscountLabel>
            <Amount>25% Discount</Amount>
            <Frequency>on every first project</Frequency>
          </DiscountLabel>
          <Title>Ultimate Platform to monitor your best workflow.</Title>
          <Description>
            We help to create SaaS product that are innovative, differentiated with a superb User
            Experience, fully accessible through mobile devices. SaaS products are changing the
            world.
          </Description>
          <ButtonWrapper>
            <PrimaryButton>FREE TRIAL</PrimaryButton>
            <SecondaryButton>EXPLORE MORE</SecondaryButton>
          </ButtonWrapper>
        </Container3>
      </Container2>
    </Container1>
    <BannerImageContainer1>
      <BannerImageContainer2>
        <Image src={BannerObject1} alt="BannerObject1" />
        <DashboardWrapper>
          <Image src={BannerObject2} alt="BannerObject2" />
        </DashboardWrapper>
      </BannerImageContainer2>
    </BannerImageContainer1>
  </React.Fragment>
);

export default Banner;
