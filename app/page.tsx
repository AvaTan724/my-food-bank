"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col font-sans overflow-hidden">
      <section className="flex-grow w-full">
        <iframe 
          /* Point this src directly to your cleaned-up Dashboard view */
          src="https://www.appsheet.com/start/f1a6d2a0-9b9a-4adb-a62c-f827b888271c#view=New%20View" 
          className="w-full h-screen border-none"
          allow="geolocation *"
        />
      </section>
    </main>
  );
}