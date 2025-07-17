import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle, Clock, Mail, Users, Calendar, MapPin, Send, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { EditHackathonModal } from "./edit-hackathon-modal";
import { HackathonPasswordDisplay } from "./hackathon-password-display";
import type { Hackathon, Judge } from "@shared/schema";

interface HackathonManagementProps {
  hackathons: Hackathon[];
  isLoading: boolean;
}

export function HackathonManagement({ hackathons, isLoading }: HackathonManagementProps) {
  const [selectedJudges, setSelectedJudges] = useState<string[]>([]);
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editingHackathon, setEditingHackathon] = useState<Hackathon | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [approvedHackathon, setApprovedHackathon] = useState<Hackathon | null>(null);
  const [hackathonPassword, setHackathonPassword] = useState<string>('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const pendingHackathons = hackathons?.filter((hack: Hackathon) => hack.status === 'pending') || [];
  const approvedHackathons = hackathons?.filter((hack: Hackathon) => hack.status === 'approved') || [];
  const rejectedHackathons = hackathons?.filter((hack: Hackathon) => hack.status === 'rejected') || [];

  const { data: availableJudges } = useQuery({
    queryKey: [`/api/admin/hackathons/${selectedHackathon?.id}/available-judges`],
    queryFn: () => apiRequest(`/api/admin/hackathons/${selectedHackathon?.id}/available-judges`),
    enabled: !!selectedHackathon && isInviteModalOpen,
  });

  const updateHackathonMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest(`/api/admin/hackathons/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: (data, variables) => {
      const statusText = variables.status === 'approved' ? 'approved' : 'rejected';
      toast({
        title: `Hackathon ${statusText} successfully!`,
        description: variables.status === 'approved' 
          ? "The organizer has been notified via email."
          : "The hackathon has been rejected.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/hackathons'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating hackathon",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const approveHackathonMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/hackathons/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: (data) => {
      setApprovedHackathon(data.hackathon);
      setHackathonPassword(data.password);
      toast({
        title: "Hackathon approved!",
        description: "Organizer credentials have been generated.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/hackathons'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error approving hackathon",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const inviteJudgesMutation = useMutation({
    mutationFn: async ({ hackathonId, judgeIds }: { hackathonId: string; judgeIds: string[] }) => {
      return apiRequest(`/api/admin/hackathons/${hackathonId}/invite-judges`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judgeIds }),
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Invitations sent successfully!",
        description: `${data.success} judges have been invited via email.`,
      });
      setIsInviteModalOpen(false);
      setSelectedJudges([]);
      setSelectedHackathon(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error sending invitations",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleInviteJudges = () => {
    if (selectedHackathon && selectedJudges.length > 0) {
      inviteJudgesMutation.mutate({
        hackathonId: selectedHackathon.id,
        judgeIds: selectedJudges,
      });
    }
  };

  const handleJudgeSelection = (judgeId: string, checked: boolean) => {
    if (checked) {
      setSelectedJudges([...selectedJudges, judgeId]);
    } else {
      setSelectedJudges(selectedJudges.filter(id => id !== judgeId));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const HackathonCard = ({ hackathon }: { hackathon: Hackathon }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
              {hackathon.hackathonName}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {hackathon.hackathonDates}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {hackathon.platform}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {hackathon.participantCount} participants
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700">Organizer:</span>
              <span className="text-sm text-gray-600">{hackathon.organizerName}</span>
              <span className="text-sm text-gray-500">({hackathon.organizerEmail})</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {getStatusBadge(hackathon.status)}
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setEditingHackathon(hackathon);
                  setIsEditModalOpen(true);
                }}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              {hackathon.status === 'approved' && (
                <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => setSelectedHackathon(hackathon)}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Invite Judges
                    </Button>
                  </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Invite Judges to {hackathon.hackathonName}</DialogTitle>
                    <DialogDescription>
                      Select judges to invite via email. They will receive details about the hackathon.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Select judges to invite via email. They will receive details about the hackathon.
                    </p>
                    <ScrollArea className="h-96">
                      <div className="space-y-2">
                        {availableJudges?.map((judge: Judge) => (
                          <div key={judge.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <Checkbox 
                              id={judge.id}
                              checked={selectedJudges.includes(judge.id)}
                              onCheckedChange={(checked) => handleJudgeSelection(judge.id, checked as boolean)}
                            />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{judge.name}</div>
                              <div className="text-sm text-gray-600">{judge.title} @ {judge.company}</div>
                              <div className="text-sm text-gray-500">{judge.email}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="text-sm text-gray-600">
                        {selectedJudges.length} judges selected
                      </span>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsInviteModalOpen(false);
                            setSelectedJudges([]);
                            setSelectedHackathon(null);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleInviteJudges}
                          disabled={selectedJudges.length === 0 || inviteJudgesMutation.isPending}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          {inviteJudgesMutation.isPending ? 'Sending...' : 'Send Invitations'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Theme:</p>
            <p className="text-sm text-gray-600">{hackathon.theme}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Event Summary:</p>
            <p className="text-sm text-gray-600">{hackathon.eventSummary}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Domains:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {hackathon.domains.map((domain, index) => (
                <Badge key={index} variant="secondary" className="text-xs">{domain}</Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Judge Deadline:</span>
              <span className="text-gray-600 ml-2">{hackathon.judgeDeadline}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Judges Needed:</span>
              <span className="text-gray-600 ml-2">{hackathon.judgeCount}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {hackathon.status === 'pending' && (
            <>
              <Button 
                size="sm" 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => approveHackathonMutation.mutate(hackathon.id)}
                disabled={approveHackathonMutation.isPending}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                {approveHackathonMutation.isPending ? 'Approving...' : 'Approve & Generate Access'}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-red-600 text-red-600 hover:bg-red-50"
                onClick={() => updateHackathonMutation.mutate({ id: hackathon.id, status: 'rejected' })}
                disabled={updateHackathonMutation.isPending}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingHackathons.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedHackathons.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedHackathons.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Pending Hackathons</h3>
          {pendingHackathons.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No pending hackathons</p>
          ) : (
            pendingHackathons.map((hackathon: Hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Approved Hackathons</h3>
          {approvedHackathons.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No approved hackathons</p>
          ) : (
            approvedHackathons.map((hackathon: Hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Rejected Hackathons</h3>
          {rejectedHackathons.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No rejected hackathons</p>
          ) : (
            rejectedHackathons.map((hackathon: Hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))
          )}
        </div>
      </div>
      
      {/* Edit Hackathon Modal */}
      {editingHackathon && (
        <EditHackathonModal 
          hackathon={editingHackathon}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingHackathon(null);
          }}
        />
      )}

      {/* Hackathon Password Display Modal */}
      {approvedHackathon && hackathonPassword && (
        <HackathonPasswordDisplay
          hackathon={approvedHackathon}
          password={hackathonPassword}
          isOpen={true}
          onClose={() => {
            setApprovedHackathon(null);
            setHackathonPassword('');
          }}
        />
      )}
    </div>
  );
}