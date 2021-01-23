import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import { ValidSchema, SignupAuth } from '../helpers';
import LoadingOverlay from '../../../components/Common/loadingOverlay';
import { colors, breakpoints, fieldStyles } from '../../../styles/theme';
import SignUpFormHeader from './signupFormHeader';
import GoogleButton from 'react-google-button';
import { useStaticQuery, graphql } from 'gatsby';

const Wrapper = styled.div`
  background-color: ${colors.gray50};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.gray700};
  padding-top: 0.5rem;
`;

const InputWrapper = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const Input = styled.input`
  ${fieldStyles}
`;

const ButtonWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: ${colors.white};
  text-align: left;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-weight: 500;
  width: 100%;
  color: ${colors.white};
  background-color: ${colors.indigo600};
  border: 1px solid transparent;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:hover {
    background-color: ${colors.indigo500};
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  &:active {
    background-color: ${colors.indigo600};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const CardWrapper = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;

  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
    padding-left: 2rem;
    padding-right: 2rem;
    width: 100%;
    max-width: 28rem;
  }
`;

const Card = styled.div`
  background-color: ${colors.white};
  padding: 2rem 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (min-width: ${breakpoints.small}) {
    border-radius: 0.5rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.8em;
  margin-bottom: 0.5em;
  margin-top: -0.2rem;
`;

const StyledGoogleButton = styled(GoogleButton)`
  margin-top: 2rem;
`;

const StyledOrContinueWithText = styled.p`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #000;
  line-height: 0.1em;
  margin-top: 1rem;
`;

const StyledSpan = styled.span`
  background: #fff;
  padding: 0 0.7rem;
`;

const Signup = ({ location }) => {
  const { firebase, LogIn, LogOut } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [appId, setAppId] = useState();
  const [isInviteFlow, setInviteFlow] = useState();
  const data = useStaticQuery(staticQuery);
  const domainUrl = data.site.siteMetadata.siteUrl;

  //extract data from query params
  useEffect(() => {
    if (location.search) {
      const queryParams = location.search.split('=');
      setAppId(queryParams[1].split('&')[0]);
      setInviteFlow(queryParams[2]);
    }
  }, [location]);

  useEffect(() => {
    return () => fetchSuccess();
  }, []);

  const handleSubmit = async (values) => {
    fetchInit();

    let email = values.email;
    let password = values.password;
    let username = values.username;

    let authRes = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        fetchFailure(error);
      });

    SignupAuth(authRes, firebase, fetchFailure, username, domainUrl, isInviteFlow, appId);
  };

  //Google OAuth2 Signin
  const GoogleSignin = async () => {
    fetchInit();
    let provider = new firebase.auth.GoogleAuthProvider();

    //wait for firebase to confirm signup
    let authRes = await firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        fetchFailure(error);
      });

    SignupAuth(authRes, firebase, fetchFailure, null, domainUrl, isInviteFlow, appId);
  };

  return (
    <Wrapper>
      {isLoading && <LoadingOverlay />}
      <SignUpFormHeader />
      <CardWrapper>
        <Card>
          <Formik
            validationSchema={ValidSchema}
            initialValues={{ email: '', password: '', username: '' }}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Label htmlFor="email">Email:</Label>
                <InputWrapper>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </InputWrapper>
                {errors.email && touched.email && <ErrorText>{errors.email}</ErrorText>}
                <Label htmlFor="username">First and Last Name:</Label>
                <InputWrapper>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                </InputWrapper>
                {errors.username && touched.username && <ErrorText>{errors.username}</ErrorText>}
                <Label htmlFor="password">Password:</Label>
                <InputWrapper>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </InputWrapper>
                {errors.password && touched.password && <ErrorText>{errors.password}</ErrorText>}
                <ButtonWrapper>
                  <Button type="submit">SignUp</Button>
                </ButtonWrapper>
              </form>
            )}
          </Formik>

          <StyledOrContinueWithText>
            <StyledSpan>Or Continue With</StyledSpan>
          </StyledOrContinueWithText>

          <StyledGoogleButton
            style={{ width: '100%' }}
            label="Sign-Up with Google"
            onClick={GoogleSignin}
          />
        </Card>
      </CardWrapper>
    </Wrapper>
  );
};

export default Signup;

const staticQuery = graphql`
  query GetDomainSignup {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
