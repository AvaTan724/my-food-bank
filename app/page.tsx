"use client";
import { useEffect, useState } from "react";
import { getFoodBankData } from "./actions/appsheet";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [mapUrl, setMapUrl] = useState("https://www.appsheet.com/start/f1a6d2a0-9b9a-4adb-a62c-f827b888271c#view=Where%20is%20help%20needed%3F");

  // Auto-sync data every 10 seconds so new pins appear in the list
  useEffect(() => {
    const fetchData = () => {
      getFoodBankData().then(data => setLocations(data || []));
    };
    fetchData();
    const interval = setInterval(fetchData, 10000); 
    return () => clearInterval(interval);
  }, []);

  // Update map focus when a user clicks 'LOCATE'
  const handleUserClick = (location: string) => {
    const encodedLoc = encodeURIComponent(location);
    // Uses the &search parameter to fly the map to coordinates
    setMapUrl(`https://www.appsheet.com/start/f1a6d2a0-9b9a-4adb-a62c-f827b888271c#view=Where%20is%20help%20needed%3F&search=${encodedLoc}`);
  };

  return (
    <main className="min-h-screen bg-[#FDFBF2] p-8 font-sans">
      {/* HUB HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-[#4A2C10]">Food Bank Hub</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAP CONTAINER WITH DEEP CROP */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl h-[650px] relative overflow-hidden border-8 border-white">
          
          {/* NATIVE HEADER OVERLAY: Replaces cropped AppSheet text */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-white z-20 flex items-center justify-between px-8 border-b border-gray-50">
            <h3 className="font-bold text-[#4A2C10] text-lg">Who needs help?</h3>
            {/* Instruction for the native 'Place pin' function */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#6B8E23] rounded-full animate-ping"></span>
              <p className="text-[10px] font-bold text-[#6B8E23] uppercase tracking-wider">
                Click "Place pin" on map to add request
              </p>
            </div>
          </div>

          {/* THE CROP: -110px hides gray nav and "Where is help needed?" text */}
          <div className="absolute top-[-110px] left-0 w-full h-[calc(100%+110px)] z-10">
            <iframe 
              key={mapUrl} 
              src={mapUrl} 
              className="w-full h-full border-none" 
              allow="geolocation *" 
            />
          </div>
        </div>

        {/* SIDEBAR LIST */}
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[650px] pr-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-[#4A2C10] uppercase tracking-widest text-[10px]">Live Activity</h3>
            <span className="text-[9px] text-gray-400 font-medium">Updates every 10s</span>
          </div>
          
          {locations.map((row: any, i) => (
            <div 
              key={i} 
              onClick={() => handleUserClick(row["Location"])}
              className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#6B8E23] hover:shadow-md cursor-pointer flex justify-between items-center group transition-all"
            >
              <div className="flex-1 pr-4">
                <p className="font-black text-[#6B8E23] text-sm group-hover:underline">
                  {row["User Type"] || "Help Request"}
                </p>
                <p className="text-gray-500 text-[10px] mt-1 line-clamp-1">
                  {row["Notes"] || "No additional details provided."}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[9px] font-black text-[#6B8E23] border border-[#6B8E23]/20 px-2 py-1 rounded uppercase tracking-tighter">
                  Locate
                </span>
              </div>
            </div>
          ))}

          {locations.length === 0 && (
            <div className="text-center py-20 bg-white/50 rounded-2xl border-2 border-dashed border-gray-100">
              <p className="text-gray-400 text-xs italic">Connecting to Sunway Food Bank...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}