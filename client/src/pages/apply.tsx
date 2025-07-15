import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { z } from "zod";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Users, Award, Shield, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { SEO } from "@/components/seo";

const expertiseOptions = [
  "AI & ML",
  "Web Dev",
  "Product",
  "Marketing",
  "Design",
  "Blockchain",
  "Cybersecurity",
  "EdTech",
  "Fintech"
];

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  currentRole: z.string().min(1, "Current role is required"),
  linkedin: z.string().url("Please enter a valid LinkedIn URL"),
  twitterOrWebsite: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  avatar: z.any().optional(),
  hasJudgedBefore: z.boolean(),
  previousExperience: z.string().optional(),
  expertise: z.array(z.string()).min(1, "Please select at least one area of expertise"),
  otherExpertise: z.string().optional(),
  shortBio: z.string().min(10, "Bio must be at least 10 characters").max(300, "Bio must be less than 300 characters"),
  judgingPhilosophy: z.string().min(20, "Please provide at least 20 characters for your judging philosophy"),
  openToMentoring: z.enum(["Yes", "No", "Depends"]),
  preferredFormat: z.array(z.string()).min(1, "Please select at least one format"),
  whyJoinJudgeBase: z.string().optional(),
  anythingElse: z.string().optional(),
  consentAgreed: z.boolean().refine((val) => val === true, "You must agree to the terms"),
});

type FormData = z.infer<typeof formSchema>;

export default function Apply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      currentRole: "",
      linkedin: "",
      twitterOrWebsite: "",
      hasJudgedBefore: false,
      previousExperience: "",
      expertise: [],
      otherExpertise: "",
      shortBio: "",
      judgingPhilosophy: "",
      openToMentoring: "Yes",
      preferredFormat: [],
      whyJoinJudgeBase: "",
      anythingElse: "",
      consentAgreed: false,
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();
      
      // Append all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'expertise' || key === 'preferredFormat') {
          formData.append(key, Array.isArray(value) ? value.join(',') : '');
        } else if (typeof value === 'boolean') {
          formData.append(key, value.toString());
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      // Append file if selected
      if (selectedFile) {
        formData.append('avatar', selectedFile);
      }

      return apiRequest('/api/judges/apply', {
        method: 'POST',
        body: formData,
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Application submitted successfully!",
        description: "We'll review your application and get back to you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/judge-applications'] });
    },
    onError: (error: any) => {
      console.error('Submission error:', error);
      toast({
        title: "Error submitting application",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    submitMutation.mutate(data);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <SEO
          title="Application Submitted - JudgeBase"
          description="Thank you for applying to join JudgeBase. We'll review your application and get back to you soon."
        />
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thanks for applying. Applications are reviewed on the 15th of each month. 
              If selected, you'll be contacted via email to complete your profile.
            </p>
            <Button onClick={() => window.location.href = '/'} className="bg-gradient-to-r from-purple-600 to-blue-600">
              Back to Home
            </Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <SEO
        title="Apply to Judge - JudgeBase"
        description="Join JudgeBase as an expert judge. Share your expertise and help shape the future of innovation through hackathons."
        keywords="judge application, hackathon judge, JudgeBase, tech expert, innovation"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              apply to join judgebase
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              If you're an experienced builder, operator, engineer, or founder — and you're ready to support the next wave of innovation — you're in the right place.
            </p>
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
            >
              Start Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why JudgeBase Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Be Part of Real Panels</h3>
                <p className="text-gray-600">Get invited to high-signal hackathons across India and beyond.</p>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Build Your Public Signal</h3>
                <p className="text-gray-600">Get a personalized JudgeBase profile you can link anywhere.</p>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Recognized, Not Random</h3>
                <p className="text-gray-600">This isn't spammy or pay-to-play. Every application is reviewed.</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Judge Application</CardTitle>
              <CardDescription>Step {currentStep} of 4</CardDescription>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Step 1: About You */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold">About You</h3>
                      
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input {...field} className="focus:ring-purple-500" />
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
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} className="focus:ring-purple-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="currentRole"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Role & Company *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Product @ Razorpay" {...field} className="focus:ring-purple-500" />
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
                            <FormLabel>LinkedIn Profile *</FormLabel>
                            <FormControl>
                              <Input placeholder="https://linkedin.com/in/yourprofile" {...field} className="focus:ring-purple-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="twitterOrWebsite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter or Personal Website (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://twitter.com/yourhandle or https://yourwebsite.com" {...field} className="focus:ring-purple-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-2">
                        <Label>Upload Your Photo (square headshot, required) *</Label>
                        <div className="flex items-center gap-4">
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            onChange={handleFileChange}
                            className="hidden"
                            id="avatar-upload"
                          />
                          <label
                            htmlFor="avatar-upload"
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                          >
                            <Upload className="w-4 h-4" />
                            Choose File
                          </label>
                          {selectedFile && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">{selectedFile.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedFile(null)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">Accept .jpg, .png, .webp files</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Your Experience */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold">Your Experience</h3>
                      
                      <FormField
                        control={form.control}
                        name="hasJudgedBefore"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Have you ever judged a hackathon before?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => field.onChange(value === 'true')}
                                value={field.value ? 'true' : 'false'}
                                className="flex flex-col space-y-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="true" id="judged-yes" />
                                  <Label htmlFor="judged-yes">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="false" id="judged-no" />
                                  <Label htmlFor="judged-no">No</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      {form.watch('hasJudgedBefore') && (
                        <FormField
                          control={form.control}
                          name="previousExperience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>If yes, which ones?</FormLabel>
                              <FormControl>
                                <Textarea {...field} className="focus:ring-purple-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      <FormField
                        control={form.control}
                        name="expertise"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Areas of Expertise *</FormLabel>
                            <FormControl>
                              <div className="grid grid-cols-2 gap-3">
                                {expertiseOptions.map((option) => (
                                  <div key={option} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={option}
                                      checked={field.value.includes(option)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          field.onChange([...field.value, option]);
                                        } else {
                                          field.onChange(field.value.filter((item) => item !== option));
                                        }
                                      }}
                                    />
                                    <Label htmlFor={option} className="text-sm">{option}</Label>
                                  </div>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="otherExpertise"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Other (type below)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Any other areas of expertise..." className="focus:ring-purple-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="shortBio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Short Bio (2–3 lines about who you are) *</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Used in your JudgeBase profile if selected"
                                className="focus:ring-purple-500"
                                maxLength={300}
                              />
                            </FormControl>
                            <FormDescription>
                              {field.value?.length || 0}/300 characters
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {/* Step 3: Judging Style */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold">Judging Style</h3>
                      
                      <FormField
                        control={form.control}
                        name="judgingPhilosophy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What's your judging philosophy? *</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="e.g. What do you value in a winning team? How do you evaluate early-stage ideas?"
                                className="focus:ring-purple-500"
                                rows={4}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="openToMentoring"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Are you open to mentoring teams during or after the event?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Yes" id="mentor-yes" />
                                  <Label htmlFor="mentor-yes">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="No" id="mentor-no" />
                                  <Label htmlFor="mentor-no">No</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Depends" id="mentor-depends" />
                                  <Label htmlFor="mentor-depends">Depends</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="preferredFormat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Format *</FormLabel>
                            <FormControl>
                              <div className="space-y-3">
                                {["Async only", "Live judging", "Flexible"].map((format) => (
                                  <div key={format} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={format}
                                      checked={field.value.includes(format)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          field.onChange([...field.value, format]);
                                        } else {
                                          field.onChange(field.value.filter((item) => item !== format));
                                        }
                                      }}
                                    />
                                    <Label htmlFor={format}>{format}</Label>
                                  </div>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {/* Step 4: Final */}
                  {currentStep === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold">Final</h3>
                      
                      <FormField
                        control={form.control}
                        name="whyJoinJudgeBase"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Why do you want to join JudgeBase? (optional)</FormLabel>
                            <FormControl>
                              <Textarea {...field} className="focus:ring-purple-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="anythingElse"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Anything else we should know? (optional)</FormLabel>
                            <FormControl>
                              <Textarea {...field} className="focus:ring-purple-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="consentAgreed"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I understand that only selected applicants will be listed and may be required to pay a listing fee to activate my JudgeBase profile. *
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    {currentStep > 1 && (
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Previous
                      </Button>
                    )}
                    {currentStep < 4 ? (
                      <Button type="button" onClick={nextStep} className="ml-auto">
                        Next
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        className="ml-auto bg-gradient-to-r from-purple-600 to-blue-600"
                        disabled={submitMutation.isPending}
                      >
                        {submitMutation.isPending ? "Submitting..." : "Submit Application"}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">What Happens Next</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We review all applications manually on the 15th of each month.
                </p>
                
                <div className="space-y-2">
                  <p className="font-semibold">If you're selected, you'll get:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• A confirmation email</li>
                    <li>• Access to your JudgeBase profile setup</li>
                    <li>• Info on next steps and upcoming judging invites</li>
                  </ul>
                </div>
                
                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <strong>Note:</strong> There may be a small listing fee to activate your profile (₹499–₹999).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            "Great judges aren't found. They're invited."
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join JudgeBase and be part of something real.
          </p>
          <Button 
            onClick={scrollToForm}
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            Start Application
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}