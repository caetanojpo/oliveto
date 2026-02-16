import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { FormField } from "@/components/atoms/form-field";
import { LoginRequest, LoginSchema } from "@/features/auth/types/auth.types";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { ROUTES } from "@/lib/config/routes";
import { useEffect } from "react";
import { IMAGES } from "@/lib/constants/images";

interface LoginFormProps {
  setIsLoggingIn?: (isLoggingIn: boolean) => void;
}

export function LoginForm({ setIsLoggingIn }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate: login, isPending } = useLogin();

  useEffect(() => {
    if (setIsLoggingIn) {
      setIsLoggingIn(isPending);
    }
  }, [isPending, setIsLoggingIn]);

  const onSubmit = (data: LoginRequest) => {
    login(data);
  };

  return (
    <div className="w-full max-w-md">
      <Link href={ROUTES.PUBLIC.HOME} className="lg:hidden block mb-12">
        <Image src={IMAGES.LOGO} alt="Logo" width={150} height={150} />
      </Link>

      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Acesse sua conta</h2>
        <p className="text-gray-500">
          Bem-vindo de volta! Insira suas credenciais.
        </p>
      </div>

      <form
        id="login-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormField
          label="Email"
          type="email"
          {...register("email")}
          placeholder="seu@email.com"
          error={errors.email?.message}
          maxLength={255}
          autoComplete="username"
        />

        <FormField
          label="Senha"
          type="password"
          {...register("password")}
          placeholder="Sua senha"
          error={errors.password?.message}
          maxLength={100}
          autoComplete="current-password"
        />

        {/* Removed "Remember Me" checkbox for security reasons */}

        {/*<Link*/}
        {/*  href="/recuperar-senha" // TODO: Create this route*/}
        {/*  className="text-sm text-primary hover:underline"*/}
        {/*>*/}
        {/*  Esqueceu a senha?*/}
        {/*</Link>*/}

        <Button
          type="submit"
          disabled={isPending}
          loading={isPending}
          className="w-full mt-4 h-auto py-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 group"
        >
          {!isPending && (
            <>
              <span>Entrar</span>
              <ArrowRight
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </>
          )}
        </Button>
      </form>

      {/*<SocialLogin />*/}

      <div className="mt-10 text-center">
        <Link
          href={ROUTES.PUBLIC.HOME}
          className="text-gray-500 hover:text-primary transition-colors text-sm inline-flex items-center gap-2 group"
        >
          <ArrowLeft
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          />
          Voltar para o site
        </Link>
      </div>
    </div>
  );
}
