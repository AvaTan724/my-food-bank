"use client";

export default function Home() {
  // Your original function for the GPS alert
  const getMyLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        alert(`Your Location: ${position.coords.latitude}, ${position.coords.longitude}`);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* 1. Professional Navigation Bar */}
      <nav className="bg-green-700 text-white p-4 shadow-md flex justify-between items-center px-8">
        <h1 className="text-2xl font-bold tracking-tight">Sunway City Food Bank</h1>
        <div className="flex gap-4">
          <button 
            onClick={getMyLocation}
            className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition text-sm shadow-sm"
          >
            Check My GPS
          </button>
          <a 
            href="https://www.foodbankmalaysia.com/" 
            target="_blank" 
            className="border border-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition"
          >
            Official Website
          </a>
        </div>
      </nav>

      {/* 2. Full-Screen Map Section */}
      <section className="flex-grow flex flex-col p-4 md:p-6">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex-grow border border-gray-200 relative">
          <iframe 
            src="https://www.appsheet.com/start/f1a6d2a0-9b9a-4adb-a62c-f827b888271c" 
            className="w-full h-full min-h-[600px]"
            /* Updated 'allow' string with wildcards (*) to help GPS fix in iframes */
            allow="geolocation *; camera *; microphone *; clipboard-write *"
            title="Sunway Food Bank Management System"
          />
        </div>
      </section>

      {/* 3. Footer Stats (Desktop Friendly) */}
      <footer className="bg-white border-t p-4 flex flex-wrap justify-around text-sm text-gray-600 font-medium">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <span>Donors Active in Selangor</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          <span>Needs Reported in Sunway</span>
        </div>
        <p className="italic text-gray-400">Sunway City Community Project © 2026</p>
      </footer>
    </main>
  );
}