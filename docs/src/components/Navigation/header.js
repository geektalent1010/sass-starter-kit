import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useState, useRef } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import { Link } from 'gatsby';
import { colors, breakpoints } from '../../styles/theme';

import MobileMenu from './mobileMenu';
import LargeLogo from '../svgs/LargeLogo';
import MenuImageSrc from '../svgs/menu.svg';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1rem;
  height: 5rem;
  background-color: ${colors.white};
  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.medium}) {
    justify-content: flex-start;
  }
  * {
    margin-right: 10px;
  }
`;

const LogoWrapper = styled.div`
  @media (min-width: ${breakpoints.large}) {
    width: 0;
    flex: 1 1 0%;
  }
`;

const MenuWrapper = styled.div`
  margin-right: -0.5rem;
  margin-top: -0.5rem;
  margin-bottom: -0.5rem;
  @media (min-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const MenuButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: ${colors.gray400};
  &:hover {
    color: ${colors.gray500};
    background-color: ${colors.gray100};
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    color: ${colors.gray500};
    background-color: ${colors.gray100};
  }
`;

const MenuImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const Nav = styled.nav`
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: flex;
    justify-content: center;
    flex-basis: 60%;
  }
`;

const fadeInUp = keyframes`
from {
  opacity: 0;
  transform: translateY(0.25rem);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

const ButtonWrapper = styled.div`
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: flex;
    flex: 1 1 0%;
  }
  @media (min-width: ${breakpoints.large}) {
    width: 0;
  }
  align-items: center;
  justify-content: flex-end;
  margin-left: 2rem;
`;

const SolutionsButton = styled.div`
  color: ${colors.gray500};
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  justify-content: space-between;
  font-size: 1rem;
  line-height: 1.5rem;
  cursor: pointer;

  &:hover {
    color: ${colors.gray900};
  }
  &:focus {
    color: ${colors.gray900};
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

const Chevron = styled.img`
  margin-left: 8px;
  color: ${colors.gray500};
  height: 1.25rem;
  width: 1.25rem;

  &:hover ${SolutionsButton} {
    color: ${colors.gray500};
  }
  &:focus ${SolutionsButton} {
    color: ${colors.gray500};
  }
`;

const Header = () => {
  const ref = useRef();
  const refMobile = useRef();
  const [menu, toggleMenu] = useState(false);
  const [mobileMenu, toggleMobileMenu] = useState(false);

  const mobileMenuHandler = () => (mobileMenu ? toggleMobileMenu(false) : toggleMobileMenu(true));

  useOutsideClick(ref, () => toggleMenu(false));
  useOutsideClick(refMobile, () => toggleMobileMenu(false));

  return (
    <Container>
      <LogoWrapper>
        <Link to="/">
          <LargeLogo />
        </Link>
      </LogoWrapper>
      <MenuWrapper ref={refMobile}>
        <MenuButton onClick={mobileMenuHandler}>
          <MenuImage src={MenuImageSrc} alt="menu" />
        </MenuButton>
        {mobileMenu ? <MobileMenu mobileMenuHandler={mobileMenuHandler} /> : null}
      </MenuWrapper>
      <Nav>
        <Link className="header_link" activeClassName="header_active_link" to="/#">
          Pricing
        </Link>
        <Link className="header_link" activeClassName="header_active_link" to="/#">
          Blog
        </Link>
        <Link className="header_link" activeClassName="header_active_link" to="/#">
          Docs
        </Link>
      </Nav>
    </Container>
  );
};

export default Header;
