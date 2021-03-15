import React, { useContext, useEffect, useState } from 'react';
import { Link, navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import styled from 'styled-components';

import { Spin } from 'antd';
import SEO from '../../../components/Marketing/Layout/seo';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';
import { setAnalyticsUserId, sendEventToAnalytics } from '../../../services/analytics';
import { colors, breakpoints } from '../../../styles/theme';

import Title from '../../../components/Auth/title';
import AuthCard from '../../../components/Auth/authCard';
import LoadingOverlay from '../../../components/Common/loadingOverlay';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextInput from '../../../components/Common/forms/TextInput';

const Wrapper = styled.div`
  background-color: ${colors.gray50};
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const TextWrapper = styled.div`
  text-align: center;
  font-size: 1.075rem;
`;

const CardText = styled.div`
  font-size: 1.075rem;
  font-weight: 500;
  padding-top: 1.5rem;
`;

const ConfirmedEmail = () => {
  const location = useLocation();

  const [email, setEmail] = useState();
  const [user_id, setUserId] = useState();
  const [username, setUsername] = useState();
  const [jwt_token, setToken] = useState();
  const [org_id, setOrgId] = useState();

  const [loadingSpin, setLoading] = useState(false);
  const { LogIn } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;

  //extract query params
  const queryParams = location.search.split('=');
  const verify_key = queryParams[1].split('&')[0];
  const isInviteFlow = queryParams[2].split('&')[0];
  const invite_key = queryParams[3];

  /* eslint-disable */
  useEffect(() => {
    return () => setLoading(false);
  }, []);

  useEffect(() => {
    createUser();
  }, []);
  /* eslint-enable */

  const createUser = async () => {
    fetchInit();

    let data = {
      verify_key
    };

    let result = await axios.post('/auth/create-user', data).catch((err) => {
      fetchFailure(err);
    });

    let id = result.data.user_id;
    let username = result.data.username;
    let jwt_token = result.data.token;
    let email = result.data.email;

    setEmail(email);
    setUserId(id);
    setUsername(username);
    setToken(jwt_token);

    //save event and user id to Google Analytics
    setAnalyticsUserId(id);
    sendEventToAnalytics('signup', { method: 'email' });

    if (isInviteFlow === 'true') {
      verifyInvite(id);
    } else {
      fetchSuccess();
    }
  };

  const verifyInvite = async (user_id) => {
    //verify invite key, returing org id.
    let data = { invite_key };
    let result = await axios
      .post('/api/users/verify-invite', data)
      .catch((err) => fetchFailure(err));

    let org_id = result.data.org_id;
    setOrgId(org_id);
    createRole(org_id, user_id);
  };

  //if the signup process is part of the invite flow
  //then create role
  const createRole = async (org_id, user_id) => {
    fetchInit();
    let role = 'user';

    let data = {
      org_id,
      user_id,
      role
    };

    await axios.post(`/api/post/role`, data).catch((err) => {
      fetchFailure(err);
    });

    // Save user data to global state
    let user = { id: user_id, username, jwt_token, email };
    await LogIn(user);

    fetchSuccess();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let org_name = event.target.org_name.value;
    let role = 'admin';

    let data = {
      email,
      org_name,
      user_id,
      role
    };

    await axios.post('/api/org', data).catch((err) => {
      fetchFailure(err);
    });

    // Save user data to global state
    let user = { id: user_id, username, jwt_token, email };
    await LogIn(user);

    navigate('/user/dashboard');
  };

  const seoData = {
    title: 'Saas Starter Kit Pro Email Confirmed Page',
    description: 'Saas Starter Kit Pro Email Confirmed Page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <Wrapper>
        {isLoading && <LoadingOverlay />}
        <Title>Thank You for confirming your email, your account is almost ready to use</Title>
        <Spin tip="Please wait while we setup your account..." spinning={loadingSpin}>
          <AuthCard>
            {isInviteFlow === 'true' ? (
              <div>
                <CardText>Click below to navigate to the app your were invited to</CardText>
                <TextWrapper>
                  <Link to={`/app/${org_id}/dashboard`}>Go to App</Link>
                </TextWrapper>
              </div>
            ) : (
              <div>
                <h2>Enter an Organization Name to get Started</h2>
                <form onSubmit={handleSubmit}>
                  <FieldLabel htmlFor="org_name">
                    Organization Name:
                    <TextInput id="org_name" />
                  </FieldLabel>
                </form>
              </div>
            )}
          </AuthCard>
        </Spin>
      </Wrapper>
    </React.Fragment>
  );
};

export default ConfirmedEmail;
