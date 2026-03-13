import React from "react";
import { 
  Users, 
  UserCheck, 
  MapPin, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Total Youth",
    value: "2,543",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "blue",
  },
  {
    title: "Active Leaders",
    value: "128",
    change: "+3.2%",
    trend: "up",
    icon: UserCheck,
    color: "red",
  },
  {
    title: "Parishes",
    value: "42",
    change: "0%",
    trend: "neutral",
    icon: MapPin,
    color: "amber",
  },
  {
    title: "Growth Rate",
    value: "18%",
    change: "-2.4%",
    trend: "down",
    icon: TrendingUp,
    color: "green",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={cn(
                "p-3 rounded-xl",
                stat.color === "blue" && "bg-primary/10 text-primary",
                stat.color === "red" && "bg-secondary/10 text-secondary",
                stat.color === "amber" && "bg-accent/20 text-accent-foreground",
                stat.color === "green" && "bg-green-100 text-green-700",
              )}>
                <stat.icon size={24} />
              </div>
              <div className={cn(
                "flex items-center text-xs font-bold px-2 py-1 rounded-full",
                stat.trend === "up" && "bg-green-100 text-green-700",
                stat.trend === "down" && "bg-red-100 text-red-700",
                stat.trend === "neutral" && "bg-slate-100 text-slate-600",
              )}>
                {stat.trend === "up" && <ArrowUpRight size={14} className="mr-1" />}
                {stat.trend === "down" && <ArrowDownRight size={14} className="mr-1" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">{stat.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
