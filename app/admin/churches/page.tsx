import React from "react";


export default function ChurchesPage() {
  return (<>

      <div className="flex flex-col gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight">Churches</h2>
          <p className="text-muted-foreground text-sm font-medium mt-1">Manage and view all churches in the diocese.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-8 shadow-sm text-center">
        <p className="text-slate-500">Churches management content will appear here.</p>
      </div>

  </>);
}
