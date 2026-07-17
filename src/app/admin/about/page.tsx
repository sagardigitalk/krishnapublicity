'use client';
import { useState, useEffect } from 'react';

export default function AdminAbout() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [aboutData, setAboutData] = useState({
    title: '', 
    description: '',
    team: [] as any[]
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/about')
      .then(res => res.json())
      .then(data => {
        setAboutData(data);
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
      const res = await fetch('http://localhost:5000/api/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(aboutData)
      });
      if (res.ok) {
        setMessage('About page content saved successfully!');
      } else {
        setMessage('Error saving content.');
      }
    } catch (err) {
      setMessage('An error occurred.');
    }
    setSaving(false);
  };

  const handleChange = (field: string, value: string) => {
    setAboutData({
      ...aboutData,
      [field]: value
    });
  };

  const handleTeamChange = (index: number, field: string, value: string) => {
    const newTeam = [...aboutData.team];
    newTeam[index] = { ...newTeam[index], [field]: value };
    setAboutData({ ...aboutData, team: newTeam });
  };

  const addTeamMember = () => {
    setAboutData({
      ...aboutData,
      team: [...aboutData.team, { name: 'New Member', role: 'Role', image: '/placeholder.jpg', bio: 'Short bio...' }]
    });
  };

  const removeTeamMember = (index: number) => {
    const newTeam = [...aboutData.team];
    newTeam.splice(index, 1);
    setAboutData({ ...aboutData, team: newTeam });
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
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <div>
                 <h2 className="text-xl font-bold text-[#1B2642]">About Header</h2>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Company Info</p>
               </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Title</label>
                <input 
                  type="text" 
                  value={aboutData.title || ''} 
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3.5 focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] transition-all text-[#1B2642] font-medium text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Description</label>
                <textarea 
                  value={aboutData.description || ''} 
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3.5 h-32 focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] transition-all text-[#1B2642] font-medium text-sm leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(27,38,66,0.04)] border border-gray-100/50">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-50">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-[#1B2642]">Team Members</h2>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Leadership & Staff</p>
                 </div>
              </div>
              <button onClick={addTeamMember} className="text-xs font-bold text-[#1B2642] hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors border border-gray-200">
                + ADD MEMBER
              </button>
            </div>

            <div className="space-y-6">
              {aboutData.team?.map((member, index) => (
                <div key={index} className="flex flex-col gap-4 p-6 border border-gray-100 rounded-2xl relative group">
                  <button 
                    onClick={() => removeTeamMember(index)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-2 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Name</label>
                      <input 
                        type="text" 
                        value={member.name || ''} 
                        onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                        className="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Role</label>
                      <input 
                        type="text" 
                        value={member.role || ''} 
                        onChange={(e) => handleTeamChange(index, 'role', e.target.value)}
                        className="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Image URL (e.g. /main1.jpg)</label>
                    <input 
                      type="text" 
                      value={member.image || ''} 
                      onChange={(e) => handleTeamChange(index, 'image', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Bio</label>
                    <textarea 
                      value={member.bio || ''} 
                      onChange={(e) => handleTeamChange(index, 'bio', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-3.5 h-24 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                    />
                  </div>
                </div>
              ))}
              {(!aboutData.team || aboutData.team.length === 0) && (
                <p className="text-gray-400 text-sm text-center py-4">No team members added yet.</p>
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
              Changes made here will take effect globally across the About section of the site immediately upon saving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
