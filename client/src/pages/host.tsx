import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Calendar, Users, Star } from "lucide-react";
import { SEO } from "@/components/seo";

export default function Host() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Host Event - JudgeBase"
        description="Host your hackathon or competition with expert judges from JudgeBase."
        keywords="host hackathon, competition organizer, expert judges, event hosting"
      />
      
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Host Your Event with Expert Judges
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with qualified judges to elevate your hackathon or competition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                Expert Judge Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access our curated network of industry professionals with expertise across various technologies and domains.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Flexible Scheduling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our judges can accommodate various event formats including live judging, asynchronous evaluation, and hybrid approaches.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-600" />
                Quality Assurance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                All judges are vetted for their expertise and experience, ensuring high-quality evaluation for your participants.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-green-600" />
                Dedicated Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get personalized support throughout the entire process, from judge selection to post-event coordination.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Ready to Get Started?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-6">
              Contact us to discuss your event requirements and find the perfect judges for your hackathon or competition.
            </p>
            <a 
              href="mailto:hello@judgebase.co"
              className="inline-block"
            >
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
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

          {/* Metrics */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">4.9</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Judge Satisfaction</h3>
              <p className="text-gray-600">Verified feedback from event organizers</p>
              <div className="mt-3 text-3xl font-bold text-purple-600">4.9/5</div>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2h</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Average Response Time</h3>
              <p className="text-gray-600">Fast matching for your events</p>
              <div className="mt-3 text-3xl font-bold text-blue-600">&lt; 2 hours</div>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">99</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Platform Uptime</h3>
              <p className="text-gray-600">Reliable service you can count on</p>
              <div className="mt-3 text-3xl font-bold text-green-600">99.9%</div>
            </div>
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