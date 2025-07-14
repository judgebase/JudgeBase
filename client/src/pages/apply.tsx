import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function Apply() {
  useEffect(() => {
    // Redirect to external form immediately
    window.location.href = "https://teleform.app/example";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Apply as a Judge
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-600 mb-6">
              Redirecting you to our application form...
            </p>
            <p className="text-sm text-gray-500 mb-8">
              If you're not redirected automatically, click the button below.
            </p>
            <a 
              href="https://teleform.app/example"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Application Form
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
          formData.append(key, String(value));
        }
      });

      const response = await apiRequest("POST", "/api/judges/apply", formData);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Application submitted successfully!",
        description: "We'll review your application and get back to you if selected.",
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

  const onSubmit = (data: ApplyFormData) => {
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
                  Application Submitted!
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Thank you for your interest in joining JudgeBase. We'll review your application and reach out if you're selected for our panel.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="mr-4"
                >
                  Submit Another Application
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
              Apply to be a Judge
            </h1>
            <p className="text-xl text-gray-600">
              Join our curated panel of expert hackathon judges
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Judge Application</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Title/Role *</Label>
                  <Input
                    id="title"
                    {...register("title")}
                    placeholder="e.g., Senior Software Engineer at Google"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    {...register("bio")}
                    placeholder="Brief bio about yourself"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Judging Experience</Label>
                  <Textarea
                    id="experience"
                    {...register("experience")}
                    placeholder="Describe your previous judging experience"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="judgingPhilosophy">Judging Philosophy</Label>
                  <Textarea
                    id="judgingPhilosophy"
                    {...register("judgingPhilosophy")}
                    placeholder="What do you look for when judging hackathon projects?"
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      {...register("linkedin")}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  <div>
                    <Label htmlFor="twitter">Twitter URL</Label>
                    <Input
                      id="twitter"
                      {...register("twitter")}
                      placeholder="https://twitter.com/yourusername"
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      {...register("website")}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="avatar">Profile Photo</Label>
                  <div className="mt-1 flex items-center gap-4">
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      {...register("avatar")}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("avatar")?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                    <span className="text-sm text-gray-500">
                      Optional - JPG, PNG, or GIF up to 5MB
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-bg text-white py-3 text-lg font-semibold"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? "Submitting..." : "Submit Application"}
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
