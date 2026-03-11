import styled from "styled-components";
import { tokens } from "../../styles/tokens";

const HeroBannerWrapper = styled.section`
  width: 100%;
  background: linear-gradient(135deg,
    ${tokens.colors.primary[700]} 0%,
    ${tokens.colors.primary[500]} 60%,
    ${tokens.colors.primary[400]} 100%
  );
  padding: ${tokens.spacing[12]} ${tokens.spacing[10]};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${tokens.spacing[3]};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.08) 0%, transparent 60%);
    pointer-events: none;
  }

  @media (max-width: ${tokens.breakpoint.md}) {
    padding: ${tokens.spacing[10]} ${tokens.spacing[6]};
  }
`;

const HeroTitle = styled.h1`
  font-size: ${tokens.fontSize["4xl"]};
  font-weight: ${tokens.fontWeight.bold};
  color: #ffffff;
  line-height: ${tokens.lineHeight.tight};
  margin: 0;
  letter-spacing: -0.02em;

  @media (max-width: ${tokens.breakpoint.md}) {
    font-size: ${tokens.fontSize["3xl"]};
  }

  @media (max-width: ${tokens.breakpoint.sm}) {
    font-size: ${tokens.fontSize["2xl"]};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${tokens.fontSize.lg};
  color: ${tokens.colors.primary[100]};
  margin: 0;
  max-width: 500px;
  line-height: ${tokens.lineHeight.relaxed};

  @media (max-width: ${tokens.breakpoint.sm}) {
    font-size: ${tokens.fontSize.base};
  }
`;

export function HeroBanner() {
  return (
    <HeroBannerWrapper>
      <HeroTitle>Encontre o produto perfeito</HeroTitle>
      <HeroSubtitle>
        Explore nossa seleção com os melhores preços e as melhores marcas do mercado.
      </HeroSubtitle>
    </HeroBannerWrapper>
  );
}
