import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, Clock, Users, Calendar } from "lucide-react";
import type { Judge, Hackathon } from "@shared/schema";

export default function Admin() {
  const { toast } = useToast();
  
  const { data: judges, isLoading: judgesLoading } = useQuery<Judge[]>({
    queryKey: ["/api/admin/judges"],
  });

  const { data: hackathons, isLoading: hackathonsLoading } = useQuery<Hackathon[]>({
    queryKey: ["/api/admin/hackathons"],
  });

  const updateJudgeMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: any }) => {
      const response = await apiRequest("PATCH", `/api/admin/judges/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/judges"] });
      queryClient.invalidateQueries({ queryKey: ["/api/judges/featured"] });
      toast({
        title: "Judge updated successfully",
        description: "Changes have been saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating judge",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (judgeId: number, status: string) => {
    updateJudgeMutation.mutate({
      id: judgeId,
      updates: { status },
    });
  };

  const handleFeaturedChange = (judgeId: number, featured: boolean) => {
    updateJudgeMutation.mutate({
      id: judgeId,
      updates: { featured },
    });
  };

  const handleBadgeToggle = (judgeId: number, currentBadges: string[], badge: string) => {
    const newBadges = currentBadges.includes(badge)
      ? currentBadges.filter(b => b !== badge)
      : [...currentBadges, badge];
    
    updateJudgeMutation.mutate({
      id: judgeId,
      updates: { badges: newBadges },
    });
  };

  const availableBadges = [
    "judge of the month",
    "participant favorite",
    "rising judge",
    "founder's pick",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="judges" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="judges">Judges</TabsTrigger>
            <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
          </TabsList>
          
          <TabsContent value="judges" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Judge Applications</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {judges?.length || 0} total judges
                  </span>
                </div>
              </div>
            </div>
            
            {judgesLoading ? (
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="animate-pulse">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {judges?.map((judge) => (
                  <Card key={judge.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={judge.avatar || undefined} />
                          <AvatarFallback>
                            {judge.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{judge.name}</h3>
                            <Badge className={getStatusColor(judge.status)}>
                              {getStatusIcon(judge.status)}
                              {judge.status}
                            </Badge>
                            {judge.featured && (
                              <Badge variant="outline">Featured</Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">{judge.title}</p>
                          <p className="text-sm text-gray-500 mb-2">{judge.email}</p>
                          
                          {judge.bio && (
                            <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                              {judge.bio}
                            </p>
                          )}
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {judge.badges?.map((badge) => (
                              <Badge key={badge} variant="secondary">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 pt-4 border-t">
                            <div className="flex items-center gap-2">
                              <label className="text-sm font-medium">Status:</label>
                              <Select
                                value={judge.status}
                                onValueChange={(value) => handleStatusChange(judge.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="approved">Approved</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`featured-${judge.id}`}
                                checked={judge.featured}
                                onCheckedChange={(checked) => 
                                  handleFeaturedChange(judge.id, checked as boolean)
                                }
                              />
                              <label 
                                htmlFor={`featured-${judge.id}`}
                                className="text-sm font-medium"
                              >
                                Featured
                              </label>
                            </div>
                            
                            <Separator orientation="vertical" className="h-6" />
                            
                            <div className="flex items-center gap-2">
                              <label className="text-sm font-medium">Badges:</label>
                              <div className="flex gap-2">
                                {availableBadges.map((badge) => (
                                  <Button
                                    key={badge}
                                    variant={judge.badges?.includes(badge) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleBadgeToggle(judge.id, judge.badges || [], badge)}
                                  >
                                    {badge}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="hackathons" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Hackathon Applications</h2>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {hackathons?.length || 0} total applications
                </span>
              </div>
            </div>
            
            {hackathonsLoading ? (
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {hackathons?.map((hackathon) => (
                  <Card key={hackathon.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{hackathon.hackathonName}</h3>
                            <Badge className={getStatusColor(hackathon.status)}>
                              {getStatusIcon(hackathon.status)}
                              {hackathon.status}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            {hackathon.orgName}
                          </p>
                          
                          <p className="text-sm text-gray-500 mb-4">
                            {hackathon.contactEmail}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Dates:</span>{" "}
                              {hackathon.startDate && hackathon.endDate ? (
                                <>
                                  {new Date(hackathon.startDate).toLocaleDateString()} - {" "}
                                  {new Date(hackathon.endDate).toLocaleDateString()}
                                </>
                              ) : (
                                "TBD"
                              )}
                            </div>
                            <div>
                              <span className="font-medium">Judges needed:</span>{" "}
                              {hackathon.judgesNeeded || "TBD"}
                            </div>
                            <div>
                              <span className="font-medium">Format:</span>{" "}
                              {hackathon.format || "TBD"}
                            </div>
                            <div>
                              <span className="font-medium">Website:</span>{" "}
                              {hackathon.website ? (
                                <a 
                                  href={hackathon.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  {hackathon.website}
                                </a>
                              ) : (
                                "None"
                              )}
                            </div>
                          </div>
                          
                          {hackathon.description && (
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-sm text-gray-700">
                                {hackathon.description}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
