"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const phoneNumber = "5543991231726";
  const message =
    "Olá! Gostaria de mais informações sobre os serviços da Oliveto.";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popup */}
      <div
        aria-hidden={!isOpen}
        className={cn(
          "absolute bottom-20 right-0 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 ease-in-out",
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 translate-y-4 invisible pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-whatsapp p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Oliveto</h4>
                <p className="text-white/80 text-xs">Online agora</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-all duration-200 ease-in-out cursor-pointer"
              aria-label="Fechar chat"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="bg-gray-100 rounded-lg p-3 mb-4">
            <p className="text-gray-700 text-sm">
              Olá! 👋 Como podemos ajudar você hoje? Nossa equipe está pronta
              para atender.
            </p>
            <span className="text-gray-400 text-xs mt-1 block">Agora</span>
          </div>

          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              message
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-whatsapp text-white text-center py-3 rounded-lg font-medium hover:bg-whatsapp-hover transition-all duration-200 ease-in-out"
          >
            Iniciar Conversa
          </a>
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-whatsapp rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 ease-in-out relative cursor-pointer"
        aria-label={
          isOpen
            ? "Fechar chat do WhatsApp"
            : "Abrir chat do WhatsApp (Status: Online)"
        }
        title={
          isOpen
            ? "Fechar chat do WhatsApp"
            : "Abrir chat do WhatsApp (Status: Online)"
        }
        aria-expanded={isOpen}
      >
        <MessageCircle className="w-7 h-7 text-white" aria-hidden="true" />

        {/* Pulse Animation */}
        <span
          className="absolute w-full h-full rounded-full bg-whatsapp animate-ping opacity-30 motion-reduce:hidden"
          aria-hidden="true"
        />

        {/* Online Badge */}
        <span
          className="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-white"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
