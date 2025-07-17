import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Clock, Mail, ExternalLink, User, LogOut, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { SEO } from "@/components/seo";
import type { Hackathon, Judge } from "@shared/schema";

interface JudgeInterest {
  id: string;
  judgeId: string;
  hackathonId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  judge: Judge;
}

interface HackathonLoginFormProps {
  onLogin: (hackathon: Hackathon) => void;
}

function HackathonLoginForm({ onLogin }: HackathonLoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiRequest('/api/hackathons/auth', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response.success) {
        onLogin(response.hackathon);
        toast({
          title: "Login successful",
          description: `Welcome back, ${response.hackathon.name}!`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Hackathon Organizer Login</CardTitle>
          <p className="text-gray-600">Access your hackathon dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-email@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your hackathon password"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>Need help? Contact admin for your credentials.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface JudgeInterestCardProps {
  interest: JudgeInterest;
  onUpdateStatus: (judgeId: string, status: string) => void;
  isUpdating: boolean;
}

function JudgeInterestCard({ interest, onUpdateStatus, isUpdating }: JudgeInterestCardProps) {
  const { judge } = interest;
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={judge.avatar || undefined} alt={judge.name} />
            <AvatarFallback>{judge.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg truncate">{judge.name}</h3>
              <div className="flex items-center gap-2">
                {getStatusIcon(interest.status)}
                <Badge className={getStatusColor(interest.status)}>
                  {interest.status}
                </Badge>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium">{judge.title}</p>
              <p>{judge.company}</p>
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{judge.email}</span>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-sm text-gray-700 line-clamp-2">{judge.bio}</p>
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              {judge.expertise.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {judge.expertise.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{judge.expertise.length - 3} more
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(`/judges/${judge.slug}`, '_blank')}
              >
                <Eye className="w-4 h-4 mr-1" />
                View Profile
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(`mailto:${judge.email}`, '_blank')}
              >
                <Mail className="w-4 h-4 mr-1" />
                Contact
              </Button>
            </div>

            {interest.status === 'pending' && (
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  onClick={() => onUpdateStatus(judge.id, 'accepted')}
                  disabled={isUpdating}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onUpdateStatus(judge.id, 'rejected')}
                  disabled={isUpdating}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Hackathons() {
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ['/api/hackathons', hackathon?.id, 'dashboard'],
    queryFn: () => apiRequest(`/api/hackathons/${hackathon?.id}/dashboard`),
    enabled: !!hackathon,
  });

  const { data: interestedJudges = [], isLoading: judgesLoading } = useQuery({
    queryKey: ['/api/hackathons', hackathon?.id, 'interested-judges'],
    queryFn: () => apiRequest(`/api/hackathons/${hackathon?.id}/interested-judges`),
    enabled: !!hackathon,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ judgeId, status }: { judgeId: string; status: string }) => {
      return apiRequest(`/api/hackathons/${hackathon?.id}/judges/${judgeId}/interest`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/hackathons', hackathon?.id] });
      toast({
        title: "Status updated",
        description: "Judge interest status has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    },
  });

  const handleStatusUpdate = (judgeId: string, status: string) => {
    updateStatusMutation.mutate({ judgeId, status });
  };

  const handleLogout = () => {
    setHackathon(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  if (!hackathon) {
    return <HackathonLoginForm onLogin={setHackathon} />;
  }

  const stats = dashboardData?.data?.stats || {
    totalInterested: 0,
    accepted: 0,
    pending: 0,
    rejected: 0
  };

  const pendingJudges = interestedJudges.data?.filter((j: JudgeInterest) => j.status === 'pending') || [];
  const acceptedJudges = interestedJudges.data?.filter((j: JudgeInterest) => j.status === 'accepted') || [];
  const rejectedJudges = interestedJudges.data?.filter((j: JudgeInterest) => j.status === 'rejected') || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <SEO 
        title="Hackathon Dashboard - JudgeBase"
        description="Manage judge applications and interests for your hackathon"
        keywords="hackathon management, judge applications, hackathon organizer"
      />
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Hackathon Dashboard</h1>
            <p className="text-gray-600">Welcome back, {hackathon.name}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Interested</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalInterested}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Accepted</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.accepted}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <XCircle className="w-8 h-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Judge Lists */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">
              Pending ({pendingJudges.length})
            </TabsTrigger>
            <TabsTrigger value="accepted">
              Accepted ({acceptedJudges.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({rejectedJudges.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingJudges.map((interest: JudgeInterest) => (
                <JudgeInterestCard
                  key={interest.id}
                  interest={interest}
                  onUpdateStatus={handleStatusUpdate}
                  isUpdating={updateStatusMutation.isPending}
                />
              ))}
            </div>
            {pendingJudges.length === 0 && (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending judge applications</h3>
                <p className="text-gray-600">All judge interests have been reviewed.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="accepted" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {acceptedJudges.map((interest: JudgeInterest) => (
                <JudgeInterestCard
                  key={interest.id}
                  interest={interest}
                  onUpdateStatus={handleStatusUpdate}
                  isUpdating={updateStatusMutation.isPending}
                />
              ))}
            </div>
            {acceptedJudges.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No accepted judges yet</h3>
                <p className="text-gray-600">Start accepting judge applications to build your panel.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rejectedJudges.map((interest: JudgeInterest) => (
                <JudgeInterestCard
                  key={interest.id}
                  interest={interest}
                  onUpdateStatus={handleStatusUpdate}
                  isUpdating={updateStatusMutation.isPending}
                />
              ))}
            </div>
            {rejectedJudges.length === 0 && (
              <div className="text-center py-12">
                <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No rejected judges</h3>
                <p className="text-gray-600">Judge applications will appear here when rejected.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
}