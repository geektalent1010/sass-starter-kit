import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundLanding};
  padding: 6rem 2rem 2rem 2rem;
`;

const Heading = styled.div`
  padding-bottom: 3rem;
`;

const LargeHeader = styled.h3`
  text-align: center;
  font-size: 1.875rem;
  line-height: 2rem;
  font-weight: 800;
  letter-spacing: -0.025em;

  @media (min-width: ${breakpoints.small}) {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
`;

const SectionDescription = styled.p`
  margin-top: 1rem;
  max-width: 48rem;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const ContentWrapper = styled.div`
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 2rem;
    gap: 2rem;
    max-width: 1280px;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Column = styled.div`
  margin-top: 2.5rem;
  @media (min-width: ${breakpoints.large}) {
    margin-top: 0;
  }
`;

const FakeIcon = styled.div`
  background-color: ${colors.indigo500};
  border-radius: 0.375rem;
  height: 3rem;
  width: 3rem;
`;

const TextWrapper = styled.div`
  margin-top: 1.25rem;
`;

const SmallHeader = styled.h5`
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
`;

const Paragraph = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
`;

const TripleColFeatures = () => (
  <Wrapper>
    <Heading>
      <LargeHeader>A better way to send money</LargeHeader>
      <SectionDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus magnam voluptatum
        cupiditate veritatis in, accusamus quisquam.
      </SectionDescription>
    </Heading>
    <ContentWrapper>
      <Column>
        {/*<!-- Heroicon name: globe-alt -->*/}
        <FakeIcon />
        <TextWrapper>
          <SmallHeader>Competitive exchange rates</SmallHeader>
          <Paragraph>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis
            suscipit eaque, iste dolor cupiditate blanditiis ratione.
          </Paragraph>
        </TextWrapper>
      </Column>
      <Column>
        {/*<!-- Heroicon name: scale -->*/}
        <FakeIcon />
        <TextWrapper>
          <SmallHeader>No hidden fees</SmallHeader>
          <Paragraph>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis
            suscipit eaque, iste dolor cupiditate blanditiis ratione.
          </Paragraph>
        </TextWrapper>
      </Column>
      <Column>
        {/*<!-- Heroicon name: lightning-bolt -->*/}
        <FakeIcon />
        <TextWrapper>
          <SmallHeader>Transfers are instant</SmallHeader>
          <Paragraph>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis
            suscipit eaque, iste dolor cupiditate blanditiis ratione.
          </Paragraph>
        </TextWrapper>
      </Column>
    </ContentWrapper>
  </Wrapper>
);

export default TripleColFeatures;
