import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Apply from "@/pages/apply";
import Host from "@/pages/host";
import FindJudges from "@/pages/find-judges";
import Blog from "@/pages/blog";
import Pricing from "@/pages/pricing";
import JudgeProfile from "@/pages/judge-profile";
import Admin from "@/pages/admin";
import JudgeGuidelines from "@/pages/judge-guidelines";
import FAQ from "@/pages/faq";
import Resources from "@/pages/resources";
import Support from "@/pages/support";
import ApiAccess from "@/pages/api-access";
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
      <Route path="/judge-guidelines" component={JudgeGuidelines} />
      <Route path="/faq" component={FAQ} />
      <Route path="/resources" component={Resources} />
      <Route path="/support" component={Support} />
      <Route path="/api-access" component={ApiAccess} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
