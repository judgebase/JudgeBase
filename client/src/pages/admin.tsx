import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AdminLogin } from "@/components/admin-login";
import { HackathonManagement } from "@/components/hackathon-management";
import { JudgePasswordDisplay } from "@/components/judge-password-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Clock, ExternalLink, User, Mail, Briefcase, LogOut, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { SEO } from "@/components/seo";
import type { JudgeApplication, Hackathon } from "@shared/schema";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [approvedJudge, setApprovedJudge] = useState<any>(null);
  const [judgePassword, setJudgePassword] = useState<string>('');
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
      // Display the judge password
      setApprovedJudge(data.judge);
      setJudgePassword(data.password);
      
      toast({
        title: "Application approved!",
        description: "Judge profile has been created with login credentials.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/judge-applications'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/judges'] });
      queryClient.invalidateQueries({ queryKey: ['/api/judges/featured'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error approving application",
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
        title: "Status updated",
        description: "Application status has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/judge-applications'] });
    },
  });

  const updateJudgeMutation = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Admin Dashboard - JudgeBase" description="Admin dashboard for managing judge applications" />
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage judges, applications, and hackathons</p>
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
                  <p className="text-sm font-medium text-gray-600">Active Judges</p>
                  <p className="text-2xl font-bold text-purple-600">{judges?.length || 0}</p>
                </div>
                <User className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applications</p>
                  <p className="text-2xl font-bold text-blue-600">{applications?.length || 0}</p>
                </div>
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hackathons</p>
                  <p className="text-2xl font-bold text-green-600">{hackathons?.length || 0}</p>
                </div>
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="judges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="judges">Judges ({judges?.length || 0})</TabsTrigger>
            <TabsTrigger value="applications">Applications ({applications?.length || 0})</TabsTrigger>
            <TabsTrigger value="hackathons">Hackathons ({hackathons?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="judges" className="space-y-4">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Judge Management</h2>
                <p className="text-sm text-gray-600">Manage active judge profiles on the platform</p>
              </div>
              <div className="p-6">
                {judgesLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading judges...</p>
                  </div>
                ) : judges?.length === 0 ? (
                  <div className="text-center py-8">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No judges found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {judges?.map((judge: any) => (
                      <div key={judge.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{judge.name}</h3>
                            <p className="text-gray-600">{judge.title} @ {judge.company}</p>
                            <p className="text-sm text-gray-500 mt-1">{judge.location}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {judge.badges?.map((badge: string, index: number) => (
                                <Badge key={index} variant="secondary" className="text-xs">{badge}</Badge>
                              ))}
                              {judge.featured && <Badge className="bg-purple-100 text-purple-800">Featured</Badge>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href={`/judges/${judge.slug}`} target="_blank">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </a>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateJudgeMutation.mutate({ 
                                id: judge.id, 
                                featured: !judge.featured 
                              })}
                            >
                              {judge.featured ? 'Unfeature' : 'Feature'}
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteJudgeMutation.mutate(judge.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Judge Applications</h2>
                <p className="text-sm text-gray-600">Review and manage incoming judge applications</p>
              </div>
              <div className="p-6">
                {applicationsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading applications...</p>
                  </div>
                ) : applications?.length === 0 ? (
                  <div className="text-center py-8">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No applications found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications?.map((app: JudgeApplication) => (
                      <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{app.fullName}</h3>
                            <p className="text-gray-600">{app.currentRole}</p>
                            <p className="text-sm text-gray-500">{app.email}</p>
                          </div>
                          {getStatusBadge(app.status)}
                        </div>
                        
                        <div className="text-sm text-gray-700 mb-3">
                          <p><strong>Philosophy:</strong> {app.judgingPhilosophy}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {app.expertise.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                        
                        {app.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => approveMutation.mutate(app.id)}
                              disabled={approveMutation.isPending}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateStatusMutation.mutate({ id: app.id, status: 'rejected' })}
                              disabled={updateStatusMutation.isPending}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
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

      {/* Password Display Modal */}
      {approvedJudge && judgePassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <JudgePasswordDisplay 
              judge={approvedJudge} 
              password={judgePassword} 
              onClose={() => {
                setApprovedJudge(null);
                setJudgePassword('');
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}