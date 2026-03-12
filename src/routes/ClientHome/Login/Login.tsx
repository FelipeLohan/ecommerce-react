import { useContext, useState } from "react";
import * as forms from "../../../utils/forms.ts";
import * as authService from "../../../services/auth-service.ts";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { ContextToken } from "../../../utils/context-token.ts";
import { FormInput } from "../../../components/Forminput/FormInput.tsx";
import { CtaButton } from "../../../components/CtaButton";
import { ContextToast } from "../../../utils/context-toast.ts";

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
    <div className="grid [grid-template-columns:1fr_1fr] min-h-screen md:grid-cols-1">
      {/* Left — brand */}
      <div
        className="flex flex-col items-center justify-center p-12 text-white max-md:hidden"
        style={{ background: "linear-gradient(135deg, var(--color-primary-600), var(--color-primary-900))" }}
      >
        <h1 className="text-3xl font-bold leading-snug text-center m-0 mb-4">
          Bem-vindo de volta!
        </h1>
        <p className="text-base text-center m-0 leading-normal" style={{ color: "rgba(255,255,255,0.75)" }}>
          Acesse sua conta e continue comprando os melhores produtos com os
          melhores preços.
        </p>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center px-6 py-12 bg-surface-page">
        <div className="w-full max-w-[440px] bg-white rounded-xl shadow-xl p-12 sm:p-8">
          <p className="text-2xl font-bold text-primary-600 m-0 mb-2">Ecommerce</p>
          <p className="text-base text-neutral-500 m-0 mb-8">Faça login para continuar</p>

          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="username" className="text-sm font-medium text-neutral-700">E-mail</label>
                <FormInput
                  {...formData.username}
                  onChange={handleInputChange}
                />
                {formData.username.value && !formData.username.validation?.(formData.username.value) && (
                  <span className="text-xs text-danger-500">{formData.username.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-neutral-700">Senha</label>
                <FormInput {...formData.password} onChange={handleInputChange} />
              </div>

              <a className="text-sm text-primary-600 underline text-right block -mt-2 cursor-pointer hover:text-primary-700">
                Esqueci minha senha
              </a>

              {submitResponseFail && (
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-danger-50 border border-danger-200 rounded-md text-danger-700 text-sm">
                  <AlertTriangle size={16} />
                  Usuário ou senha inválidos. Tente novamente.
                </div>
              )}

              <div className="mt-2">
                <CtaButton
                  variant="primary"
                  fullWidth
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Entrar
                </CtaButton>
              </div>
            </div>
          </form>

          <p className="mt-5 text-sm text-neutral-500 text-center m-0">
            Não tem conta?{" "}
            <Link to="/register" className="text-primary-600 font-medium underline hover:text-primary-700">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { Login };
