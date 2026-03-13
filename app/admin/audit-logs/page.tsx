import React from "react";

import { Card, CardContent } from "@/components/ui/Card";
import { 
  History, 
  User, 
  Database, 
  Clock, 
  AlertCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

const logs = [
  { id: 1, user: "Sarah Wambui", action: "Updated", target: "Youth Member", details: "Changed 'John Doe' parish from Cathedral to Jogoo Road", time: "10:45 AM, Today", type: "UPDATE" },
  { id: 2, user: "John Maina", action: "Created", target: "Church", details: "Added 'St. Peters' to Makadara Parish", time: "09:20 AM, Today", type: "CREATE" },
  { id: 3, user: "David Kimani", action: "Deleted", target: "Admin", details: "Removed 'Admin Mark' from church leaders", time: "Yesterday, 04:15 PM", type: "DELETE" },
  { id: 4, user: "System", action: "Security", target: "Audit", details: "Successful backup of database records", time: "Yesterday, 12:00 AM", type: "SYSTEM" },
  { id: 5, user: "Mercy Otieno", action: "Login", target: "Auth", details: "Successful login via dashboard", time: "Yesterday, 08:30 AM", type: "LOGIN" },
];

export default function AuditLogsPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight">Audit Logs</h2>
          <p className="text-muted-foreground text-sm font-medium mt-1">Track every administrative action for accountability.</p>
        </div>
      </div>

      <div className="space-y-4">
        {logs.map((log) => (
          <Card key={log.id} className="border-none shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-3 rounded-full shrink-0",
                    log.type === "CREATE" && "bg-green-100 text-green-700",
                    log.type === "UPDATE" && "bg-blue-100 text-blue-700",
                    log.type === "DELETE" && "bg-red-100 text-red-700",
                    log.type === "SYSTEM" && "bg-slate-100 text-slate-700",
                    log.type === "LOGIN" && "bg-purple-100 text-purple-700",
                  )}>
                    {log.type === "CREATE" && <Database size={20} />}
                    {log.type === "UPDATE" && <Clock size={20} />}
                    {log.type === "DELETE" && <AlertCircle size={20} />}
                    {log.type === "SYSTEM" && <History size={20} />}
                    {log.type === "LOGIN" && <User size={20} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-900">{log.user}</span>
                      <span className={cn(
                        "text-[10px] font-extrabold px-1.5 py-0.5 rounded",
                        log.type === "CREATE" && "bg-green-100 text-green-800",
                        log.type === "UPDATE" && "bg-blue-100 text-blue-800",
                        log.type === "DELETE" && "bg-red-100 text-red-800",
                        log.type === "SYSTEM" && "bg-slate-100 text-slate-800",
                        log.type === "LOGIN" && "bg-purple-100 text-purple-800",
                      )}>
                        {log.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{log.details}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Clock size={14} />
                        {log.time}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Database size={14} />
                        Target: {log.target}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
