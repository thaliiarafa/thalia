import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import BottomNav from "@/components/BottomNav";

import Home from "@/pages/Home";
import Planner from "@/pages/Planner";
import Tasks from "@/pages/Tasks";
import Glow from "@/pages/Glow";
import Profile from "@/pages/Profile";
import CreatorHub from "@/pages/CreatorHub";

function Router() {
  return (
    <div className="max-w-md w-full mx-auto h-[100dvh] bg-background relative shadow-2xl overflow-hidden flex flex-col font-sans sm:rounded-[2.5rem] sm:border-8 sm:border-muted/50 sm:h-[850px]">
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-safe relative">
        <Switch>
          <Route path="/" component={Home}/>
          <Route path="/planner" component={Planner}/>
          <Route path="/tasks" component={Tasks}/>
          <Route path="/glow" component={Glow}/>
          <Route path="/studio" component={CreatorHub}/>
          <Route path="/profile" component={Profile}/>
          <Route component={NotFound} />
        </Switch>
      </div>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-muted/40 w-full flex items-center justify-center sm:py-8 sm:px-4">
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;