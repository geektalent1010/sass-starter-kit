import React, { useState, useEffect, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import AuthContext from '../../../utils/authContext';
import { colors, breakpoints } from '../../../styles/theme';
import styled from 'styled-components';
import LoadingOverlay from '../../../components/Admin/Common/loadingOverlay';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  padding-top: 2rem;
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
  @media (min-width: ${breakpoints.small}) {
    max-width: 36rem;
  }
`;

const Card = styled.div`
  background-color: ${colors.white};
  padding: 2rem 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (min-width: ${breakpoints.small}) {
    border-radius: 0.5rem;
  }
`;

const ErrorResponse = styled.div`
  font-size: 0.9rem;
  color: red;
  font-weight: 100;
  margin-bottom: 2rem;
`;

const AttachPaymentForm = () => {
  const { authState } = useContext(AuthContext);

  const [resMessage, setResMessage] = useState('');
  const [setupIntentState, setSetupIntent] = useState();
  const [isLoading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const createSetupIntent = async () => {
    let data = { customer: authState.user };
    const result = await axios.post('http://localhost/stripe/wallet', data);
    if (!result) setResMessage('Payment Setup Failed, Please Contact Support');

    setSetupIntent(result.data);
  };

  useEffect(() => {
    if (authState.user) createSetupIntent();
    console.log(authState);
  }, [authState]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { setupIntent, error } = await stripe.confirmCardSetup(setupIntentState.client_secret, {
      payment_method: { card: cardElement }
    });

    if (!setupIntent && error) {
      setLoading(false);
      setResMessage(error.message);
      return;
    } else if (!setupIntent && !error) {
      setLoading(false);
      setResMessage('Card confirmation failed, please contact support');
      return;
    }
  };

  return (
    <Wrapper>
      {isLoading && <LoadingOverlay />}
      <CardWrapper>
        <Card>
          <ErrorResponse>{resMessage}</ErrorResponse>
          <form onSubmit={handleSubmit}>
            <CardElement />
            <ButtonWrapper>
              <Button type="submit" disabled={!stripe && !setupIntentState}>
                Pay
              </Button>
            </ButtonWrapper>
          </form>
          <button onClick={() => console.log(setupIntentState)}>FFFFF</button>
        </Card>
      </CardWrapper>
    </Wrapper>
  );
};

export default AttachPaymentForm;
