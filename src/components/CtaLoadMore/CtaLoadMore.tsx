import styled from "styled-components";
import { tokens } from "../../styles/tokens.ts";

const CtaLoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0 32px;
`;

const LoadMoreButton = styled.button`
  padding: 12px 40px;
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.semibold};
  color: ${tokens.colors.primary[600]};
  background: transparent;
  border: 2px solid ${tokens.colors.primary[600]};
  border-radius: ${tokens.radius.full};
  cursor: pointer;
  letter-spacing: 0.03em;
  transition: background ${tokens.transition.base}, color ${tokens.transition.base},
    box-shadow ${tokens.transition.base}, transform ${tokens.transition.base};

  &:hover {
    background: ${tokens.colors.primary[600]};
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(52, 131, 250, 0.35);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  @media (max-width: 420px) {
    width: 80%;
    font-size: ${tokens.fontSize.base};
  }
`;

const CtaLoadMore = () => {
  return (
    <CtaLoadMoreContainer>
      <LoadMoreButton>Carregar mais</LoadMoreButton>
    </CtaLoadMoreContainer>
  );
};

export { CtaLoadMore };
