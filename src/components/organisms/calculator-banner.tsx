"use client";

import Link from "next/link";
import { Calculator, ArrowRight, CheckCircle } from "lucide-react";

const CALCULATOR_FEATURES = [
  "Cálculo de contribuições em atraso",
  "Simulação de aposentadoria",
  "Recuperação de créditos previdenciários",
  "Análise de tempo de contribuição",
];

export function CalculatorBanner() {
  return (
    <section className="py-16 bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl border border-[#1a1a1a] bg-gradient-to-br from-[#0f0f0f] to-[#141414]">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/3 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-sm font-medium">
                  Nova ferramenta
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Calculadora Contábil{" "}
                <span className="text-primary">Previdenciária</span>
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed">
                Simule e calcule contribuições previdenciárias, aposentadorias,
                benefícios e recuperação de créditos tributários de forma rápida
                e precisa.
              </p>

              <ul className="space-y-3">
                {CALCULATOR_FEATURES.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/calculadora"
                className="inline-flex items-center gap-3 px-6 py-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all group"
              >
                <Calculator className="w-5 h-5" />
                Acessar Calculadora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right content - Calculator preview */}
            <div className="relative">
              <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-[#2a2a2a]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Simulador Rápido</p>
                      <p className="text-xs text-gray-500">
                        Versão simplificada
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Tipo de cálculo
                    </label>
                    <div className="w-full px-4 py-3 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-gray-400 text-sm">
                      Contribuições em atraso
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        Período inicial
                      </label>
                      <div className="w-full px-4 py-3 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-gray-400 text-sm">
                        01/2020
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        Período final
                      </label>
                      <div className="w-full px-4 py-3 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-gray-400 text-sm">
                        12/2024
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Salário base
                    </label>
                    <div className="w-full px-4 py-3 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-gray-400 text-sm">
                      R$ 5.000,00
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#2a2a2a]">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Valor estimado:</span>
                      <span className="text-2xl font-bold text-primary">
                        R$ 12.450,00
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-primary text-black text-sm font-semibold rounded-lg shadow-lg shadow-primary/20">
                100% Gratuito
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
