"use client";
import { useEffect, useState } from "react";
import { getFoodBankData } from "./actions/appsheet";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [mapUrl, setMapUrl] = useState("https://www.appsheet.com/start/f1a6d2a0-9b9a-4adb-a62c-f827b888271c#view=Where%20is%20help%20needed%3F");

  const updateList = () => {
    getFoodBankData().then(data => setLocations(data || []));
  };

  useEffect(() => {
    updateList();
  }, []);

  const handleUserClick = (location: string) => {
    const encodedLoc = encodeURIComponent(location);
    setMapUrl(`https://www.appsheet.com/start/f1a6d2a0-9b9a-4adb-a62c-f827b888271c#view=Where%20is%20help%20needed%3F&search=${encodedLoc}`);
  };

  return (
    <main className="min-h-screen bg-[#FDFBF2] p-8 font-sans relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-[#4A2C10]">Food Bank Hub</h2>
        <button 
          onClick={() => setIsEventModalOpen(true)}
          className="bg-white text-[#6B8E23] border-2 border-[#6B8E23] px-6 py-2 rounded-xl font-bold hover:bg-[#6B8E23] hover:text-white transition-all shadow-sm"
        >
          Post Event
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAP CONTAINER */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl h-[650px] overflow-hidden border-8 border-white">
          <iframe key={mapUrl} src={mapUrl} className="w-full h-full border-none" allow="geolocation *" />
        </div>

        {/* SIDEBAR */}
        <div className="flex flex-col h-[650px]">
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="font-bold text-[#4A2C10] uppercase tracking-widest text-[10px]">Live Activity</h3>
            <button onClick={updateList} className="text-[9px] font-bold text-[#6B8E23] hover:underline uppercase">
              ↻ Refresh List
            </button>
          </div>
          
          {/* SCROLLABLE LIST AREA */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-6 custom-scrollbar">
            {locations.map((row: any, i) => (
              <div 
                key={i} 
                onClick={() => handleUserClick(row["Location"])} 
                className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#6B8E23] cursor-pointer flex justify-between items-center group transition-all"
              >
                <div className="flex-1 pr-4">
                  <p className="font-black text-[#6B8E23] text-sm group-hover:underline">{row["User Type"] || "Request"}</p>
                  <p className="text-gray-500 text-[10px] mt-1 line-clamp-1">{row["Notes"] || "View details on map"}</p>
                </div>
                <span className="text-[9px] font-black text-[#6B8E23] border border-[#6B8E23]/20 px-2 py-1 rounded uppercase">Locate</span>
              </div>
            ))}
          </div>

          {/* BRANDED FULL-WIDTH CARD */}
          <button 
            onClick={() => window.open("https://foodbankmalaysia.com/about-us/", "_blank")}
            className="w-full bg-[#8CA646] hover:bg-[#7A913A] text-white p-5 rounded-[2rem] flex items-center gap-4 transition-all shadow-lg text-left group"
          >
            <div className="bg-white/20 p-3 rounded-2xl group-hover:bg-white/30 transition-colors">
              <span className="text-2xl">🤍</span>
            </div>
            <div>
              <p className="font-black text-[13px] leading-tight opacity-90">Support the Official</p>
              <p className="font-black text-[15px] leading-tight">FoodBank Malaysia Website</p>
            </div>
          </button>
        </div>
      </div>

      {/* OLIVE-THEMED EVENT MODAL */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative bg-[#1F2411] w-full max-w-4xl h-[80vh] rounded-[2.5rem] overflow-hidden flex shadow-2xl text-white border border-white/10">
            
            {/* Left Side: Image Preview */}
            <div className="w-2/5 relative p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070" className="absolute inset-0 w-full h-full object-cover z-[-1]" alt="Event" />
              <div className="bg-[#4A542C]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                <div className="text-xs">
                  <p className="opacity-60 uppercase font-black tracking-tighter">Theme</p>
                  <p className="font-bold text-[#FDFBF2]">Olive Minimal</p>
                </div>
                <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">⇄</button>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 p-12 overflow-y-auto space-y-8 bg-[#1F2411]">
              <div className="flex justify-between items-start">
                <input type="text" placeholder="Event Name" className="bg-transparent text-5xl font-serif outline-none w-full placeholder:text-white/10" />
                <button onClick={() => setIsEventModalOpen(false)} className="text-white/20 hover:text-white text-2xl transition-colors">✕</button>
              </div>

              {/* Date & Time */}
              <div className="bg-white/5 rounded-3xl p-6 space-y-6 border border-white/5">
                <div className="flex items-center gap-6">
                  <span className="text-[#6B8E23] font-black text-2xl">•</span>
                  <div className="flex-1 flex justify-between items-center">
                    <span className="font-bold text-lg">Start</span>
                    <div className="flex gap-2">
                      <span className="bg-white/10 px-4 py-2 rounded-xl text-sm font-medium">Mon 2 Feb</span>
                      <span className="bg-white/10 px-4 py-2 rounded-xl text-sm font-medium">09:00 PM</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-white/10 font-black text-2xl">○</span>
                  <div className="flex-1 flex justify-between items-center">
                    <span className="font-bold text-lg opacity-40">End</span>
                    <div className="flex gap-2 opacity-40">
                      <span className="bg-white/10 px-4 py-2 rounded-xl text-sm font-medium">Mon 2 Feb</span>
                      <span className="bg-white/10 px-4 py-2 rounded-xl text-sm font-medium">10:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Description */}
              <div className="space-y-4">
                <div className="bg-white/5 p-5 rounded-2xl flex items-center gap-4 border border-white/5 hover:border-white/10 transition-all">
                  <span className="text-xl">📍</span>
                  <input placeholder="Add Event Location" className="bg-transparent outline-none flex-1 placeholder:text-white/20" />
                </div>
                <div className="bg-white/5 p-5 rounded-2xl flex items-center gap-4 border border-white/5 hover:border-white/10 transition-all">
                  <span className="text-xl">📄</span>
                  <input placeholder="Add Description" className="bg-transparent outline-none flex-1 placeholder:text-white/20" />
                </div>
              </div>

              <button className="w-full bg-[#6B8E23] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#5A771D] transition-all mt-8 shadow-xl active:scale-[0.98]">
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}