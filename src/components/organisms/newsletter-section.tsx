"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useCreateLead } from "@/features/leads/hooks";
import { LeadOrigin, NewsletterSchema, type NewsletterFormValues } from "@/features/leads/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";

export function NewsletterSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutateAsync: createLead, isPending } = useCreateLead();

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(NewsletterSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    try {
      await createLead({
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        message: "Inscrição em Newsletter / Download E-book",
        origin: LeadOrigin.RICH_MATERIAL,
      });

      setIsSubmitted(true);
      toast.success("Cadastro realizado com sucesso! Verifique seu e-mail.");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao realizar inscrição. Tente novamente.");
    }
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative bg-gradient-to-br from-primary/10 to-transparent border border-primary/30 rounded-2xl p-8 md:p-12 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary text-sm px-3 py-1 rounded-full mb-4">
                <FileText className="w-4 h-4" />
                E-book Gratuito
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Guia Completo de{" "}
                <span className="text-primary">Recuperação Tributária</span>
              </h2>

              <p className="text-gray-400 mb-6">
                Descubra como sua empresa pode recuperar impostos pagos
                indevidamente nos últimos 5 anos. Cadastre-se e receba nosso
                e-book exclusivo com um passo a passo completo.
              </p>

              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Análise de tributos pagos a maior
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Passo a passo para solicitar restituição
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Casos reais de recuperação
                </li>
              </ul>
            </div>

            {/* Form */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              {!isSubmitted ? (
                /* Security: maxLength limits prevent excessive payload/DoS attacks */
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-400 mb-2">Nome completo</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Seu nome"
                              maxLength={100}
                              className="w-full bg-white/5 border-white/10 rounded-lg px-4 py-3 h-auto text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-primary/50 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-400 mb-2">E-mail</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="seu@email.com"
                              maxLength={100}
                              className="w-full bg-white/5 border-white/10 rounded-lg px-4 py-3 h-auto text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-primary/50 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-400 mb-2">WhatsApp</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="(00) 00000-0000"
                              maxLength={20}
                              className="w-full bg-white/5 border-white/10 rounded-lg px-4 py-3 h-auto text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-primary/50 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-primary text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {isPending ? (
                        "Enviando..."
                      ) : (
                        <>
                          Quero o E-book Gratuito
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      Ao se cadastrar, você concorda com nossa política de
                      privacidade.
                    </p>
                  </form>
                </Form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Cadastro Realizado!
                  </h3>
                  <p className="text-gray-400">
                    Confira seu e-mail para acessar o e-book gratuito.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
