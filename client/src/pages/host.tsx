import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertHackathonSchema } from "@shared/schema";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle } from "lucide-react";
import { z } from "zod";

const hostSchema = insertHackathonSchema.extend({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

type HostFormData = z.infer<typeof hostSchema>;

export default function Host() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<HostFormData>({
    resolver: zodResolver(hostSchema),
  });

  const submitMutation = useMutation({
    mutationFn: async (data: HostFormData) => {
      const payload = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };
      
      const response = await apiRequest("POST", "/api/hackathons/apply", payload);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Hackathon application submitted successfully!",
        description: "We'll review your request and get back to you soon.",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error submitting application",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: HostFormData) => {
    submitMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="text-center">
              <CardContent className="pt-12 pb-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Request Submitted!
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Thank you for your interest in working with JudgeBase. We'll review your hackathon details and reach out to discuss how we can help you find the perfect judges.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                >
                  Submit Another Request
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Need judges for your event?
            </h1>
            <p className="text-xl text-gray-600">
              We work with hackathons to place verified judges and mentors
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hackathon Judge Request</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="orgName">Organization Name *</Label>
                    <Input
                      id="orgName"
                      {...register("orgName")}
                      placeholder="Your organization name"
                    />
                    {errors.orgName && (
                      <p className="text-red-500 text-sm mt-1">{errors.orgName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="hackathonName">Hackathon Name *</Label>
                    <Input
                      id="hackathonName"
                      {...register("hackathonName")}
                      placeholder="Your hackathon name"
                    />
                    {errors.hackathonName && (
                      <p className="text-red-500 text-sm mt-1">{errors.hackathonName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      {...register("contactEmail")}
                      placeholder="your@email.com"
                    />
                    {errors.contactEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      {...register("website")}
                      placeholder="https://yourhackathon.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      {...register("startDate")}
                    />
                    {errors.startDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      {...register("endDate")}
                    />
                    {errors.endDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="judgesNeeded">Number of Judges Needed</Label>
                    <Input
                      id="judgesNeeded"
                      type="number"
                      {...register("judgesNeeded", { valueAsNumber: true })}
                      placeholder="e.g., 5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="format">Judging Format</Label>
                    <Select onValueChange={(value) => setValue("format", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="async">Async</SelectItem>
                        <SelectItem value="live">Live</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="domains">Domains/Categories</Label>
                  <Input
                    id="domains"
                    {...register("domains")}
                    placeholder="e.g., AI/ML, Web Development, Healthcare (comma-separated)"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Separate multiple domains with commas
                  </p>
                </div>

                <div>
                  <Label htmlFor="description">Additional Details</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Tell us more about your hackathon, timeline, and what you're looking for in judges"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-bg text-white py-3 text-lg font-semibold"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
