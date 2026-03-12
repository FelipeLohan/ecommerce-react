import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as forms from "../../../utils/forms.ts";
import * as userService from "../../../services/user-service.ts";
import { FormInput } from "../../../components/Forminput/FormInput.tsx";
import { CtaButton } from "../../../components/CtaButton";
import { ContextToast } from "../../../utils/context-toast.ts";

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
    <div className="grid grid-cols-1 min-h-screen md:[grid-template-columns:1fr_1fr]">
      {/* Left — brand */}
      <div
        className="flex flex-col items-center justify-center p-12 text-white max-md:hidden"
        style={{ background: "linear-gradient(135deg, var(--color-primary-600), var(--color-primary-900))" }}
      >
        <h1 className="text-3xl font-bold leading-snug text-center m-0 mb-4">
          Crie sua conta grátis!
        </h1>
        <p className="text-base text-center m-0 leading-normal" style={{ color: "rgba(255,255,255,0.75)" }}>
          Cadastre-se e comece a comprar os melhores produtos com os melhores
          preços. É rápido e fácil.
        </p>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center px-4 py-8 md:px-6 md:py-12 bg-surface-page">
        <div className="w-full max-w-[480px] bg-white rounded-xl border border-neutral-200 shadow-lg p-6 sm:p-8 md:p-12">
          <p className="text-2xl font-bold text-primary-600 m-0 mb-2">Ecommerce</p>
          <p className="text-base text-neutral-500 m-0 mb-8">Preencha os dados para criar sua conta</p>

          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-5">
              {/* Nome */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-neutral-700">Nome completo</label>
                <FormInput {...formData.name} onChange={handleInputChange} />
                {isFieldInvalid(formData.name) && (
                  <span className="text-xs text-danger-500">{formData.name.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-neutral-700">E-mail</label>
                <FormInput {...formData.email} onChange={handleInputChange} />
                {isFieldInvalid(formData.email) && (
                  <span className="text-xs text-danger-500">{formData.email.message}</span>
                )}
              </div>

              {/* Telefone + Data de nascimento */}
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-medium text-neutral-700">Telefone</label>
                  <FormInput {...formData.phone} onChange={handleInputChange} />
                  {isFieldInvalid(formData.phone) && (
                    <span className="text-xs text-danger-500">{formData.phone.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="birthDate" className="text-sm font-medium text-neutral-700">Data de nascimento</label>
                  <FormInput {...formData.birthDate} onChange={handleInputChange} />
                  {isFieldInvalid(formData.birthDate) && (
                    <span className="text-xs text-danger-500">{formData.birthDate.message}</span>
                  )}
                </div>
              </div>

              {/* Senha + Confirmar senha */}
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-sm font-medium text-neutral-700">Senha</label>
                  <FormInput {...formData.password} onChange={handleInputChange} />
                  {isFieldInvalid(formData.password) && (
                    <span className="text-xs text-danger-500">{formData.password.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-neutral-700">Confirmar senha</label>
                  <FormInput
                    {...formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {passwordMismatch && (
                    <span className="text-xs text-danger-500">{formData.confirmPassword.message}</span>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <CtaButton
                  variant="primary"
                  fullWidth
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Criar conta
                </CtaButton>
              </div>
            </div>
          </form>

          <p className="mt-5 text-sm text-neutral-500 text-center m-0">
            Já tem conta?{" "}
            <Link to="/login" className="text-primary-600 font-medium underline hover:text-primary-700">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { Register };
