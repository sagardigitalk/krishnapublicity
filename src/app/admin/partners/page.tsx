'use client';
import { useState, useEffect } from 'react';

export default function AdminPartners() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [homeData, setHomeData] = useState<any>({ partners: [] });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/home');
      const data = await res.json();
      setHomeData(data);
    } catch (error) {
      console.error('Error fetching home content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePartnerChange = (index: number, field: string, value: string) => {
    const newPartners = [...(homeData.partners || [])];
    newPartners[index] = { ...newPartners[index], [field]: value };
    setHomeData({ ...homeData, partners: newPartners });
  };

  const addPartner = () => {
    setHomeData({
      ...homeData,
      partners: [...(homeData.partners || []), { name: '', image: '' }]
    });
  };

  const removePartner = (index: number) => {
    const newPartners = [...(homeData.partners || [])];
    newPartners.splice(index, 1);
    setHomeData({ ...homeData, partners: newPartners });
  };

  const uploadFile = async (e: any, index: number) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        const imagePath = await res.text();
        handlePartnerChange(index, 'image', `http://localhost:5000${imagePath}`);
      } else {
        setMessage('Error uploading image');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error uploading image');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/home', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ partners: homeData.partners }),
      });
      
      if (res.ok) {
        setMessage('Partners content updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center text-sm font-medium text-gray-500">
           <span>Sanctuary</span>
           <span className="mx-2">&gt;</span>
           <span className="text-[#1B2642] font-bold">Partners Gallery Management</span>
        </div>
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
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-50">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-[#1B2642]">Our Elite Partners</h2>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Logo Gallery</p>
                 </div>
              </div>
              <button onClick={addPartner} className="text-xs font-bold text-[#1B2642] hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors border border-gray-200">
                + ADD PARTNER
              </button>
            </div>

            <div className="space-y-4">
              {homeData.partners?.map((partner: any, index: number) => (
                <div key={index} className="flex flex-wrap md:flex-nowrap items-end gap-4 p-4 border border-gray-100 rounded-2xl bg-[#F9F7F2]/50">
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Company Name</label>
                    <input 
                      type="text" 
                      value={partner.name || ''} 
                      onChange={(e) => handlePartnerChange(index, 'name', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] text-[#1B2642]"
                      placeholder="e.g. Maruti Suzuki"
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Logo Image</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="file" 
                        onChange={(e) => uploadFile(e, index)}
                        className="w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#1B2642] file:text-white hover:file:bg-[#1B2642]/90 cursor-pointer"
                        accept="image/*"
                      />
                    </div>
                  </div>
                  {partner.image && (
                    <div className="w-16 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                       <img src={partner.image} alt="preview" className="max-w-full max-h-full object-contain p-1" />
                    </div>
                  )}
                  <button 
                    onClick={() => removePartner(index)}
                    className="mb-2 text-gray-400 hover:text-red-500 p-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
              {(!homeData.partners || homeData.partners.length === 0) && (
                <p className="text-gray-400 text-sm text-center py-4">No partners added yet.</p>
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
              Changes made here will take effect in the "Our Elite Partners" gallery on the site immediately upon saving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
