"use client";

import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Church, MapPin, ChevronRight, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const hierarchyData = [
  { 
    id: "1", 
    level: "Archdeaconry", 
    name: "Central", 
    children: [
      { id: "1-1", level: "Deanery", name: "Cathedral", children: [
        { id: "1-1-1", level: "Parish", name: "All Saints", churchCount: 4 }
      ]}
    ]
  },
  { 
    id: "2", 
    level: "Archdeaconry", 
    name: "Eastern", 
    children: [
      { id: "2-1", level: "Deanery", name: "Makadara", children: [
        { id: "2-1-1", level: "Parish", name: "St. Stephens", churchCount: 3 }
      ]}
    ]
  },
];

export default function HierarchyPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight">Church Hierarchy</h2>
          <p className="text-muted-foreground text-sm font-medium mt-1">Configure and manage diocese structure.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" className="gap-2 shadow-md shadow-primary/20">
            <Plus size={18} /> Add Archdeaconry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          {["Dioceses", "Archdeaconries", "Deaneries", "Parishes", "Churches"].map((level) => (
            <button
              key={level}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-semibold transition-all",
                level === "Archdeaconries" 
                  ? "bg-primary text-white border-primary shadow-sm" 
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>{level}</span>
              </div>
              <ChevronRight size={16} />
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-6">
          {hierarchyData.map((item) => (
            <Card key={item.id} className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50/50 flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <Church size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{item.name} {item.level}</CardTitle>
                    <CardDescription>{item.children.length} Deaneries</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Edit2 size={14} /></Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-secondary"><Trash2 size={14} /></Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {item.children.map((deanery) => (
                    <div key={deanery.id} className="p-4 md:p-6 pl-12 md:pl-16 relative">
                      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-slate-200" />
                      <div className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 w-4 h-px bg-slate-200" />

                      <div className="flex items-center justify-between group">
                        <div>
                          <p className="text-sm font-bold text-slate-800">{deanery.name} Deanery</p>
                          <p className="text-xs text-muted-foreground font-medium mt-0.5">{deanery.children.length} Parishes</p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Button variant="ghost" size="xs" className="h-7 px-2">Manage</Button>
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {deanery.children.map((parish) => (
                          <div key={parish.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100/50">
                            <div className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full bg-accent" />
                              <span className="text-sm font-medium text-slate-700">{parish.name} Parish</span>
                            </div>
                            <span className="text-xs font-bold text-muted-foreground bg-white px-2 py-0.5 rounded border">{parish.churchCount} Churches</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
