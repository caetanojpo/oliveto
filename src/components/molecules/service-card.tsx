import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/types/service";
import Link from "next/link";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={service.href}
      className="group relative border border-gray-700 p-8 py-16 hover:border-primary transition-colors"
    >
      <h3 className="text-lg font-medium tracking-wider text-center">
        {service.title}
      </h3>
      <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary transition-colors">
        <ArrowUpRight className="w-4 h-4 text-primary group-hover:text-black" />
      </div>
    </Link>
  );
}
