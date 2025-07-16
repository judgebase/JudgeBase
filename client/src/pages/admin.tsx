import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AdminLogin } from "@/components/admin-login";
import { EditApplicationModal } from "@/components/edit-application-modal";
import { HackathonManagement } from "@/components/hackathon-management";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Clock, ExternalLink, User, Mail, Briefcase, LogOut, Edit3, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { SEO } from "@/components/seo";
import type { JudgeApplication, Hackathon } from "@shared/schema";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingApplication, setEditingApplication] = useState<JudgeApplication | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check authentication status
  const { data: authStatus } = useQuery({
    queryKey: ['/api/auth/status'],
    queryFn: () => apiRequest('/api/auth/status'),
  });

  useEffect(() => {
    if (authStatus !== undefined) {
      setIsAuthenticated(authStatus.authenticated);
      setIsLoading(false);
    }
  }, [authStatus]);
  
  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ['/api/admin/judge-applications'],
    queryFn: () => apiRequest('/api/admin/judge-applications'),
    enabled: isAuthenticated,
  });

  const { data: judges, isLoading: judgesLoading } = useQuery({
    queryKey: ['/api/admin/judges'],
    queryFn: () => apiRequest('/api/admin/judges'),
    enabled: isAuthenticated,
  });

  const { data: hackathons, isLoading: hackathonsLoading } = useQuery({
    queryKey: ['/api/admin/hackathons'],
    queryFn: () => apiRequest('/api/admin/hackathons'),
    enabled: isAuthenticated,
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest('/api/auth/logout', { method: 'POST' }),
    onSuccess: () => {
      setIsAuthenticated(false);
      queryClient.clear();
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of the admin panel.",
      });
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/judge-applications/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: false, badges: [] }),
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Judge approved successfully!",
        description: `${data.judge.name} has been approved and their profile is now live.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/judge-applications'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error approving judge",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest(`/api/admin/judge-applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Status updated successfully!",
        description: "Judge application status has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/judge-applications'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating status",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const updateJudgeMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      return apiRequest(`/api/admin/judges/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    },
    onSuccess: () => {
      toast({
        title: "Judge updated successfully!",
        description: "The judge information has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/judges'] });
      queryClient.invalidateQueries({ queryKey: ['/api/judges/featured'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating judge",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const deleteJudgeMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/judges/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      toast({
        title: "Judge removed successfully!",
        description: "The judge has been removed from the platform.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/judges'] });
      queryClient.invalidateQueries({ queryKey: ['/api/judges/featured'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error removing judge",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const updateHackathonStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest(`/api/admin/hackathons/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Hackathon status updated",
        description: "The hackathon status has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/hackathons'] });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  const pendingApplications = applications?.filter((app: JudgeApplication) => app.status === 'pending') || [];
  const approvedApplications = applications?.filter((app: JudgeApplication) => app.status === 'approved') || [];
  const rejectedApplications = applications?.filter((app: JudgeApplication) => app.status === 'rejected') || [];
  
  const pendingHackathons = hackathons?.filter((hack: Hackathon) => hack.status === 'pending') || [];
  const approvedHackathons = hackathons?.filter((hack: Hackathon) => hack.status === 'approved') || [];
  const rejectedHackathons = hackathons?.filter((hack: Hackathon) => hack.status === 'rejected') || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  if (applicationsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SEO title="Admin Dashboard - JudgeBase" description="Admin dashboard for managing judge applications" />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-600">Loading applications...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Admin Dashboard - JudgeBase" description="Admin dashboard for managing judge applications" />
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage judge applications and profiles</p>
          </div>
          <Button
            variant="outline"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingApplications.length}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved Judges</p>
                  <p className="text-2xl font-bold text-green-600">{approvedApplications.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected Applications</p>
                  <p className="text-2xl font-bold text-red-600">{rejectedApplications.length}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="pending">Pending ({pendingApplications.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedApplications.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
            <TabsTrigger value="judges">Manage Judges ({judges?.length || 0})</TabsTrigger>
            <TabsTrigger value="hackathons">Hackathons ({hackathons?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingApplications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No pending applications</p>
                </CardContent>
              </Card>
            ) : (
              pendingApplications.map((app: JudgeApplication) => (
                <Card key={app.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{app.fullName}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{app.currentRole}</p>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{app.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-gray-500" />
                          <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            LinkedIn Profile
                          </a>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Has judged before:</strong> {app.hasJudgedBefore ? 'Yes' : 'No'}</p>
                        <p className="text-sm"><strong>Open to mentoring:</strong> {app.openToMentoring}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Expertise Areas:</p>
                      <div className="flex flex-wrap gap-1">
                        {app.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Bio:</p>
                      <p className="text-sm text-gray-700">{app.shortBio}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Judging Philosophy:</p>
                      <p className="text-sm text-gray-700">{app.judgingPhilosophy}</p>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setEditingApplication(app)}
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => approveMutation.mutate(app.id)}
                        disabled={approveMutation.isPending}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {approveMutation.isPending ? 'Approving...' : 'Approve & Create Profile'}
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => updateStatusMutation.mutate({ id: app.id, status: 'rejected' })}
                        disabled={updateStatusMutation.isPending}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {approvedApplications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No approved applications</p>
                </CardContent>
              </Card>
            ) : (
              approvedApplications.map((app: JudgeApplication) => (
                <Card key={app.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{app.fullName}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{app.currentRole}</p>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{app.email}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const judge = judges?.find((j: any) => j.name === app.fullName);
                          if (judge) {
                            window.open(`/judges/${judge.slug}`, '_blank');
                          }
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedApplications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No rejected applications</p>
                </CardContent>
              </Card>
            ) : (
              rejectedApplications.map((app: JudgeApplication) => (
                <Card key={app.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{app.fullName}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{app.currentRole}</p>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{app.email}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatusMutation.mutate({ id: app.id, status: 'pending' })}
                        disabled={updateStatusMutation.isPending}
                      >
                        Review Again
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="judges" className="space-y-4">
            {judgesLoading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading judges...</p>
                </CardContent>
              </Card>
            ) : !judges || judges.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No judges found</p>
                </CardContent>
              </Card>
            ) : (
              judges.map((judge: any) => (
                <Card key={judge.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{judge.name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{judge.title}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={judge.featured ? "default" : "secondary"}>
                          {judge.featured ? "Featured" : "Not Featured"}
                        </Badge>
                        <Badge variant="outline">{judge.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{judge.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-gray-500" />
                          <a href={judge.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            LinkedIn Profile
                          </a>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Location:</strong> {judge.location}</p>
                        <p className="text-sm"><strong>Slug:</strong> {judge.slug}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Expertise Areas:</p>
                      <div className="flex flex-wrap gap-1">
                        {judge.expertise.map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Bio:</p>
                      <p className="text-sm text-gray-700">{judge.bio}</p>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <a href={`/judges/${judge.slug}`} target="_blank">
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant={judge.featured ? "secondary" : "default"}
                        onClick={() => updateJudgeMutation.mutate({ 
                          id: judge.id, 
                          updates: { featured: !judge.featured } 
                        })}
                        disabled={updateJudgeMutation.isPending}
                      >
                        {judge.featured ? "Remove from Featured" : "Make Featured"}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to remove ${judge.name} from the platform? This action cannot be undone.`)) {
                            deleteJudgeMutation.mutate(judge.id);
                          }
                        }}
                        disabled={deleteJudgeMutation.isPending}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Remove Judge
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="hackathons" className="space-y-4">
            <HackathonManagement 
              hackathons={hackathons || []} 
              isLoading={hackathonsLoading} 
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
      
      {editingApplication && (
        <EditApplicationModal
          application={editingApplication}
          isOpen={!!editingApplication}
          onClose={() => setEditingApplication(null)}
        />
      )}
    </div>
  );
}