import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import Image from "next/image";
import { PageBackgroundWords } from "@/components/atoms/page-background-words";
import { FounderProfile } from "@/components/molecules/founder-profile";
import { sobrePageContent, founders } from "@/lib/constants/sobre-page";
import { IMAGES } from "@/lib/constants/images";

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-secondary text-foreground">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-black pt-24 pb-12 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              {sobrePageContent.pageTitle}
            </h1>
          </div>
          <PageBackgroundWords />
        </section>

        {/* History and Manifesto */}
        <section className="container mx-auto px-6 py-16 relative bg-secondary">
          <div className="relative z-10">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Left column - History */}
              <div className="space-y-6">
                {sobrePageContent.history.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-sm md:text-base text-gray-300 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Right column - Manifesto */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                  {sobrePageContent.manifestoTitle}
                </h2>
                <div className="space-y-4 text-sm md:text-base text-gray-300 leading-relaxed">
                  {sobrePageContent.manifesto.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="container mx-auto px-6 py-16">
          <div>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Founders Image */}
              <div className="relative aspect-[3/4] bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
                <Image
                  src={IMAGES.SOCIOS}
                  alt="Augusto Favareto e Murilo de Oliveira - Sócios fundadores da Oliveto"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Founders Info */}
              <div className="space-y-12">
                {founders.map((founder) => (
                  <FounderProfile key={founder.name} founder={founder} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
