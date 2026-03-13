export default function YouthDetailsPage({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="flex flex-col gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight">Youth Member Details</h2>
          <p className="text-muted text-sm font-medium mt-1">Viewing registration details for ID: {params.id}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border p-8 shadow-sm text-center">
        <p className="text-slate-500">Member details content will appear here.</p>
      </div>
    </>
  );
}
