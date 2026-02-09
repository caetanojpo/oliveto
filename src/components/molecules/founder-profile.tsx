import type { Founder } from "@/lib/types/founder";

interface FounderProfileProps {
  founder: Founder;
}

export function FounderProfile({ founder }: FounderProfileProps) {
  return (
    <div>
      <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">
        {founder.name}
      </h3>
      <p className="text-sm text-gray-400 mb-4">{founder.role}</p>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-2">
            Formação e especializações
          </p>
          <ul className="text-sm text-gray-300 space-y-1">
            {founder.education.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Atuação:</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            {founder.expertise}
          </p>
        </div>
      </div>
    </div>
  );
}
