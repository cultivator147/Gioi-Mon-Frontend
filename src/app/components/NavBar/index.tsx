import * as React from 'react';
import styled from 'styled-components/macro';
import { PageWrapper, SubWrapperRow } from '../PageWrapper';
import { AppLogo } from './AppLogo';
import { StyleConstants } from '../../../styles/StyleConstants';

export const NavBar = () => {
  return (
    <Wrapper>
      <PageWrapper>
        <SubWrapperRow>
          <AppLogo />
        </SubWrapperRow>
      </PageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  box-shadow: 0 1px 0 0 ${p => p.theme.borderLight};
  height: ${StyleConstants.NAV_BAR_HEIGHT};
  display: flex;
  width: 100%;
  background-color: ${StyleConstants.BACKGROUND_NAVBAR_COLOR};
  z-index: 2;
`;
