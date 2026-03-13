import React from "react";

import YouthTable from "@/components/admin/youth-table";
import { Button } from "@/components/ui/button";
import { Plus, Download, FileSpreadsheet } from "lucide-react";

export default function YouthManagementPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight">Youth Management</h2>
          <p className="text-muted-foreground text-sm font-medium mt-1">Manage all youth registered across the diocese.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download size={18} /> Export PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <FileSpreadsheet size={18} /> Export Excel
          </Button>
          <Button variant="primary" className="gap-2 shadow-md shadow-primary/20">
            <Plus size={18} /> Register Youth
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <YouthTable />
      </div>
    </>
  );
}
