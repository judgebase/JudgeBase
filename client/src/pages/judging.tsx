import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Users, Mail, Heart, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Hackathon, Judge } from '@shared/schema';
import { SEO } from '@/components/seo';

export function JudgingPage() {
  const [user, setUser] = useState<any>(null);
  const [judge, setJudge] = useState<Judge | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Check if user is authenticated
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        // Find the judge by email
        try {
          const response = await apiRequest('/api/judges');
          const judges = response.data || [];
          
          // Look for judge by email (regardless of case and with exact match)
          const currentJudge = judges.find((j: Judge) => 
            j.email.toLowerCase() === user.email.toLowerCase() && 
            j.status === 'approved'
          );
          
          setJudge(currentJudge);
          
          if (!currentJudge) {
            console.log('Judge lookup failed:', {
              userEmail: user.email,
              availableJudges: judges.map(j => ({ email: j.email, status: j.status, hasPassword: !!j.authPassword }))
            });
          } else {
            console.log('Judge found:', currentJudge.name, currentJudge.email);
          }
        } catch (error) {
          console.error('Error fetching judge:', error);
        }
      }
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: hackathons = [], isLoading: hackathonsLoading } = useQuery({
    queryKey: ['/api/hackathons'],
    enabled: !!judge,
  });

  const { data: judgeInterests = [], isLoading: interestsLoading } = useQuery({
    queryKey: ['/api/judging-interests', judge?.id],
    queryFn: async () => {
      if (!judge) return [];
      const response = await apiRequest(`/api/judging-interests/${judge.id}`);
      return response.data || [];
    },
    enabled: !!judge,
  });

  const expressInterestMutation = useMutation({
    mutationFn: async (hackathonId: string) => {
      if (!judge) throw new Error('Judge not found');
      return apiRequest('/api/judging-interests', {
        method: 'POST',
        body: JSON.stringify({ judgeId: judge.id, hackathonId }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/judging-interests', judge?.id] });
      toast({
        title: 'Interest Expressed',
        description: 'Your interest has been recorded successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to express interest',
        variant: 'destructive',
      });
    },
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setJudge(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  if (!judge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">You must be an approved judge to access this page.</p>
          <Button onClick={signOut} variant="outline">
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  const approvedHackathons = hackathons.filter((h: Hackathon) => h.status === 'approved');
  const interestedHackathonIds = new Set(judgeInterests.map((ji: any) => ji.hackathonId));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <SEO 
        title="Judging Dashboard - JudgeBase"
        description="Discover and express interest in hackathons as an approved judge"
        keywords="hackathon judging, judge dashboard, hackathon opportunities"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Judging Dashboard</h1>
            <p className="text-blue-200">Welcome back, {judge.name}!</p>
          </div>
          <Button onClick={signOut} variant="outline">
            Sign Out
          </Button>
        </div>

        {hackathonsLoading || interestsLoading ? (
          <div className="text-center text-white">Loading hackathons...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {approvedHackathons.map((hackathon: Hackathon) => (
              <Card key={hackathon.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-white text-xl mb-2">
                        {hackathon.hackathonName}
                      </CardTitle>
                      <CardDescription className="text-blue-200">
                        {hackathon.organizationName}
                      </CardDescription>
                    </div>
                    {hackathon.hackathonWebsite && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-blue-200 hover:text-white"
                        onClick={() => window.open(hackathon.hackathonWebsite, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-200">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{hackathon.hackathonDates}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-blue-200">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Judge by: {hackathon.judgeDeadline}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-blue-200">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{hackathon.participantCount} participants</span>
                  </div>
                  
                  <p className="text-blue-100 text-sm line-clamp-3">
                    {hackathon.eventSummary}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {hackathon.eventFormat.map((format) => (
                      <Badge key={format} variant="secondary" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {hackathon.domains.slice(0, 3).map((domain) => (
                      <Badge key={domain} variant="outline" className="text-xs text-blue-200 border-blue-200">
                        {domain}
                      </Badge>
                    ))}
                    {hackathon.domains.length > 3 && (
                      <Badge variant="outline" className="text-xs text-blue-200 border-blue-200">
                        +{hackathon.domains.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <Separator className="bg-white/20" />
                  
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => expressInterestMutation.mutate(hackathon.id)}
                      disabled={
                        interestedHackathonIds.has(hackathon.id) || 
                        expressInterestMutation.isPending
                      }
                      variant={interestedHackathonIds.has(hackathon.id) ? "secondary" : "default"}
                    >
                      {interestedHackathonIds.has(hackathon.id) ? (
                        <>
                          <Heart className="h-4 w-4 mr-2 fill-current" />
                          Interest Expressed
                        </>
                      ) : (
                        <>
                          <Heart className="h-4 w-4 mr-2" />
                          Express Interest
                        </>
                      )}
                    </Button>
                    
                    {hackathon.organizerEmail && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`mailto:${hackathon.organizerEmail}`, '_blank')}
                        className="text-blue-200 border-blue-200 hover:text-white hover:border-white"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {approvedHackathons.length === 0 && !hackathonsLoading && (
          <div className="text-center text-white py-12">
            <h2 className="text-2xl font-bold mb-4">No Hackathons Available</h2>
            <p className="text-blue-200">Check back later for new judging opportunities!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Login Failed',
          description: error.message,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <SEO 
        title="Judge Login - JudgeBase"
        description="Login to access your judging dashboard"
        keywords="judge login, hackathon judge access"
      />
      
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Judge Login</CardTitle>
          <CardDescription className="text-blue-200">
            Access your judging dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}