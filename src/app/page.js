"use client";

import React from "react";
import HTMLFlipBook from "react-pageflip";
import { useState, useRef } from "react";

// 1. UPDATED CONFIGURATION
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// We remove 'anni/' from the URL because Cloudinary is serving from the root
const getImg = (name) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/v1/${name}`;
const getVid = (name) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto/v1/${name}`;

// Cloudinary handles audio files under the /video/ path
const getAudio = (name) => `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/v1/${name}`;

// 1. THIS IS THE "PAGE" TEMPLATE
// It tells the flipbook library how to grab and turn the HTML elements
const Page = React.forwardRef((props, ref) => {
  return (
    <div className="bg-white shadow-2xl overflow-hidden relative" ref={ref}>
      {props.children}
    </div>
  );
});
Page.displayName = "Page";

export default function Home() {
const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1a1614] p-4 md:p-8">
      <audio ref={audioRef} src={getAudio("RUELLE_-_I_Get_To_Love_You_Official_Lyric_Video_-_Ruelle_wmlw3w")} loop />
      
{/* FLOATING PLAY BUTTON (Made more compact on mobile) */}
      <button 
        onClick={toggleMusic}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white/20 backdrop-blur-lg border border-white/40 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-serif text-[9px] md:text-sm uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2 md:gap-3"
      >
        {isPlaying ? (
          <>
            <span className="text-sm md:text-lg">⏸</span> 
            Pause Soundtrack
          </>
        ) : (
          <>
            <span className="text-sm md:text-lg animate-pulse">▶️</span> 
            Play Soundtrack
          </>
        )}
      </button>
      
      {/* 2. THE FLIPBOOK CONTAINER */}
      {/* width and height define the magazine aspect ratio */}
<HTMLFlipBook 
        width={400} 
        height={600} 
        size="stretch" // <-- Changed back to "stretch" so the library doesn't crash
        minWidth={300} 
        maxWidth={500} // <-- This is what actually fixes the zoom issue!
        minHeight={400} 
        maxHeight={750} 
        maxShadowOpacity={0.5} 
        showCover={true} 
        mobileScrollSupport={true}
        usePortrait={true} 
      >
        {/* PAGE 1: THE COVER */}
        <Page>
          {/* Placeholder Gradient instead of the photo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D241E] to-[#6b1e1e]" />
          <div className="absolute inset-0 bg-black/40" />

          {/* Top Bar */}
          <div className="absolute top-6 w-full flex justify-between px-6 text-white/90 text-[10px] uppercase tracking-widest font-sans z-10">
            <span>Our Anniversary </span>
            <span>Vol. 02</span>
          </div>

          {/* Main Title */}
          <div className="absolute top-24 w-full text-center px-2 z-10">
            <h1 className="text-[#F9F7F2] text-6xl font-serif tracking-tighter uppercase leading-none">
              Happy <br /> Anniversary
            </h1>
          </div>
        </Page>

        {/* PAGE 2: INSIDE COVER (The Letter) */}
        <Page>
          <div className="h-full w-full bg-[#F9F7F2] p-8 flex flex-col justify-center border-r border-stone-200">
            <h2 className="text-4xl font-serif text-[#2D241E] mb-6">
              Hey, My Best Girl
            </h2>
            <p className="text-stone-700 italic leading-relaxed text-sm">
              "Two years of memories, laughter, and building a life together. I
              couldn't just buy a card, so I built this instead."
            </p>
            <p className="mt-8 font-serif font-bold text-red-700">
              —  Chi 
            </p>
          </div>
        </Page>

        {/* PAGE 3: FIRST MEMORY */}
        <Page>
          <div className="h-full w-full bg-[#F9F7F2] p-8 flex flex-col items-center justify-center border-l border-stone-300 shadow-[inset_10px_0_15px_-10px_rgba(0,0,0,0.1)]">
            {/* Real Polaroid Container */}
            <div className="w-64 h-80 bg-white shadow-xl p-4 pb-16 rotate-3 border border-stone-100 relative group">
              <div className="w-full h-full overflow-hidden bg-stone-100">
                <img
                  src={getImg("cover-photo_ew7xst")}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  alt="Our first trip"
                />
              </div>

              {/* Handwritten-style Caption */}
              <p className="absolute bottom-4 left-0 right-0 text-center font-serif text-lg text-stone-800 rotate-[-2deg] tracking-tight">
                Our first night out this year  
              </p>
            </div>
          </div>
        </Page>

        {/* PAGE 5: FASHIONISTA COLLAGE [Matched to Video 0:16] */}
        <Page>
          <div className="h-full w-full bg-[#1a1a1a] relative p-6 overflow-hidden">
     {/* 1. THE FAINT BACKGROUND IMAGE HOLDER */}
            <div className="absolute inset-0 z-0 overflow-hidden">
               <img 
                  src={getImg("bg-faint_p71ybc.jpg")} 
                  className="w-full h-full object-cover opacity-40 grayscale-[20%]" 
                  alt="" 
               />
               {/* Adjusted Gradient: from-black/10 (very light) to black/80 (darker at bottom for text) */}
               <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#1a1a1a]/30 to-[#1a1a1a]/90" />
            </div>

            {/* 2. CONTENT LAYER (z-10 ensures it stays above the faint background) */}
            <div className="relative z-10 h-full w-full">
              <h2 className="text-white/90 text-center font-serif text-3xl tracking-widest uppercase mb-4 pt-2">
                Fashionista
              </h2>
              {/* --- POLAROIDS MOVED TO THE EDGES --- */}

                {/* Top Left Polaroid (Moved out of center) */}
               {/* --- POLAROIDS (Scaled down for mobile) --- */}

                {/* Top Left Polaroid */}
                <div className="absolute top-20 left-0 md:top-24 md:left-2 bg-white p-1.5 pb-5 md:p-2 md:pb-10 shadow-2xl -rotate-6 w-28 md:w-36 z-40 hover:z-50 hover:scale-105 transition-all">
                  <div className="w-full h-24 md:h-32 bg-stone-100 overflow-hidden">
                    <img src={getImg("fashion-1_edyxh2")} className="w-full h-full object-cover grayscale-0 md:grayscale-[10%] md:hover:grayscale-0" />
                  </div>
                </div>

                {/* Middle Right Polaroid */}
                <div className="absolute top-1/3 -right-2 md:-right-4 bg-white p-1.5 pb-5 md:p-2 md:pb-8 shadow-2xl rotate-12 w-28 md:w-36 z-30 hover:z-50 hover:-translate-x-4 transition-all">
                  <div className="w-full h-24 md:h-32 bg-stone-100 overflow-hidden">
                    <img src={getImg("fashion-2_v7vkxq")} className="w-full h-full object-cover grayscale-0 md:grayscale-[10%] md:hover:grayscale-0" />
                  </div>
                </div>

                {/* Bottom Left Polaroid */}
                <div className="absolute bottom-[110px] -left-2 md:bottom-24 md:left-6 bg-white p-1.5 pb-4 md:p-2 md:pb-8 shadow-2xl -rotate-12 w-20 md:w-32 z-30 hover:z-50 hover:scale-105 transition-all">
                  <div className="w-full h-20 md:h-28 bg-stone-100 overflow-hidden">
                    <img src={getImg("fashion-3_frrebe")} className="w-full h-full object-cover grayscale-0 md:grayscale-[10%] md:hover:grayscale-0" />
                  </div>
                </div>

                {/* Anniversary Wish (Locked to the right side, completely clear of polaroid) */}
                <div className="absolute bottom-20 md:bottom-6 right-4 md:right-2 w-[65%] md:w-auto text-right z-50">
                  <p className="text-white/90 font-serif text-[10px] md:text-[11px] leading-relaxed italic drop-shadow-md">
                    Celebrating two years of endless laughter, unforgettable 
                    moments, and a love story that just keeps getting better.
                  </p>
                  <p className="text-red-500 font-serif text-[10px] md:text-[11px] mt-1 font-bold uppercase tracking-widest drop-shadow-md">
                    ENDLESSLY YOURS!
                  </p>
                </div>

              {/* Decorative Sunglasses */}
              <div className="absolute top-16 left-4 text-white/30 text-3xl -rotate-12">
                🕶️
              </div>
            </div>
          </div>
        </Page>

       {/* PAGE 6: THE WORD SEARCH */}
        <Page>
          <div className="h-full w-full bg-white p-12 flex flex-col items-center justify-center relative">
            
            {/* Title Section */}
            <div className="text-center mb-16">
              <h3 className="font-serif italic text-3xl mb-4 text-stone-800 tracking-wide">
                THE FIRST<br />WORD YOU SEE
              </h3>
              <p className="text-[9px] text-stone-400 tracking-[0.3em] uppercase font-bold">
                Describes your personality!
              </p>
            </div>

            {/* The Grid Container */}
            <div className="w-full max-w-[260px] relative">
              {/* Aesthetic Borders */}
              <div className="absolute -top-8 left-0 right-0 h-[1px] bg-stone-200"></div>
              <div className="absolute -bottom-8 left-0 right-0 h-[1px] bg-stone-200"></div>

              {/* The Perfect Alignment Grid */}
              <div className="grid grid-cols-10 gap-y-5 gap-x-2 text-[13px] font-black text-stone-800 font-sans">
                {['R','A','D','I','A','N','T','L','X','M',
                  'F','O','R','E','V','E','R','O','Q','U',
                  'D','I','V','I','N','E','P','V','W','S',
                  'M','A','G','I','C','A','L','E','Y','E',
                  'E','X','Q','U','I','S','I','T','E','J',
                  'T','I','M','E','L','E','S','S','N','K',
                  'P','A','S','S','I','O','N','A','T','E',
                  'A','L','L','U','R','I','N','G','B','C'].map((letter, i) => (
                    <span key={i} className="text-center cursor-default hover:text-red-600 transition-colors duration-300">
                      {letter}
                    </span>
                ))}
              </div>
            </div>

            {/* Page Number */}
            <div className="absolute bottom-8 left-10">
               <p className="text-stone-300 font-serif italic text-xs font-bold tracking-widest">PAGE 06</p>
            </div>

          </div>
        </Page>
        {/* PAGE 7: THE PERSONALITY MAP [Matched to Video 0:18] */}
        <Page>
          <div className="h-full w-full bg-[#800040] p-6 relative overflow-hidden flex flex-col items-center justify-center">
            
            {/* Decorative Background Sparkles */}
            <div className="absolute top-10 left-10 text-white/20 text-4xl rotate-45 font-light">✦</div>
            <div className="absolute bottom-20 left-4 text-white/10 text-3xl -rotate-12 font-light">✶</div>
            <div className="absolute top-1/2 right-4 text-white/10 text-5xl rotate-90 font-light">✧</div>
            <div className="absolute top-1 right-10 text-white/10 text-5xl rotate-90 font-light">✧</div>

            {/* 1. Top Left Label & Arrow */}
            <div className="absolute top-28 left-4 text-white text-[9px] font-bold uppercase tracking-[0.2em] -rotate-12 z-30">
              Pediatrician
            </div>
            {/* Curving arrow pointing to photo */}
            <div className="absolute top-32 left-20 text-white/50 text-3xl rotate-[110deg] font-light z-20">
              
            </div>

            {/* 2. Center Image Frame (With your exact Cloudinary ID and white border) */}
            <div className="w-56 h-72 bg-white p-2 pb-8 shadow-2xl relative z-20 rotate-2 group border-4 border-white mt-4">
              <div className="w-full h-full bg-stone-200 overflow-hidden">
                <img 
                  src={getImg("personality-main_pixplv.jpg")} 
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500" 
                  alt="Ana"
                />
              </div>
            </div>

           {/* Middle Right Label (Pulled safely away from the edge) */}
            <div className="absolute top-1/2 right-4 md:right-2 text-white text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] rotate-6 z-30 drop-shadow-md">
              ~Laughaholic~
            </div>

            {/* Bottom Left Label (Kept the same) */}
            <div className="absolute bottom-36 left-4 md:left-6 text-white text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] z-30">
              Trail <br /> blazer
            </div>

            {/* Bottom Right Label (Pulled safely away from the edge) */}
            <div className="absolute bottom-24 right-8 md:right-6 text-white text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-right -rotate-3 z-30">
              Nollywood <br /> Binge Watcher
            </div>

            {/* 6. Main Title (Ana) */}
            <h2 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-[56px] font-serif italic z-30 tracking-tight drop-shadow-xl">
              Ana
            </h2>

          </div>
        </Page>

        {/* PAGE 8: TRANSITION SPREAD - PHOTO LEFT [Matched to Video 0:19] */}
        <Page>
          <div className="h-full w-full bg-[#1a1a1a] flex items-center justify-center p-4">
            <div className="w-full h-full border border-white/10 overflow-hidden">
              <img
                src={getImg("IMG_4459_yjryur")}
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
          </div>
        </Page>

        {/* PAGE 9: REASONS WHY I LOVE YOU [Matched to Video 0:21] */}
        <Page>
          <div className="h-full w-full bg-white relative p-10 overflow-hidden">
            {/* 1. SECTION TITLE */}
            <h3 className="text-stone-900 font-serif text-2xl italic mb-8 border-b border-stone-100 pb-4">
              REASONS WHY <br /> I LOVE YOU
            </h3>

            {/* 2. THE MAIN PHOTO (Right-aligned like the video) */}
            <div className="absolute top-20 right-[-10%] w-3/4 h-[70%] z-0 opacity-90">
              <img
                src={getImg("reasons-main_guzik9")}
                className="w-full h-full object-cover rounded-l-full shadow-2xl"
              />
            </div>

         {/* 3. THE FLOATING BUBBLES */}
<div className="relative z-10 flex flex-col gap-6 w-1/2">
   
   {/* Bubble 1 */}
   <div className="bg-white/90 backdrop-blur-md border border-stone-200 p-4 rounded-full shadow-lg rotate-[-5deg] text-center">
      <p className="text-[11px] font-serif font-bold leading-tight text-stone-800">
         You're very <br/> smart
      </p>
   </div>

   {/* Bubble 2 */}
   <div className="bg-white/90 backdrop-blur-md border border-stone-200 p-4 rounded-full shadow-lg rotate-[3deg] text-center ml-8">
      <p className="text-[11px] font-serif font-bold leading-tight text-stone-800">
         Your kindness <br/> knows no bounds
      </p>
   </div>

   {/* Bubble 3 */}
   <div className="bg-white/90 backdrop-blur-md border border-stone-200 p-4 rounded-full shadow-lg rotate-[-2deg] text-center">
      <p className="text-[11px] font-serif font-bold leading-tight text-stone-800">
         You are <br/> funny
      </p>
   </div>

   {/* Bubble 4 */}
   <div className="bg-white/90 backdrop-blur-md border border-stone-200 p-4 rounded-full shadow-lg rotate-[5deg] text-center ml-4">
      <p className="text-[11px] font-serif font-bold leading-tight text-stone-800">
         Your presence <br/> brings comfort
      </p>
   </div>

</div>

            {/* Bottom Label */}
            <div className="absolute bottom-8 left-10">
              <span className="text-red-600 font-serif italic text-lg font-bold">
                Why You?
              </span>
            </div>
          </div>
        </Page>

        {/* PAGE 10: THE VIDEO SPREAD */}
        <Page>
          <div className="h-full w-full bg-black relative overflow-hidden">
            
            {/* 1. THE VIDEO PLAYER */}
            <video
              autoPlay
              loop
              muted       // <-- THIS GUARANTEES NO SOUND
              playsInline // <-- Critical so it doesn't open fullscreen on iPhones
              className="w-full h-full object-cover opacity-80"
            >
              {/* Add the EXACT Cloudinary ID here, and don't forget the .mp4 extension! */}
              <source src={getVid("88D765BF-EF1B-46D5-A3AB-C7305895F8CB_duhp1i.mp4")} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* 2. OVERLAY TEXT (Magazine Style) */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 pointer-events-none">
              <div className="flex justify-between items-start">
                <span className="text-white/50 text-[8px] md:text-[10px] tracking-[0.4em] uppercase font-bold">
                  Motion 
                </span>
                <div className="w-6 h-6 md:w-8 md:h-8 border-t border-r border-white/30" />
              </div>

              <div className="flex justify-between items-end">
                <div className="w-6 h-6 md:w-8 md:h-8 border-b border-l border-white/30" />
                <h3 className="text-white text-xl md:text-2xl font-serif italic tracking-tighter opacity-90">
                  Moments 
                </h3>
              </div>
            </div>
            
          </div>
        </Page>
       {/* PAGE 11: THE FEATURE ARTICLE */}
        <Page>
          <div className="h-full w-full bg-white p-8 flex flex-col overflow-hidden">
            <h2 className="text-stone-900 font-serif text-6xl leading-none font-black uppercase tracking-tighter mb-4 border-b-4 border-red-600 pb-2">
              THE <br/> STORY
            </h2>

            {/* Use a smaller font size (text-xs or text-[13px]) to ensure fit */}
            <div className="relative">
              <span className="float-left text-red-600 text-6xl font-serif font-black leading-none mr-2 mt-1">
                T
              </span>
              <p className="text-stone-800 font-serif text-[13px] leading-relaxed text-justify">
                hey say that time flies when you're having fun, but with you, it feels like we've 
                created a whole new world in just two years. From our first conversation to 
                the deep bond we share today, every moment has been a brick in the foundation 
                of what we are building. This magazine is a small tribute to the bigger 
                picture—a life lived with intention, love, and a little bit of magic.
              </p>
            </div>

            <p className="mt-4 text-stone-800 font-serif text-[13px] leading-relaxed text-justify">
              As we look toward the future, I wanted to ensure these memories weren't just 
              sitting in a folder on a phone. They deserve to be viewed as art. 
              Because that is exactly what you are.
            </p>

            <div className="mt-auto flex justify-between items-end border-t border-stone-100 pt-2">
               <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-stone-300">anniversary
                  </p>
               </div>
               <span className="text-red-600 font-serif italic font-bold text-xs">Page 11</span>
            </div>
          </div>
        </Page>

        {/* PAGE 12: LIBRA SEASON / FINALE PHOTO [Matched to Video 0:31] */}
        <Page>
          <div className="h-full w-full bg-white relative overflow-hidden">
            {/* Full bleed photo with a slight zoom effect */}
            <img
              src={getImg("finale-photo_xxqtgy.jpg")}
              className="w-full h-full object-cover"
            />
            {/* Vertical Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-end p-8">
              <h2 className="text-white text-[120px] font-serif font-black uppercase leading-none opacity-20 [writing-mode:vertical-rl] rotate-180 tracking-tighter">
                ANA
              </h2>
            </div>
          </div>
        </Page>

        {/* PAGE 13: THE BACK COVER [The End] */}
        <Page>
          <div className="h-full w-full bg-white border-l-[15px] border-red-600 p-12 flex flex-col items-center justify-center text-center">
            <div className="mb-8">
              <h1 className="text-red-600 text-4xl font-serif font-black uppercase leading-tight tracking-tighter">
                Our <br /> Story
              </h1>
              <div className="w-12 h-1 bg-stone-900 mx-auto mt-4"></div>
            </div>

            <p className="text-stone-400 font-sans text-[10px] uppercase tracking-[0.4em] mb-12">
              Established May 11 2024
            </p>

            {/* A small "Made with Love" credit like a real publisher */}
            <div className="mt-24">
              <p className="text-stone-300 font-serif italic text-sm">
                Designed & Developed by <br />
                <span className="text-stone-600 font-bold not-italic font-sans text-[10px] uppercase tracking-widest mt-2 block">
                  DILLIBE
                </span>
              </p>
            </div>

            {/* Final Barcode at the bottom center */}
            <div className="mt-auto opacity-30 scale-75">
              <div className="bg-white p-2 border border-stone-100 shadow-sm">
                <div className="w-24 h-10 bg-black"></div>
              </div>
              <p className="text-[8px] mt-1 text-stone-400">0 12345 67890 5</p>
            </div>
          </div>
        </Page>
      </HTMLFlipBook>
    </main>
  );
}
