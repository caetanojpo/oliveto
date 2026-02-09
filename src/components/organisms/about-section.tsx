import { Button } from "@/components/atoms/button";
import Link from "next/link";
import { aboutContent } from "@/lib/constants/about";

export function AboutSection() {
  return (
    <section id="sobre" className="px-8 py-16 md:px-16 md:py-24 bg-secondary">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <p className="text-primary text-lg md:text-xl leading-relaxed mb-6">
            {aboutContent.mainText}
          </p>
          <p className="text-gray-400 leading-relaxed">
            {aboutContent.subText}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-4">{aboutContent.label}</p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {aboutContent.historyParagraph1}
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-8">
            {aboutContent.historyParagraph2}
          </p>
          <Link href={aboutContent.buttonHref}>
            <Button
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-black text-sm cursor-pointer"
            >
              {aboutContent.buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
