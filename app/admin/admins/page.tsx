import React from "react";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Plus, Shield, Mail, UserCircle, Edit2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const admins = [
  { id: 1, name: "Joseph Amuyunzu", email: "admin@ndym.org", role: "SUPER_ADMIN", scope: "Diocese-wide" },
  { id: 2, name: "Sarah Wambui", email: "sarah.w@ndym.org", role: "DIOCESE_ADMIN", scope: "Nairobi Diocese" },
  { id: 3, name: "John Maina", email: "j.maina@parish.org", role: "PARISH_ADMIN", scope: "Jogoo Road Parish" },
  { id: 4, name: "David Kimani", email: "d.kimani@church.org", role: "CHURCH_LEADER", scope: "St. Stephens Church" },
];

export default function AdminsPage() {
  return (<>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight">Admin Management</h2>
          <p className="text-muted-foreground text-sm font-medium mt-1">Manage user roles and hierarchical access permissions.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" className="gap-2 shadow-md shadow-primary/20">
            <Plus size={18} /> Invite New Admin
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-primary text-white border-none shadow-lg shadow-primary/20">
          <CardContent className="p-6">
            <Shield className="mb-4 opacity-50" size={32} />
            <h3 className="text-3xl font-bold mb-1">12</h3>
            <p className="text-sm font-medium text-primary-foreground/80">Total Administrators</p>
          </CardContent>
        </Card>
        <Card className="bg-white border text-slate-800">
          <CardContent className="p-6">
            <ShieldAlert className="mb-4 text-secondary opacity-50" size={32} />
            <h3 className="text-3xl font-bold mb-1">2</h3>
            <p className="text-sm font-medium text-muted-foreground">Super Admins</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {admins.map((admin) => (
          <Card key={admin.id} className="border-none shadow-sm group">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-primary border border-slate-200">
                    <UserCircle size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      {admin.name}
                      <span className={cn(
                        "text-[10px] uppercase font-black px-2 py-0.5 rounded",
                        admin.role === "SUPER_ADMIN" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                      )}>
                        {admin.role.replace('_', ' ')}
                      </span>
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-1 mt-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Mail size={14} />
                        {admin.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase font-bold tracking-wider">
                        <CardDescription>Scope: {admin.scope}</CardDescription>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit2 size={14} /> Edit Permissions
                  </Button>
                  <Button variant="ghost" size="sm" className="text-secondary hover:bg-secondary/5">Deactivate</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

  </>);
}
