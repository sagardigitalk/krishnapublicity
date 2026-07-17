'use client';
import { useState, useEffect } from 'react';

export default function AdminHome() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [homeData, setHomeData] = useState({
    hero: { title: '', subtitle: '' },
    stats: [] as any[]
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/home')
      .then(res => res.json())
      .then(data => {
        setHomeData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/home', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Assuming backend has auth middleware (add if needed, currently it might not block PUT if not implemented, but good practice)
        },
        body: JSON.stringify(homeData)
      });
      if (res.ok) {
        setMessage('Home page content saved successfully!');
      } else {
        setMessage('Error saving content.');
      }
    } catch (err) {
      setMessage('An error occurred.');
    }
    setSaving(false);
  };

  const handleHeroChange = (field: string, value: string) => {
    setHomeData({
      ...homeData,
      hero: { ...homeData.hero, [field]: value }
    });
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...homeData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setHomeData({ ...homeData, stats: newStats });
  };

  const addStat = () => {
    setHomeData({
      ...homeData,
      stats: [...homeData.stats, { label: 'New Stat', value: '100', icon: 'zap' }]
    });
  };

  const removeStat = (index: number) => {
    const newStats = [...homeData.stats];
    newStats.splice(index, 1);
    setHomeData({ ...homeData, stats: newStats });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-end items-center mb-6">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#1B2642] text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-[#1B2642]/90 disabled:opacity-50 transition-colors shadow-sm"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} border ${message.includes('success') ? 'border-green-100' : 'border-red-100'} text-sm font-medium`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(27,38,66,0.04)] border border-gray-100/50">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
               <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
               </div>
               <div>
                 <h2 className="text-xl font-bold text-[#1B2642]">Hero Content</h2>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Primary Hero Text</p>
               </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Heading Title</label>
                <input 
                  type="text" 
                  value={homeData.hero?.title || ''} 
                  onChange={(e) => handleHeroChange('title', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3.5 focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] transition-all text-[#1B2642] font-medium text-sm"
                  placeholder="Elevate Your Market Presence"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Hero Description</label>
                <textarea 
                  value={homeData.hero?.subtitle || ''} 
                  onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3.5 h-32 focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] transition-all text-[#1B2642] font-medium text-sm leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(27,38,66,0.04)] border border-gray-100/50">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-50">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-[#1B2642]">Statistics</h2>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Impact Metrics</p>
                 </div>
              </div>
              <button onClick={addStat} className="text-xs font-bold text-[#1B2642] hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors border border-gray-200">
                + ADD STAT
              </button>
            </div>

            <div className="space-y-4">
              {homeData.stats?.map((stat, index) => (
                <div key={index} className="flex flex-wrap md:flex-nowrap items-end gap-4 p-4 border border-gray-100 rounded-2xl">
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Label</label>
                    <input 
                      type="text" 
                      value={stat.label || ''} 
                      onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    />
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Value</label>
                    <input 
                      type="text" 
                      value={stat.value || ''} 
                      onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    />
                  </div>
                  <div className="w-24">
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Icon</label>
                    <input 
                      type="text" 
                      value={stat.icon || ''} 
                      onChange={(e) => handleStatChange(index, 'icon', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                      placeholder="Icon"
                    />
                  </div>
                  <button 
                    onClick={() => removeStat(index)}
                    className="mb-1 text-gray-400 hover:text-red-500 p-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
              {(!homeData.stats || homeData.stats.length === 0) && (
                <p className="text-gray-400 text-sm text-center py-4">No statistics added yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info Blocks */}
        <div className="space-y-6">
          <div className="bg-[#1B2642] p-8 rounded-3xl text-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <h3 className="text-sm font-bold tracking-widest uppercase text-white/50">Live Preview</h3>
            </div>
            <p className="text-sm leading-relaxed text-white/90">
              Changes made here will take effect globally across the Home section of the site immediately upon saving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
