import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../../styles/theme';
import { Link } from 'gatsby';
import { Steps } from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  CheckCircleOutlined,
  CreditCardOutlined
} from '@ant-design/icons';

const { Step } = Steps;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 28rem;
  }
`;

const Title = styled.h2`
  padding-right: 2rem;
  padding-left: 2rem;
  margin-top: 1.5rem;
  color: green;
  text-align: center;
  font-weight: 400;
  font-size: 1.5rem;
`;

const Text = styled.h2`
  padding-right: 2rem;
  padding-left: 2rem;
  margin-top: 1.5rem;
  color: green;
  text-align: center;
  font-weight: 400;
  font-size: 1.2rem;
`;

const ConfirmSub = () => (
  <Wrapper>
    <Steps>
      <Step status="finish" title="Login" icon={<UserOutlined />} />
      <Step status="finish" title="Plan" icon={<SolutionOutlined />} />
      <Step status="finish" title="Payment" icon={<CreditCardOutlined />} />
      <Step status="finish" title="Done" icon={<CheckCircleOutlined />} />
    </Steps>
    <Title>Your Subscription Has Been Confirmed!</Title>
    <Text>
      <Link to="/app"> Click Here to Navigate to the App</Link>
    </Text>
  </Wrapper>
);

export default ConfirmSub;
