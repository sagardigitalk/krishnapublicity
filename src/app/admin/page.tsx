'use client';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-serif font-bold text-theme-navy">Dashboard Overview</h1>
      
      <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(27,38,66,0.05)] border border-theme-navy/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-theme-navy/[0.03] rounded-full blur-3xl -mr-20 -mt-20"></div>
        <h2 className="text-2xl font-bold text-theme-navy mb-4 relative z-10">Welcome to Krishna Publicity Admin Panel</h2>
        <p className="text-theme-navy/70 max-w-2xl text-lg relative z-10">
          From here you can manage the content displayed on your website. Use the sidebar to navigate to the different sections.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(27,38,66,0.05)] border border-theme-navy/10 hover:border-theme-navy/30 transition-all group">
          <h3 className="text-xl font-bold text-theme-navy mb-3">Home Page Content</h3>
          <p className="text-theme-navy/60 mb-6">Manage the Hero section title, subtitle, and the statistics shown on the home page.</p>
          <a href="/admin/home" className="inline-flex items-center text-sm font-bold tracking-widest uppercase text-theme-navy hover:opacity-70 transition-opacity">
            Edit Home Page <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(27,38,66,0.05)] border border-theme-navy/10 hover:border-theme-navy/30 transition-all group">
          <h3 className="text-xl font-bold text-theme-navy mb-3">About Page Content</h3>
          <p className="text-theme-navy/60 mb-6">Manage the About section title, description, and your team members.</p>
          <a href="/admin/about" className="inline-flex items-center text-sm font-bold tracking-widest uppercase text-theme-navy hover:opacity-70 transition-opacity">
            Edit About Page <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
