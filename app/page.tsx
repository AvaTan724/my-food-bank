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
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      {/* Header Section */}
      <div className="max-w-2xl w-full text-center mb-6">
        <h1 className="text-4xl font-bold text-green-700 mt-6">
          Sunway City Food Bank
        </h1>
        <p className="text-gray-600 mt-2">
          Connecting Donors, Reporters, and those in need across Selangor.
        </p>
      </div>

      {/* NEW: Your AppSheet Window */}
      <div className="w-full flex justify-center mb-8">
        <div className="relative border-4 border-white shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
          <iframe 
            src="https://www.appsheet.com/start/f1a6d2a0-9b9a-4adb-a62c-f827b888271c" 
            width="360" 
            height="600" 
            className="rounded-[2rem]"
            allow="geolocation"
          />
        </div>
      </div>

      {/* ORIGINAL: Combined Buttons Section */}
      <div className="flex flex-col gap-4 w-full max-w-xs mb-10">
        <a 
          href="https://www.foodbankmalaysia.com/" 
          target="_blank" 
          className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-green-700 transition"
        >
          Official FoodBank Malaysia
        </a>

        {/* Your Original GPS Button */}
        <button 
          onClick={getMyLocation}
          className="border-2 border-green-600 text-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-green-50 transition"
        >
          Check My GPS Coordinates
        </button>
      </div>

      {/* Impact Stats Footer */}
      <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
        <h2 className="text-lg font-bold">Sunway Impact Stats</h2>
        <p className="text-sm text-gray-500 italic">
          "You helped save 3kg of food and fed 5 people."
        </p>
      </div>
    </main>
  );
}