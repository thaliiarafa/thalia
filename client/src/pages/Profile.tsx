import { motion } from "framer-motion";
import { Settings, ChevronRight, Star, Heart, Award, LogOut } from "lucide-react";
import avatarImg from "@/assets/images/avatar.png";

export default function Profile() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-6 pt-12 space-y-8 pb-32"
    >
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-foreground font-semibold">Profile</h1>
        <button className="w-10 h-10 rounded-full bg-white border border-white/60 shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Settings size={20} />
        </button>
      </header>

      {/* Profile Card */}
      <div className="flex flex-col items-center mt-6">
        <div className="relative">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-background shadow-xl p-1 bg-gradient-to-tr from-primary via-accent to-white">
            <img src={avatarImg} alt="User Avatar" className="w-full h-full object-cover rounded-full border-2 border-background" />
          </div>
          <div className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-white/60 text-primary">
            <Star size={14} fill="currentColor" />
          </div>
        </div>
        
        <h2 className="text-2xl font-serif font-semibold mt-4">Emma Styles</h2>
        <p className="text-sm font-bold text-muted-foreground tracking-wider uppercase mt-1">Design Student</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-white/60 text-center">
          <div className="text-2xl font-bold text-foreground mb-1">12</div>
          <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Day Streak</div>
        </div>
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-white/60 text-center">
          <div className="text-2xl font-bold text-foreground mb-1">85</div>
          <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Glow Score</div>
        </div>
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-white/60 text-center">
          <div className="text-2xl font-bold text-foreground mb-1">42</div>
          <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Tasks Done</div>
        </div>
      </div>

      {/* Goals */}
      <section>
        <h3 className="font-serif text-[20px] font-medium tracking-tight mb-4">My Goals</h3>
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-white/60">
          <div className="flex items-center gap-4 p-3 border-b border-muted">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Award size={18} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[14px]">Dean's List</h4>
              <p className="text-[11px] text-muted-foreground font-medium">Maintain 3.8+ GPA this semester</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>
          <div className="flex items-center gap-4 p-3">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-400 flex items-center justify-center">
              <Heart size={18} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[14px]">Self Care Sundays</h4>
              <p className="text-[11px] text-muted-foreground font-medium">Dedicated relaxation time</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Settings List */}
      <section className="space-y-2">
        <button className="w-full flex items-center justify-between bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-white/60">
          <span className="font-bold text-[15px]">App Appearance</span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">Blush Theme</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>
        </button>
        <button className="w-full flex items-center justify-between bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-white/60">
          <span className="font-bold text-[15px]">Notifications</span>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
        
        <button className="w-full flex items-center justify-center gap-2 mt-6 p-4 text-destructive font-bold text-[15px] hover:bg-destructive/5 rounded-2xl transition-colors">
          <LogOut size={18} />
          Sign Out
        </button>
      </section>

    </motion.div>
  );
}