import styled from "styled-components";
import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
import { tokens } from "../../styles/tokens";

const FooterWrapper = styled.footer`
  background: ${tokens.colors.neutral[800]};
  padding: ${tokens.spacing[12]} ${tokens.spacing[10]};

  @media (max-width: 600px) {
    padding: ${tokens.spacing[10]} ${tokens.spacing[6]};
  }
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: ${tokens.spacing[12]};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: ${tokens.spacing[8]};
  }
`;

const FooterLogo = styled.img`
  height: 32px;
  width: auto;
  display: block;
  margin-bottom: ${tokens.spacing[2]};
`;

const FooterTagline = styled.p`
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.neutral[400]};
  line-height: ${tokens.lineHeight.relaxed};
  margin: 0 0 ${tokens.spacing[5]};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${tokens.spacing[3]};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.neutral[400]};
  text-decoration: none;
  transition: color ${tokens.transition.fast};

  &:hover {
    color: ${tokens.colors.neutral[0]};
  }
`;

const FooterColTitle = styled.h4`
  font-size: ${tokens.fontSize.xs};
  font-weight: ${tokens.fontWeight.semibold};
  color: ${tokens.colors.neutral[300]};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 ${tokens.spacing[4]};
`;

const FooterColLinks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing[2]};
`;

const FooterLink = styled(Link)`
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.neutral[400]};
  text-decoration: none;
  transition: color ${tokens.transition.fast};

  &:hover {
    color: ${tokens.colors.neutral[0]};
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${tokens.colors.neutral[700]};
  margin: ${tokens.spacing[8]} 0;
`;

const Copyright = styled.p`
  text-align: center;
  font-size: ${tokens.fontSize.xs};
  color: ${tokens.colors.neutral[500]};
  margin: 0;
`;

export function FooterClient() {
  const year = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterInner>
        <FooterGrid>
          <div>
            <FooterLogo src="/Brand_White.svg" alt="Ecommerce" />
            <FooterTagline>
              Projeto de portfólio desenvolvido com React, TypeScript e Spring Boot.
            </FooterTagline>
            <SocialLinks>
              <SocialLink
                href="https://github.com/FelipeLohan/ecommerce-react"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} />
                GitHub
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/felipe-lohan-767294213/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={16} />
                LinkedIn
              </SocialLink>
            </SocialLinks>
          </div>

          <div>
            <FooterColTitle>Navegação</FooterColTitle>
            <FooterColLinks>
              <li><FooterLink to="/catalog">Catálogo</FooterLink></li>
              <li><FooterLink to="/cart">Carrinho</FooterLink></li>
            </FooterColLinks>
          </div>

          <div>
            <FooterColTitle>Conta</FooterColTitle>
            <FooterColLinks>
              <li><FooterLink to="/my-account">Minha Conta</FooterLink></li>
              <li><FooterLink to="/login">Login</FooterLink></li>
            </FooterColLinks>
          </div>
        </FooterGrid>

        <Divider />

        <Copyright>© {year} Felipe Lohan. Todos os direitos reservados.</Copyright>
      </FooterInner>
    </FooterWrapper>
  );
}
