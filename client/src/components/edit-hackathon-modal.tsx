import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Hackathon } from "@shared/schema";

const editHackathonSchema = z.object({
  hackathonName: z.string().min(1, "Hackathon name is required"),
  organizationName: z.string().min(1, "Organization name is required"),
  organizerName: z.string().min(1, "Organizer name is required"),
  organizerEmail: z.string().email("Valid email is required"),
  hackathonWebsite: z.string().url("Valid URL is required"),
  platform: z.string().min(1, "Platform is required"),
  hackathonDates: z.string().min(1, "Dates are required"),
  judgeDeadline: z.string().min(1, "Judge deadline is required"),
  participantCount: z.string().min(1, "Participant count is required"),
  theme: z.string().min(1, "Theme is required"),
  eventSummary: z.string().min(1, "Event summary is required"),
  judgeCount: z.string().min(1, "Judge count is required"),
  timeCommitment: z.string().min(1, "Time commitment is required"),
  domains: z.array(z.string()).min(1, "At least one domain is required"),
  eventFormat: z.array(z.string()).min(1, "At least one event format is required"),
  deliverables: z.array(z.string()).min(1, "At least one deliverable is required"),
});

type EditHackathonFormData = z.infer<typeof editHackathonSchema>;

interface EditHackathonModalProps {
  hackathon: Hackathon;
  isOpen: boolean;
  onClose: () => void;
}

export function EditHackathonModal({ hackathon, isOpen, onClose }: EditHackathonModalProps) {
  const [newDomain, setNewDomain] = useState("");
  const [newFormat, setNewFormat] = useState("");
  const [newDeliverable, setNewDeliverable] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<EditHackathonFormData>({
    resolver: zodResolver(editHackathonSchema),
    defaultValues: {
      hackathonName: hackathon.hackathonName || '',
      organizationName: hackathon.organizationName || '',
      organizerName: hackathon.organizerName || '',
      organizerEmail: hackathon.organizerEmail || '',
      hackathonWebsite: hackathon.hackathonWebsite || '',
      platform: hackathon.platform || '',
      hackathonDates: hackathon.hackathonDates || '',
      judgeDeadline: hackathon.judgeDeadline || '',
      participantCount: hackathon.participantCount || '',
      theme: hackathon.theme || '',
      eventSummary: hackathon.eventSummary || '',
      judgeCount: hackathon.judgeCount || '',
      timeCommitment: hackathon.timeCommitment || '',
      domains: hackathon.domains || [],
      eventFormat: hackathon.eventFormat || [],
      deliverables: hackathon.deliverables || [],
    },
  });

  // Reset form when hackathon changes
  React.useEffect(() => {
    form.reset({
      hackathonName: hackathon.hackathonName || '',
      organizationName: hackathon.organizationName || '',
      organizerName: hackathon.organizerName || '',
      organizerEmail: hackathon.organizerEmail || '',
      hackathonWebsite: hackathon.hackathonWebsite || '',
      platform: hackathon.platform || '',
      hackathonDates: hackathon.hackathonDates || '',
      judgeDeadline: hackathon.judgeDeadline || '',
      participantCount: hackathon.participantCount || '',
      theme: hackathon.theme || '',
      eventSummary: hackathon.eventSummary || '',
      judgeCount: hackathon.judgeCount || '',
      timeCommitment: hackathon.timeCommitment || '',
      domains: hackathon.domains || [],
      eventFormat: hackathon.eventFormat || [],
      deliverables: hackathon.deliverables || [],
    });
  }, [hackathon, form]);

  const updateHackathonMutation = useMutation({
    mutationFn: async (data: EditHackathonFormData) => {
      console.log('Updating hackathon with data:', data);
      return apiRequest(`/api/admin/hackathons/${hackathon.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Hackathon updated successfully!",
        description: "The hackathon details have been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/hackathons'] });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error updating hackathon",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EditHackathonFormData) => {
    updateHackathonMutation.mutate(data);
  };

  const addDomain = () => {
    if (newDomain.trim()) {
      const currentDomains = form.getValues("domains");
      form.setValue("domains", [...currentDomains, newDomain.trim()]);
      setNewDomain("");
    }
  };

  const removeDomain = (index: number) => {
    const currentDomains = form.getValues("domains");
    form.setValue("domains", currentDomains.filter((_, i) => i !== index));
  };

  const addFormat = () => {
    if (newFormat.trim()) {
      const currentFormats = form.getValues("eventFormat");
      form.setValue("eventFormat", [...currentFormats, newFormat.trim()]);
      setNewFormat("");
    }
  };

  const removeFormat = (index: number) => {
    const currentFormats = form.getValues("eventFormat");
    form.setValue("eventFormat", currentFormats.filter((_, i) => i !== index));
  };

  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      const currentDeliverables = form.getValues("deliverables");
      form.setValue("deliverables", [...currentDeliverables, newDeliverable.trim()]);
      setNewDeliverable("");
    }
  };

  const removeDeliverable = (index: number) => {
    const currentDeliverables = form.getValues("deliverables");
    form.setValue("deliverables", currentDeliverables.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Hackathon Details</DialogTitle>
          <DialogDescription>
            Modify the hackathon information below. Changes will be saved to the database.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hackathonName">Hackathon Name</Label>
              <Input
                id="hackathonName"
                {...form.register("hackathonName")}
                placeholder="Enter hackathon name"
              />
              {form.formState.errors.hackathonName && (
                <p className="text-sm text-red-600">{form.formState.errors.hackathonName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizationName">Organization Name</Label>
              <Input
                id="organizationName"
                {...form.register("organizationName")}
                placeholder="Enter organization name"
              />
              {form.formState.errors.organizationName && (
                <p className="text-sm text-red-600">{form.formState.errors.organizationName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizerName">Organizer Name</Label>
              <Input
                id="organizerName"
                {...form.register("organizerName")}
                placeholder="Enter organizer name"
              />
              {form.formState.errors.organizerName && (
                <p className="text-sm text-red-600">{form.formState.errors.organizerName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizerEmail">Organizer Email</Label>
              <Input
                id="organizerEmail"
                type="email"
                {...form.register("organizerEmail")}
                placeholder="Enter organizer email"
              />
              {form.formState.errors.organizerEmail && (
                <p className="text-sm text-red-600">{form.formState.errors.organizerEmail.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hackathonWebsite">Hackathon Website</Label>
              <Input
                id="hackathonWebsite"
                {...form.register("hackathonWebsite")}
                placeholder="Enter hackathon website"
              />
              {form.formState.errors.hackathonWebsite && (
                <p className="text-sm text-red-600">{form.formState.errors.hackathonWebsite.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Input
                id="platform"
                {...form.register("platform")}
                placeholder="Enter platform (e.g., Virtual, In-person, Hybrid)"
              />
              {form.formState.errors.platform && (
                <p className="text-sm text-red-600">{form.formState.errors.platform.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hackathonDates">Hackathon Dates</Label>
              <Input
                id="hackathonDates"
                {...form.register("hackathonDates")}
                placeholder="Enter hackathon dates"
              />
              {form.formState.errors.hackathonDates && (
                <p className="text-sm text-red-600">{form.formState.errors.hackathonDates.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="judgeDeadline">Judge Deadline</Label>
              <Input
                id="judgeDeadline"
                {...form.register("judgeDeadline")}
                placeholder="Enter judge deadline"
              />
              {form.formState.errors.judgeDeadline && (
                <p className="text-sm text-red-600">{form.formState.errors.judgeDeadline.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="participantCount">Participant Count</Label>
              <Input
                id="participantCount"
                {...form.register("participantCount")}
                placeholder="Enter expected participant count"
              />
              {form.formState.errors.participantCount && (
                <p className="text-sm text-red-600">{form.formState.errors.participantCount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="judgeCount">Judge Count</Label>
              <Input
                id="judgeCount"
                {...form.register("judgeCount")}
                placeholder="Enter number of judges needed"
              />
              {form.formState.errors.judgeCount && (
                <p className="text-sm text-red-600">{form.formState.errors.judgeCount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeCommitment">Time Commitment</Label>
              <Input
                id="timeCommitment"
                {...form.register("timeCommitment")}
                placeholder="Enter time commitment for judges"
              />
              {form.formState.errors.timeCommitment && (
                <p className="text-sm text-red-600">{form.formState.errors.timeCommitment.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Input
                id="theme"
                {...form.register("theme")}
                placeholder="Enter hackathon theme"
              />
              {form.formState.errors.theme && (
                <p className="text-sm text-red-600">{form.formState.errors.theme.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventSummary">Event Summary</Label>
            <Textarea
              id="eventSummary"
              {...form.register("eventSummary")}
              placeholder="Enter event summary"
              rows={3}
            />
            {form.formState.errors.eventSummary && (
              <p className="text-sm text-red-600">{form.formState.errors.eventSummary.message}</p>
            )}
          </div>

          {/* Domains */}
          <div className="space-y-2">
            <Label>Domains</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.watch("domains").map((domain, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {domain}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => removeDomain(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                placeholder="Add domain"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDomain())}
              />
              <Button type="button" onClick={addDomain} variant="outline">
                Add
              </Button>
            </div>
          </div>

          {/* Event Format */}
          <div className="space-y-2">
            <Label>Event Format</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.watch("eventFormat").map((format, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {format}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => removeFormat(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newFormat}
                onChange={(e) => setNewFormat(e.target.value)}
                placeholder="Add event format"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFormat())}
              />
              <Button type="button" onClick={addFormat} variant="outline">
                Add
              </Button>
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-2">
            <Label>Deliverables</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.watch("deliverables").map((deliverable, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {deliverable}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => removeDeliverable(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                placeholder="Add deliverable"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDeliverable())}
              />
              <Button type="button" onClick={addDeliverable} variant="outline">
                Add
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={updateHackathonMutation.isPending}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {updateHackathonMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}