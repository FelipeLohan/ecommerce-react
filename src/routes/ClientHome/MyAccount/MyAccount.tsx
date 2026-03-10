import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Hash, ArrowLeft } from "lucide-react";
import * as userService from "../../../services/user-service.ts";
import { UserDTO } from "../../../models/user.ts";
import { tokens } from "../../../styles/tokens.ts";

/* ── Animation ───────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── Layout ──────────────────────────────────────────────── */
const Page = styled.div`
  min-height: 100vh;
  background: ${tokens.colors.surface.page};
  padding: 48px 16px 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* ── Card ────────────────────────────────────────────────── */
const Card = styled.div`
  width: 100%;
  max-width: 480px;
  background: #ffffff;
  border-radius: ${tokens.radius.xl};
  box-shadow: ${tokens.shadow.lg};
  overflow: hidden;
  animation: ${fadeUp} 0.4s ease both;
`;

const CardHeader = styled.div`
  background: linear-gradient(
    135deg,
    ${tokens.colors.primary[600]},
    ${tokens.colors.primary[900]}
  );
  padding: 40px 32px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const AvatarLarge = styled.div`
  width: 72px;
  height: 72px;
  border-radius: ${tokens.radius.full};
  background: rgba(255, 255, 255, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  font-size: ${tokens.fontSize["2xl"]};
  font-weight: ${tokens.fontWeight.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

const UserName = styled.h1`
  font-size: ${tokens.fontSize.xl};
  font-weight: ${tokens.fontWeight.bold};
  color: #ffffff;
  margin: 0;
  text-align: center;
`;

/* ── Info section ────────────────────────────────────────── */
const InfoList = styled.div`
  padding: 8px 0;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 28px;
  border-bottom: 1px solid ${tokens.colors.neutral[100]};

  &:last-child {
    border-bottom: none;
  }
`;

const InfoIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${tokens.radius.md};
  background: ${tokens.colors.primary[50]};
  color: ${tokens.colors.primary[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const InfoLabel = styled.span`
  font-size: ${tokens.fontSize.xs};
  font-weight: ${tokens.fontWeight.medium};
  color: ${tokens.colors.neutral[400]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const InfoValue = styled.span`
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.medium};
  color: ${tokens.colors.neutral[800]};
`;

/* ── Skeleton ────────────────────────────────────────────── */
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
`;

const Skeleton = styled.div<{ $w?: string; $h?: string }>`
  width: ${({ $w }) => $w ?? "100%"};
  height: ${({ $h }) => $h ?? "16px"};
  border-radius: ${tokens.radius.md};
  background: ${tokens.colors.neutral[200]};
  animation: ${pulse} 1.4s ease infinite;
`;

/* ── Back link ───────────────────────────────────────────── */
const BackRow = styled.div`
  margin-top: 24px;
  width: 100%;
  max-width: 480px;
  animation: ${fadeUp} 0.4s 0.1s ease both;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.medium};
  color: ${tokens.colors.neutral[500]};
  text-decoration: none;
  transition: color ${tokens.transition.fast};

  &:hover {
    color: ${tokens.colors.primary[600]};
  }
`;

/* ── Component ───────────────────────────────────────────── */
const MyAccount = () => {
  const [user, setUser] = useState<UserDTO>();

  useEffect(() => {
    userService.findMe().then((res) => setUser(res.data));
  }, []);

  const initial = user?.name?.charAt(0) ?? "U";

  return (
    <Page>
      <Card>
        <CardHeader>
          <AvatarLarge>
            {user ? initial : <Skeleton $w="32px" $h="32px" />}
          </AvatarLarge>
          {user ? (
            <UserName>{user.name}</UserName>
          ) : (
            <Skeleton $w="140px" $h="22px" />
          )}
        </CardHeader>

        <InfoList>
          <InfoRow>
            <InfoIcon><Mail size={17} /></InfoIcon>
            <InfoText>
              <InfoLabel>E-mail</InfoLabel>
              {user ? (
                <InfoValue>{user.email}</InfoValue>
              ) : (
                <Skeleton $w="180px" />
              )}
            </InfoText>
          </InfoRow>

          <InfoRow>
            <InfoIcon><Hash size={17} /></InfoIcon>
            <InfoText>
              <InfoLabel>ID da conta</InfoLabel>
              {user ? (
                <InfoValue>#{user.id}</InfoValue>
              ) : (
                <Skeleton $w="60px" />
              )}
            </InfoText>
          </InfoRow>
        </InfoList>
      </Card>

      <BackRow>
        <BackLink to="/catalog">
          <ArrowLeft size={15} /> Voltar ao catálogo
        </BackLink>
      </BackRow>
    </Page>
  );
};

export { MyAccount };
