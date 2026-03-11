import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { HeaderClient } from "../../components/HeaderClient";
import { BackToTop } from "../../components/BackToTop";
import { FooterClient } from "../../components/FooterClient";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;

const ClientHome = () => {
  return (
    <PageWrapper>
      <HeaderClient />
      <Main>
        <Outlet />
      </Main>
      <FooterClient />
      <BackToTop />
    </PageWrapper>
  );
};

export { ClientHome };
