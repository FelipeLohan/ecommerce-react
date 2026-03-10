import styled from "styled-components";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as forms from "../../../utils/forms.ts";
import * as userService from "../../../services/user-service.ts";
import { FormInput } from "../../../components/Forminput/FormInput.tsx";
import { CtaButton } from "../../../components/CtaButton";
import { ContextToast } from "../../../utils/context-toast.ts";
import { tokens } from "../../../styles/tokens.ts";

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

  @media (max-width: ${tokens.breakpoint.md}) {
    padding: 32px 16px;
  }
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 480px;
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

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: ${tokens.breakpoint.sm}) {
    grid-template-columns: 1fr;
  }
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

const SubmitWrapper = styled.div`
  margin-top: 8px;
`;

const LoginLink = styled.p`
  margin: 20px 0 0;
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.neutral[500]};
  text-align: center;

  a {
    color: ${tokens.colors.primary[600]};
    font-weight: ${tokens.fontWeight.medium};
    text-decoration: underline;

    &:hover {
      color: ${tokens.colors.primary[700]};
    }
  }
`;

/* ── Helpers ─────────────────────────────────────────────── */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = {
  name: {
    value: "",
    name: "name",
    type: "text",
    placeholder: "João Silva",
    validation: (v: string) => v.trim().length >= 3,
    message: "Nome deve ter ao menos 3 caracteres",
  },
  email: {
    value: "",
    name: "email",
    type: "text",
    placeholder: "seu@email.com",
    validation: (v: string) => emailRegex.test(v),
    message: "Informe um e-mail válido",
  },
  phone: {
    value: "",
    name: "phone",
    type: "text",
    placeholder: "(11) 99999-9999",
    validation: (v: string) => v.replace(/\D/g, "").length >= 10,
    message: "Informe um telefone válido (mínimo 10 dígitos)",
  },
  birthDate: {
    value: "",
    name: "birthDate",
    type: "date",
    validation: (v: string) => v.length > 0,
    message: "Data de nascimento é obrigatória",
  },
  password: {
    value: "",
    name: "password",
    type: "password",
    placeholder: "Mínimo 6 caracteres",
    validation: (v: string) => v.length >= 6,
    message: "Senha deve ter ao menos 6 caracteres",
  },
  confirmPassword: {
    value: "",
    name: "confirmPassword",
    type: "password",
    placeholder: "Repita a senha",
    validation: null as null | ((v: string) => boolean),
    message: "As senhas não conferem",
  },
};

/* ── Component ───────────────────────────────────────────── */
const Register = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ContextToast);
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const updated = forms.updateAndValidate(formData, e.target.name, e.target.value);
    setFormData(updated);
    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      setPasswordMismatch(false);
    }
  }

  function isFieldInvalid(field: { value: string; validation: ((v: string) => boolean) | null }) {
    if (!field.validation) return false;
    return field.value.length > 0 && !field.validation(field.value);
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fields = ["name", "email", "phone", "birthDate", "password"] as const;
    let hasError = false;
    let updatedForm = { ...formData };

    for (const key of fields) {
      updatedForm = forms.validate(updatedForm, key) as typeof formData;
      const field = updatedForm[key] as { value: string; validation: ((v: string) => boolean) | null };
      if (field.validation && !field.validation(field.value)) {
        hasError = true;
      }
    }

    setFormData(updatedForm);

    if (formData.password.value !== formData.confirmPassword.value) {
      setPasswordMismatch(true);
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);
    userService
      .register({
        name: formData.name.value,
        email: formData.email.value,
        phone: formData.phone.value,
        birthDate: formData.birthDate.value,
        password: formData.password.value,
      })
      .then(() => {
        addToast("success", "Cadastro realizado! Faça login para continuar.");
        navigate("/login");
      })
      .catch((error) => {
        const status = error.response?.status;
        if (status === 409) {
          addToast("error", "E-mail já cadastrado. Tente fazer login.");
        } else if (status === 422) {
          addToast("error", "Dados inválidos. Verifique os campos e tente novamente.");
        } else {
          addToast("error", "Erro inesperado. Tente novamente.");
        }
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <PageGrid>
      {/* Left — brand */}
      <BrandPanel>
        <BrandTagline>Crie sua conta grátis!</BrandTagline>
        <BrandSubtitle>
          Cadastre-se e comece a comprar os melhores produtos com os melhores
          preços. É rápido e fácil.
        </BrandSubtitle>
      </BrandPanel>

      {/* Right — form */}
      <FormPanel>
        <FormCard>
          <FormLogo>Ecommerce</FormLogo>
          <FormSubtitle>Preencha os dados para criar sua conta</FormSubtitle>

          <form onSubmit={handleFormSubmit}>
            <FieldsColumn>
              {/* Nome */}
              <FieldWrapper>
                <FieldLabel htmlFor="name">Nome completo</FieldLabel>
                <FormInput {...formData.name} onChange={handleInputChange} />
                {isFieldInvalid(formData.name) && (
                  <FieldError>{formData.name.message}</FieldError>
                )}
              </FieldWrapper>

              {/* Email */}
              <FieldWrapper>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <FormInput {...formData.email} onChange={handleInputChange} />
                {isFieldInvalid(formData.email) && (
                  <FieldError>{formData.email.message}</FieldError>
                )}
              </FieldWrapper>

              {/* Telefone + Data de nascimento */}
              <TwoColumns>
                <FieldWrapper>
                  <FieldLabel htmlFor="phone">Telefone</FieldLabel>
                  <FormInput {...formData.phone} onChange={handleInputChange} />
                  {isFieldInvalid(formData.phone) && (
                    <FieldError>{formData.phone.message}</FieldError>
                  )}
                </FieldWrapper>

                <FieldWrapper>
                  <FieldLabel htmlFor="birthDate">Data de nascimento</FieldLabel>
                  <FormInput {...formData.birthDate} onChange={handleInputChange} />
                  {isFieldInvalid(formData.birthDate) && (
                    <FieldError>{formData.birthDate.message}</FieldError>
                  )}
                </FieldWrapper>
              </TwoColumns>

              {/* Senha + Confirmar senha */}
              <TwoColumns>
                <FieldWrapper>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <FormInput {...formData.password} onChange={handleInputChange} />
                  {isFieldInvalid(formData.password) && (
                    <FieldError>{formData.password.message}</FieldError>
                  )}
                </FieldWrapper>

                <FieldWrapper>
                  <FieldLabel htmlFor="confirmPassword">Confirmar senha</FieldLabel>
                  <FormInput
                    {...formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {passwordMismatch && (
                    <FieldError>{formData.confirmPassword.message}</FieldError>
                  )}
                </FieldWrapper>
              </TwoColumns>

              <SubmitWrapper>
                <CtaButton
                  variant="primary"
                  fullWidth
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Criar conta
                </CtaButton>
              </SubmitWrapper>
            </FieldsColumn>
          </form>

          <LoginLink>
            Já tem conta? <Link to="/login">Fazer login</Link>
          </LoginLink>
        </FormCard>
      </FormPanel>
    </PageGrid>
  );
};

export { Register };
