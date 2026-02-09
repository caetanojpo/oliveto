import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/constants/images";
import {ROUTES} from "@/lib/config/routes";

export function Footer() {
  return (
    <footer id="contatos" className="bg-black px-8 py-16 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div>
            <Link href={ROUTES.PUBLIC.HOME} className="text-2xl font-bold tracking-wider">
              <Image src={IMAGES.LOGO_MIN} alt="Logo" width={80} height={80} />
            </Link>
          </div>

          <div className="text-gray-400 hover:text-white transition-colors">
            <Link
              href="https://maps.app.goo.gl/P8RsKR8923M1Ga5H7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-sm  leading-relaxed">
                Av, Madre Leônia Milito nº1500
                <br />
                Sala 1311, Atsushi Yoshii Tower
                <br />
                Londrina - Paraná
              </p>
              <p className="text-sm  mt-4">Seg - Sex. 8h às 19h</p>
            </Link>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-4">Fale agora.</p>
            <a
              href="tel:+5543991231726"
              className="inline-block border border-primary text-primary px-4 py-2 text-sm hover:bg-primary hover:text-black transition-colors"
            >
              +55 (43) 99123.1726
            </a>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-4">Siga.</p>
            <div className="flex flex-col gap-2">
              <Link
                href="https://www.instagram.com/olivetocont"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </Link>
              <Link
                href="https://www.linkedin.com/company/olivetocont/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Linkedin
              </Link>
              <Link
                href="https://www.tiktok.com/@olivetocont"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Tiktok
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between text-xs text-gray-600">
          <Link href="https://www.kous9.studio/" target="_blank" rel="noopener noreferrer">
            <p>
              BRANDING E LAYOUT -{" "}
              <span className="text-white font-medium">KOUS9 STUDIO</span>
            </p>
          </Link>
          <Link href="https://www.tyou.com.br/" target="_blank" rel="noopener noreferrer">
            <p>
              DESENVOLVIMENTO -{" "}
              <span className="text-white font-medium">
                T<span className="text-[#00A5B4]">_</span>YOU
              </span>
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
