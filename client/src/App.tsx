import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "@/lib/queryClient";
import Home from "@/pages/home";
import Apply from "@/pages/apply";
import Host from "@/pages/host";
import FindJudges from "@/pages/find-judges";
import Blog from "@/pages/blog";
import Pricing from "@/pages/pricing";
import JudgeProfile from "@/pages/judge-profile";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/apply" component={Apply} />
      <Route path="/host" component={Host} />
      <Route path="/find-judges" component={FindJudges} />
      <Route path="/blog" component={Blog} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/judges/:slug" component={JudgeProfile} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
