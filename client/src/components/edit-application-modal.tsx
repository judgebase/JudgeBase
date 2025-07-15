import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { JudgeApplication } from "@shared/schema";

const expertiseOptions = [
  "AI & ML", "Web Dev", "Product", "Marketing", "Design", 
  "Blockchain", "Cybersecurity", "EdTech", "Fintech"
];

const editSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  currentRole: z.string().min(1, "Current role is required"),
  linkedin: z.string().url("Please enter a valid LinkedIn URL"),
  twitterOrWebsite: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  hasJudgedBefore: z.boolean(),
  previousExperience: z.string().optional(),
  expertise: z.array(z.string()).min(1, "Please select at least one area of expertise"),
  otherExpertise: z.string().optional(),
  shortBio: z.string().min(10, "Bio must be at least 10 characters").max(1000, "Bio must be less than 1000 characters"),
  judgingPhilosophy: z.string().min(20, "Please provide at least 20 characters for your judging philosophy").max(1000, "Philosophy must be less than 1000 characters"),
  openToMentoring: z.enum(["Yes", "No", "Depends"]),
  preferredFormat: z.array(z.string()).min(1, "Please select at least one format"),
  whyJoinJudgeBase: z.string().optional(),
  anythingElse: z.string().optional(),
});

type EditFormData = z.infer<typeof editSchema>;

interface EditApplicationModalProps {
  application: JudgeApplication;
  isOpen: boolean;
  onClose: () => void;
}

export function EditApplicationModal({ application, isOpen, onClose }: EditApplicationModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      fullName: application.fullName,
      email: application.email,
      currentRole: application.currentRole,
      linkedin: application.linkedin,
      twitterOrWebsite: application.twitterOrWebsite || "",
      hasJudgedBefore: application.hasJudgedBefore,
      previousExperience: application.previousExperience || "",
      expertise: application.expertise,
      otherExpertise: application.otherExpertise || "",
      shortBio: application.shortBio,
      judgingPhilosophy: application.judgingPhilosophy,
      openToMentoring: application.openToMentoring as "Yes" | "No" | "Depends",
      preferredFormat: application.preferredFormat,
      whyJoinJudgeBase: application.whyJoinJudgeBase || "",
      anythingElse: application.anythingElse || "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: EditFormData) => {
      return apiRequest(`/api/admin/judge-applications/${application.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Application updated successfully!",
        description: "The judge application has been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/judge-applications'] });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error updating application",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EditFormData) => {
    updateMutation.mutate(data);
  };

  const toggleExpertise = (expertise: string) => {
    const current = form.getValues("expertise");
    if (current.includes(expertise)) {
      form.setValue("expertise", current.filter(e => e !== expertise));
    } else {
      form.setValue("expertise", [...current, expertise]);
    }
  };

  const toggleFormat = (format: string) => {
    const current = form.getValues("preferredFormat");
    if (current.includes(format)) {
      form.setValue("preferredFormat", current.filter(f => f !== format));
    } else {
      form.setValue("preferredFormat", [...current, format]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Judge Application</DialogTitle>
          <DialogDescription>
            Update the judge application details
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="currentRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Role</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="twitterOrWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter or Website (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expertise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Areas of Expertise</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {expertiseOptions.map((expertise) => (
                      <Badge
                        key={expertise}
                        variant={field.value.includes(expertise) ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleExpertise(expertise)}
                      >
                        {expertise}
                        {field.value.includes(expertise) && (
                          <X className="w-3 h-3 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortBio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="judgingPhilosophy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judging Philosophy</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="openToMentoring"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open to Mentoring</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Depends">Depends</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredFormat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Format</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {["Online", "In-person", "Live judging", "Flexible"].map((format) => (
                      <Badge
                        key={format}
                        variant={field.value.includes(format) ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleFormat(format)}
                      >
                        {format}
                        {field.value.includes(format) && (
                          <X className="w-3 h-3 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}