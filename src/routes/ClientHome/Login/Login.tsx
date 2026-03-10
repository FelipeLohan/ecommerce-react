import styled from "styled-components";
import { useContext, useState } from "react";
import * as forms from "../../../utils/forms.ts";
import * as authService from "../../../services/auth-service.ts";
import { useNavigate } from "react-router-dom";
import { ContextToken } from "../../../utils/context-token.ts";
import { FormInput } from "../../../components/Forminput/FormInput.tsx";
import { CtaButton } from "../../../components/CtaButton";
import { tokens } from "../../../styles/tokens.ts";
import { ContextToast } from "../../../utils/context-toast.ts";

/* ── Page layout ─────────────────────────────────────────── */
const PageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;

  @media (max-width: ${tokens.breakpoint.md}) {
    grid-template-columns: 1fr;
  }
`;

/* ── Left panel — Brand ──────────────────────────────────── */
const BrandPanel = styled.div`
  background: linear-gradient(
    135deg,
    ${tokens.colors.primary[600]},
    ${tokens.colors.primary[900]}
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  color: #ffffff;

  @media (max-width: ${tokens.breakpoint.md}) {
    display: none;
  }
`;

const BrandTagline = styled.h1`
  font-size: ${tokens.fontSize["3xl"]};
  font-weight: ${tokens.fontWeight.bold};
  line-height: ${tokens.lineHeight.snug};
  text-align: center;
  margin: 0 0 16px;
`;

const BrandSubtitle = styled.p`
  font-size: ${tokens.fontSize.base};
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
  margin: 0;
  line-height: ${tokens.lineHeight.normal};
`;

/* ── Right panel — Form ──────────────────────────────────── */
const FormPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background: ${tokens.colors.surface.page};
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 440px;
  background: #ffffff;
  border-radius: ${tokens.radius.xl};
  box-shadow: ${tokens.shadow.xl};
  padding: 48px 40px;

  @media (max-width: ${tokens.breakpoint.sm}) {
    padding: 32px 24px;
  }
`;

const FormLogo = styled.p`
  font-size: ${tokens.fontSize["2xl"]};
  font-weight: ${tokens.fontWeight.bold};
  color: ${tokens.colors.primary[600]};
  margin: 0 0 8px;
`;

const FormSubtitle = styled.p`
  font-size: ${tokens.fontSize.base};
  color: ${tokens.colors.neutral[500]};
  margin: 0 0 32px;
`;

const FieldsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FieldLabel = styled.label`
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.medium};
  color: ${tokens.colors.neutral[700]};
`;

const FieldError = styled.span`
  font-size: ${tokens.fontSize.xs};
  color: ${tokens.colors.danger[500]};
`;

const ForgotLink = styled.a`
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.primary[600]};
  text-decoration: underline;
  text-align: right;
  display: block;
  margin-top: -8px;
  cursor: pointer;

  &:hover {
    color: ${tokens.colors.primary[700]};
  }
`;

const ErrorBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: ${tokens.colors.danger[50]};
  border: 1px solid ${tokens.colors.danger[200]};
  border-radius: ${tokens.radius.md};
  color: ${tokens.colors.danger[700]};
  font-size: ${tokens.fontSize.sm};
`;

const SubmitWrapper = styled.div`
  margin-top: 8px;
`;

/* ── Component ───────────────────────────────────────────── */
const Login = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ContextToast);
  const [submitResponseFail, setSubmitResponseFail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: {
      value: "",
      id: "username",
      name: "username",
      type: "text",
      placeholder: "seu@email.com",
      validation: function (value: string) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value.toLowerCase()
        );
      },
      message: "Favor informar um email válido",
    },
    password: {
      value: "",
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Sua senha",
    },
  });

  const { setContextTokenPayload } = useContext(ContextToken);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    authService
      .loginRequest(forms.toValues(formData))
      .then((response) => {
        authService.saveAccessToken(response.data.access_token);
        setContextTokenPayload(authService.getAccessTokenPayload());
        setSubmitResponseFail(false);
        navigate("/cart");
      })
      .catch((error) => {
        console.log("Erro no login", error);
        setSubmitResponseFail(true);
        const msg =
          error.response?.data?.error ?? "Usuário ou senha inválidos.";
        addToast("error", msg);
      })
      .finally(() => setIsSubmitting(false));
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const result = forms.updateAndValidate(
      formData,
      e.target.name,
      e.target.value
    );
    setFormData(result);
  }

  return (
    <PageGrid>
      {/* Left — brand */}
      <BrandPanel>
        <BrandTagline>Bem-vindo de volta!</BrandTagline>
        <BrandSubtitle>
          Acesse sua conta e continue comprando os melhores produtos com os
          melhores preços.
        </BrandSubtitle>
      </BrandPanel>

      {/* Right — form */}
      <FormPanel>
        <FormCard>
          <FormLogo>Ecommerce</FormLogo>
          <FormSubtitle>Faça login para continuar</FormSubtitle>

          <form onSubmit={handleFormSubmit}>
            <FieldsColumn>
              <FieldWrapper>
                <FieldLabel htmlFor="username">E-mail</FieldLabel>
                <FormInput
                  {...formData.username}
                  onChange={handleInputChange}
                />
                {formData.username.value && !formData.username.validation?.(formData.username.value) && (
                  <FieldError>{formData.username.message}</FieldError>
                )}
              </FieldWrapper>

              <FieldWrapper>
                <FieldLabel htmlFor="password">Senha</FieldLabel>
                <FormInput {...formData.password} onChange={handleInputChange} />
              </FieldWrapper>

              <ForgotLink>Esqueci minha senha</ForgotLink>

              {submitResponseFail && (
                <ErrorBanner>
                  <span>⚠</span>
                  Usuário ou senha inválidos. Tente novamente.
                </ErrorBanner>
              )}

              <SubmitWrapper>
                <CtaButton
                  variant="primary"
                  fullWidth
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Entrar
                </CtaButton>
              </SubmitWrapper>
            </FieldsColumn>
          </form>
        </FormCard>
      </FormPanel>
    </PageGrid>
  );
};

export { Login };
