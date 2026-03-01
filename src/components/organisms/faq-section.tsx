"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "O que é perícia contábil e quando ela é necessária?",
    answer:
      "A perícia contábil é uma análise técnica realizada por um contador especializado para esclarecer questões financeiras em processos judiciais ou extrajudiciais. É necessária em casos de disputas trabalhistas, societárias, avaliação de empresas, apuração de haveres, entre outros.",
  },
  {
    question: "Qual a diferença entre contabilidade e auditoria?",
    answer:
      "A contabilidade é responsável pelo registro e controle das operações financeiras da empresa no dia a dia. Já a auditoria é uma análise independente que verifica se esses registros estão corretos e se as demonstrações financeiras refletem a realidade da empresa.",
  },
  {
    question: "Como funciona a recuperação de créditos tributários?",
    answer:
      "Realizamos uma análise detalhada dos tributos pagos pela empresa nos últimos 5 anos, identificando pagamentos indevidos ou a maior. Após a identificação, preparamos toda a documentação necessária para solicitar a restituição ou compensação dos valores junto à Receita Federal.",
  },
  {
    question: "Vocês atendem empresas de qual porte?",
    answer:
      "Atendemos empresas de todos os portes, desde MEIs e pequenas empresas até grandes corporações. Nossa atuação é personalizada de acordo com as necessidades específicas de cada cliente, oferecendo soluções adequadas para cada realidade.",
  },
  {
    question: "Qual o prazo médio para conclusão de uma perícia?",
    answer:
      "O prazo varia de acordo com a complexidade do caso. Perícias mais simples podem ser concluídas em 30 dias, enquanto casos mais complexos podem levar de 60 a 90 dias. Sempre informamos uma estimativa de prazo após a análise inicial do caso.",
  },
  {
    question: "Como posso acompanhar meus processos e documentos?",
    answer:
      "Disponibilizamos uma área exclusiva para clientes em nosso site, onde é possível acompanhar o andamento de processos, acessar documentos, visualizar relatórios e se comunicar diretamente com nossa equipe.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm tracking-wider uppercase">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">
            Perguntas <span className="text-primary">Frequentes</span>
          </h2>
          <p className="text-white mt-4 max-w-2xl mx-auto">
            Tire suas principais dúvidas sobre nossos serviços de contabilidade,
            perícia e auditoria.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 hover:border-primary/50 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-neutral-950 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
