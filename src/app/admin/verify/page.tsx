"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useConfirmRegistration } from "@/features/auth/hooks/useConfirmRegistration";
import { ROUTES } from "@/lib/config/routes";
import { CheckCircle2, XCircle, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/lib/constants/images";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const { mutate: confirmRegistration, isPending, isSuccess, isError } =
    useConfirmRegistration();

  const handleVerify = () => {
    if (token) {
      confirmRegistration({ verificationToken: token });
    }
  };

  if (!token) {
    return (
      <div className="max-w-md w-full text-center space-y-6">
        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
        <h1 className="text-2xl font-bold">Link Inválido</h1>
        <p className="text-gray-400">
          O link de verificação é inválido ou está incompleto.
        </p>
        <Link
          href={ROUTES.ADMIN.LOGIN}
          className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
        >
          Voltar para Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full bg-[#111] border border-white/10 rounded-2xl p-8 text-center space-y-6">
      {!isPending && !isSuccess && !isError && (
        <>
          <ShieldCheck className="w-16 h-16 text-primary mx-auto" />
          <h1 className="text-2xl font-bold">Verificar Conta</h1>
          <p className="text-gray-400">
            Clique no botão abaixo para confirmar seu cadastro e ativar sua conta.
          </p>
          <button
            onClick={handleVerify}
            className="w-full py-3 bg-primary text-black font-semibold rounded-xl hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Verificar Conta
          </button>
        </>
      )}

      {isPending && (
        <>
          <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
          <h1 className="text-2xl font-bold">Verificando...</h1>
          <p className="text-gray-400">
            Aguarde enquanto confirmamos seu cadastro.
          </p>
        </>
      )}

      {isSuccess && (
        <>
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
          <h1 className="text-2xl font-bold">Conta Verificada!</h1>
          <p className="text-gray-400">
            Seu cadastro foi confirmado com sucesso. Você já pode acessar o
            painel.
          </p>
          <button
            onClick={() => router.push(ROUTES.ADMIN.DASHBOARD.HOME)}
            className="w-full py-3 bg-primary text-black font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            Acessar Dashboard
          </button>
        </>
      )}

      {isError && (
        <>
          <XCircle className="w-16 h-16 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold">Erro na Verificação</h1>
          <p className="text-gray-400">
            Não foi possível verificar sua conta. O link pode ter expirado ou já
            foi utilizado.
          </p>
          <Link
            href={ROUTES.ADMIN.LOGIN}
            className="block w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          >
            Voltar para Login
          </Link>
        </>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 text-white">
      <div className="mb-12">
        <Image src={IMAGES.LOGO} alt="Logo" width={150} height={150} />
      </div>
      
      <Suspense fallback={<Loader2 className="w-10 h-10 text-primary animate-spin" />}>
        <VerifyContent />
      </Suspense>
    </div>
  );
}
