import { css } from 'styled-components';

export const colors = {
  blue300: '#A4CAFE',
  blue800: '#1E429F',
  blue900: '#233876',
  gray50: '#F9FAFB',
  gray100: '#F4F5F7',
  gray200: '#E2E8F0',
  gray300: '#D2D6DC',
  gray400: '#97A6BA',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray900: '#161E2E',
  green100: '#DEf7EC',
  green500: '#0E9F6E',
  green800: '#03543F',
  indigo200: '#CDDBFE',
  indigo300: '#B4C6FC',
  indigo400: '#8DA2FB',
  indigo500: '#6875F5',
  indigo600: '#5850EC',
  indigo700: '#5145CD',
  indigo800: '#42389D',
  indigo900: '42389D',
  red100: '#FDE8E8',
  red500: '#F05252',
  red800: '#9B1C1C',
  white: '#FFFFFF'
};

export const breakpoints = {
  small: '640px',
  medium: '768px',
  large: '1024px',
  extraLarge: '1280px'
};

export const transform = css`
  --transform-translate-x: 0;
  --transform-translate-y: 0;
  --transform-rotate: 0;
  --transform-skew-x: 0;
  --transform-skew-y: 0;
  --transform-scale-x: 1;
  --transform-scale-y: 1;
  transform: translateX(var(--transform-translate-x)) translateY(var(--transform-translate-y))
    rotate(var(--transform-rotate)) skewX(var(--transform-skew-x)) skewY(var(--transform-skew-y))
    scaleX(var(--transform-scale-x)) scaleY(var(--transform-scale-y));
`;
