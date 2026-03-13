import React from "react";

import StatsCards from "@/components/admin/stats-cards";
import YouthTable from "@/components/admin/youth-table";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight">Overview</h2>
          <p className="text-muted-foreground text-sm font-medium mt-1">Welcome back, here is what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 shadow-sm">
            <Download size={18} /> Export Report
          </Button>
          <Button variant="primary" className="gap-2 shadow-md shadow-primary/20">
            <Plus size={18} /> Add New Entry
          </Button>
        </div>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-heading font-semibold text-slate-800">Recent Registrations</h3>
            <Button variant="link" className="text-sm font-semibold p-0">View all members</Button>
          </div>
          <YouthTable />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-heading font-semibold text-slate-800">Activity Timeline</h3>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <ul className="space-y-6 relative before:absolute before:inset-y-0 before:left-3 before:w-px before:bg-slate-100">
              {[
                { user: "Admin Sarah", action: "Updated youth record", target: "John Doe", time: "2 mins ago" },
                { user: "System", action: "Automatic backup completed", target: "Vault", time: "45 mins ago" },
                { user: "Admin Peter", action: "Created new parish", target: "Upper Hill", time: "2 hours ago" },
                { user: "Admin Mary", action: "Deleted archived records", target: "2022 Batch", time: "5 hours ago" },
              ].map((activity, i) => (
                <li key={i} className="pl-8 relative">
                  <span className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <div>
                    <p className="text-sm text-slate-900">
                      <span className="font-bold">{activity.user}</span> {activity.action}{" "}
                      <span className="font-semibold text-primary">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full mt-6 text-xs h-9">View detailed logs</Button>
          </div>

          <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
            <h4 className="font-heading font-bold mb-2">Need help?</h4>
            <p className="text-sm text-primary-foreground/80 mb-4 leading-relaxed">Check out the documentation for managing hierarchy and role-based permissions.</p>
            <Button variant="secondary" className="w-full bg-white text-primary border-none hover:bg-slate-50">Open Support</Button>
          </div>
        </div>
      </div>
    </>
  );
}
