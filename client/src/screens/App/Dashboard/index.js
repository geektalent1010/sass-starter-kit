import React from 'react';
import styled from 'styled-components';
import Stats from './stats';
import ActivityList from './activityList';
import { colors } from '../../../styles/theme';

const Title = styled.h1`
  font-weight: 600;
  color: ${colors.gray900};
  font-size: 1.5rem;
`;

const Dashboard = () => (
  <div>
    <div>
      <Title>Dashboard</Title>
      <Stats />
      <ActivityList />
    </div>{' '}
  </div>
);

export default Dashboard;
