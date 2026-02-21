import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function Inspiration() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsConnected(true);
    }, 1500);
  };

  const boardImages = [
    "https://images.unsplash.com/photo-1515378960530-7c0da6229678?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505533321630-975218a5f66f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=600&auto=format&fit=crop"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 pt-12 space-y-8 pb-32"
    >
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-foreground font-semibold flex items-center gap-2">
            Vision Board
          </h1>
          <p className="text-sm text-muted-foreground font-medium mt-1">Your Pinterest inspiration.</p>
        </div>
      </header>

      {!isConnected ? (
        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-white/80 text-center flex flex-col items-center mt-12">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z"/></svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Connect Pinterest</h2>
          <p className="text-muted-foreground text-sm mb-8">Sync your aesthetic boards to keep all your inspiration in one place.</p>
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="w-full bg-[#E60023] text-white py-3.5 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/30 hover:bg-red-700 transition-colors"
          >
            {isSyncing ? (
              <RefreshCw className="animate-spin" size={20} />
            ) : (
              "Connect Account"
            )}
          </button>
        </section>
      ) : (
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-[#E60023] text-white rounded-full flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z"/></svg>
               </div>
               <div>
                 <h3 className="font-bold text-[14px]">Emma's Boards</h3>
                 <p className="text-[11px] text-muted-foreground">Synced just now</p>
               </div>
            </div>
            <button className="text-[12px] font-bold text-muted-foreground hover:text-foreground bg-white px-3 py-1.5 rounded-full shadow-sm" onClick={() => {setIsConnected(false); setIsSyncing(false);}}>
              Disconnect
            </button>
          </div>

          <div className="columns-2 gap-4 space-y-4">
            {boardImages.map((src, i) => (
              <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm border border-white/60 bg-white">
                <img src={src} alt="Pinterest inspiration" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}