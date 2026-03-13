"use client";

import React from "react";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  ExternalLink, 
  Trash2, 
  Edit 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const mockYouth = [
  { id: "1", name: "Sarah Wambui", email: "sarah@example.com", church: "St. Stephens", parish: "Jogoo Road", status: "Student", joined: "2024-02-12" },
  { id: "2", name: "John Maina", email: "john.m@gmail.com", church: "All Saints", parish: "Cathedral", status: "Working", joined: "2024-01-28" },
  { id: "3", name: "David Kimani", email: "d.kimani@outlook.com", church: "St. Lukes", parish: "Makadara", status: "Self-Employed", joined: "2023-11-15" },
  { id: "4", name: "Mercy Otieno", email: "mercy.o@gmail.com", church: "St. Marks", parish: "Westlands", status: "Student", joined: "2024-03-01" },
  { id: "5", name: "Peter Kamau", email: "pk@finance.co.ke", church: "Holy Trinity", parish: "Kileleshwa", status: "Working", joined: "2023-09-20" },
];

export default function YouthTable() {
  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <div className="p-4 md:p-6 bg-white border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search members..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter size={16} /> Filters
          </Button>
          <Button variant="primary" size="sm">Export Data</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
              <th className="px-6 py-4">Member</th>
              <th className="px-6 py-4">Church / Parish</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockYouth.map((youth) => (
              <tr key={youth.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                      {youth.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors">{youth.name}</p>
                      <p className="text-xs text-muted-foreground">{youth.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-700">{youth.church}</p>
                  <p className="text-xs text-muted-foreground">{youth.parish}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
                    youth.status === "Student" && "bg-blue-100 text-blue-700",
                    youth.status === "Working" && "bg-green-100 text-green-700",
                    youth.status === "Self-Employed" && "bg-amber-100 text-amber-700",
                  )}>
                    {youth.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {new Date(youth.joined).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-secondary hover:bg-secondary/5 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 md:p-6 bg-white border-t flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-medium">Showing 5 of 2,543 members</p>
        <div className="flex gap-2">
          <Button variant="outline" size="xs" disabled>Previous</Button>
          <Button variant="outline" size="xs">Next</Button>
        </div>
      </div>
    </Card>
  );
}
