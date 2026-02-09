import { Users, TrendingUp, MessageCircle, Trophy } from "lucide-react";
import { AnalyticsCard } from "../molecules/analytics-card";
import { DashboardStats } from "../../types";

interface AnalyticsStatsProps {
  stats: DashboardStats;
  isLoading: boolean;
}

export function AnalyticsStats({ stats, isLoading }: AnalyticsStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <AnalyticsCard
        title="Total de Leads"
        value={stats.totalLeads.toLocaleString()}
        icon={Users}
        description="Leads capturados"
        isLoading={isLoading}
        trend="+2 este mês"
        iconClassName="bg-primary/10 text-primary"
        trendClassName="text-primary bg-primary/10"
      />
      <AnalyticsCard
        title="Novas Mensagens"
        value={stats.unreadLeads.toLocaleString()}
        icon={MessageCircle}
        description="Aguardando resposta"
        isLoading={isLoading}
        trend="Em dia"
        iconClassName="bg-blue-500/10 text-blue-400"
        trendClassName="text-blue-400 bg-blue-400/10"
      />
      <AnalyticsCard
        title="Taxa de Conversão"
        value={`${stats.conversionRate}%`}
        icon={TrendingUp}
        description="Visitas vs. Leads"
        isLoading={isLoading}
        trend="1 pendente"
        iconClassName="bg-amber-500/10 text-amber-400"
        trendClassName="text-amber-400 bg-amber-400/10"
      />
      <AnalyticsCard
        title="Artigo Mais Lido"
        value={stats.topArticle?.views.toLocaleString() || "-"}
        icon={Trophy}
        description={stats.topArticle?.title || "Sem dados"}
        isLoading={isLoading}
        trend="4 novos"
        iconClassName="bg-purple-500/10 text-purple-400"
        trendClassName="text-purple-400 bg-purple-400/10"
      />
    </div>
  );
}
