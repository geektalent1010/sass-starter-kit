import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';

const Wrapper = styled.div`
  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 28rem;
  }
`;

const Image = styled.img`
  margin-left: auto;
  margin-right: auto;
  height: 3rem;
  width: auto;
`;

const Title = styled.h2`
  margin-top: 1.5rem;
  color: ${colors.gray900};
  text-align: center;
  font-weight: 800;
  font-size: 1.875rem;
  line-height: 2.25rem;
`;

const LoginFormHeader = () => (
  <Wrapper>
    <Image src='https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg' alt='Workflow' />
    <Title>Sign-In or Sign-Up for an account</Title>
  </Wrapper>
);

export default LoginFormHeader;
