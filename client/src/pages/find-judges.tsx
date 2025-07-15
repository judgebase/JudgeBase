import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SEO } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Calendar, Users, Award } from 'lucide-react';

// Form data type
interface HackathonFormData {
  // Organizer Info
  organizerName: string;
  organizerEmail: string;
  organizationName: string;
  organizerRole: string;
  organizerWebsite: string;
  
  // Hackathon Details
  hackathonName: string;
  hackathonWebsite: string;
  platform: string;
  hackathonDates: string;
  judgeDeadline: string;
  eventFormat: string[];
  participantCount: string;
  isFirstTime: string;
  
  // Theme & Domains
  theme: string;
  domains: string[];
  eventSummary: string;
  needMentors: string;
  hasExistingJudges: string;
  
  // Logistics
  deliverables: string[];
  judgeCount: string;
  timeCommitment: string;
  
  // Final Notes
  whyJudgeBase: string;
  additionalNotes: string;
  consent: boolean;
}

export default function FindJudges() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<HackathonFormData>({
    organizerName: '',
    organizerEmail: '',
    organizationName: '',
    organizerRole: '',
    organizerWebsite: '',
    hackathonName: '',
    hackathonWebsite: '',
    platform: '',
    hackathonDates: '',
    judgeDeadline: '',
    eventFormat: [],
    participantCount: '',
    isFirstTime: '',
    theme: '',
    domains: [],
    eventSummary: '',
    needMentors: '',
    hasExistingJudges: '',
    deliverables: [],
    judgeCount: '',
    timeCommitment: '',
    whyJudgeBase: '',
    additionalNotes: '',
    consent: false
  });

  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: HackathonFormData) => {
      return await apiRequest('/api/hackathons/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Application submitted successfully!",
        description: "We'll review your event within 48 hours.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error submitting application",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof HackathonFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: keyof HackathonFormData, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast({
        title: "Please accept the terms",
        description: "You must consent to the review process.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate(formData);
  };

  const scrollToForm = () => {
    document.getElementById('hackathon-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-purple-900 dark:via-blue-900 dark:to-green-900">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Thank you for your submission!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We'll review your event within 48 hours. If approved, you'll receive private access to our panel.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Return to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Find Judges for Your Hackathon - JudgeBase"
        description="Connect credible hackathons with experienced judges across AI, product, design, web3, and more domains."
        keywords="hackathon judges, find judges, hackathon organizers, event judges"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-purple-900 dark:via-blue-900 dark:to-green-900">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              find judges for your hackathon
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              we connect credible events with experienced professionals across domains like AI, product, design, web3, and more.
            </p>
            <Button 
              onClick={scrollToForm}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
            >
              submit your event
            </Button>
          </div>

          {/* Why JudgeBase Section */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="text-center">
                  <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle className="text-xl font-bold text-gray-900">Vetted Panelists Only</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    All our judges are approved by hand — no open marketplace.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="text-center">
                  <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl font-bold text-gray-900">Async or Live Formats</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    We match judges based on your event format and domain.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-xl font-bold text-gray-900">Fast Response Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    We reply within 48 hours — usually faster.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Hackathon Intake Form */}
          <div id="hackathon-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Hackathon Intake Form</CardTitle>
                <CardDescription className="text-gray-600">
                  Tell us about your event and we'll connect you with the right judges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Section 1: Organizer Info */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Organizer Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="organizerName">Your Full Name *</Label>
                        <Input
                          id="organizerName"
                          required
                          value={formData.organizerName}
                          onChange={(e) => handleInputChange('organizerName', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="organizerEmail">Your Email *</Label>
                        <Input
                          id="organizerEmail"
                          type="email"
                          required
                          value={formData.organizerEmail}
                          onChange={(e) => handleInputChange('organizerEmail', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="organizationName">Organization Name *</Label>
                        <Input
                          id="organizationName"
                          required
                          value={formData.organizationName}
                          onChange={(e) => handleInputChange('organizationName', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="organizerRole">Your Role</Label>
                        <Input
                          id="organizerRole"
                          placeholder="e.g. Campus Lead, Developer Relations, etc"
                          value={formData.organizerRole}
                          onChange={(e) => handleInputChange('organizerRole', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="organizerWebsite">Website / LinkedIn</Label>
                      <Input
                        id="organizerWebsite"
                        type="url"
                        placeholder="https://..."
                        value={formData.organizerWebsite}
                        onChange={(e) => handleInputChange('organizerWebsite', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Section 2: Hackathon Details */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Hackathon Details
                    </h3>
                    
                    <div>
                      <Label htmlFor="hackathonName">Name of Your Hackathon *</Label>
                      <Input
                        id="hackathonName"
                        required
                        value={formData.hackathonName}
                        onChange={(e) => handleInputChange('hackathonName', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="hackathonWebsite">Link to Hackathon Website / Devpost / Tally Page *</Label>
                      <Input
                        id="hackathonWebsite"
                        type="url"
                        required
                        placeholder="https://..."
                        value={formData.hackathonWebsite}
                        onChange={(e) => handleInputChange('hackathonWebsite', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="platform">Platform *</Label>
                      <Select value={formData.platform} onValueChange={(value) => handleInputChange('platform', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="devpost">Devpost</SelectItem>
                          <SelectItem value="dorahacks">DoraHacks</SelectItem>
                          <SelectItem value="notion">Notion</SelectItem>
                          <SelectItem value="tally">Tally</SelectItem>
                          <SelectItem value="custom">Custom Website</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="hackathonDates">Dates of the Hackathon *</Label>
                        <Input
                          id="hackathonDates"
                          required
                          placeholder="e.g. Jan 15-17, 2025"
                          value={formData.hackathonDates}
                          onChange={(e) => handleInputChange('hackathonDates', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="judgeDeadline">Deadline for Judges to Confirm *</Label>
                        <Input
                          id="judgeDeadline"
                          required
                          placeholder="e.g. Jan 10, 2025"
                          value={formData.judgeDeadline}
                          onChange={(e) => handleInputChange('judgeDeadline', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Event Format *</Label>
                      <div className="mt-2 space-y-2">
                        {['Fully Async', 'Fully Live', 'Hybrid'].map((format) => (
                          <div key={format} className="flex items-center space-x-2">
                            <Checkbox
                              id={format}
                              checked={formData.eventFormat.includes(format)}
                              onCheckedChange={(checked) => handleArrayChange('eventFormat', format, checked as boolean)}
                            />
                            <Label htmlFor={format} className="text-sm font-normal">{format}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="participantCount">Expected Number of Participants *</Label>
                        <Input
                          id="participantCount"
                          required
                          placeholder="e.g. 200-300"
                          value={formData.participantCount}
                          onChange={(e) => handleInputChange('participantCount', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="isFirstTime">Is This a First-Time Hackathon? *</Label>
                        <Select value={formData.isFirstTime} onValueChange={(value) => handleInputChange('isFirstTime', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Theme & Domains */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Theme & Domains
                    </h3>
                    
                    <div>
                      <Label htmlFor="theme">What's the theme or title of this hackathon? *</Label>
                      <Input
                        id="theme"
                        required
                        placeholder="e.g. AI for Good, Web3 Innovation, etc."
                        value={formData.theme}
                        onChange={(e) => handleInputChange('theme', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Which domains will be judged? *</Label>
                      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                        {['AI/ML', 'Web Development', 'Product', 'Design', 'Blockchain', 'Fintech', 'EdTech', 'Game Dev', 'Other'].map((domain) => (
                          <div key={domain} className="flex items-center space-x-2">
                            <Checkbox
                              id={domain}
                              checked={formData.domains.includes(domain)}
                              onCheckedChange={(checked) => handleArrayChange('domains', domain, checked as boolean)}
                            />
                            <Label htmlFor={domain} className="text-sm font-normal">{domain}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="eventSummary">Brief Summary of the Event *</Label>
                      <Textarea
                        id="eventSummary"
                        required
                        placeholder="3-5 lines about what makes it special, who it's for, anything we should know..."
                        value={formData.eventSummary}
                        onChange={(e) => handleInputChange('eventSummary', e.target.value)}
                        className="mt-1"
                        rows={4}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="needMentors">Do You Need Mentors As Well? *</Label>
                        <Select value={formData.needMentors} onValueChange={(value) => handleInputChange('needMentors', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="maybe">Maybe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="hasExistingJudges">Do You Have Any Judges Already Onboarded? *</Label>
                        <Select value={formData.hasExistingJudges} onValueChange={(value) => handleInputChange('hasExistingJudges', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="inprogress">In Progress</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Logistics */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Logistics
                    </h3>
                    
                    <div>
                      <Label className="text-sm font-medium">What Deliverables Will You Provide to Judges? *</Label>
                      <div className="mt-2 space-y-2">
                        {['Certificate', 'Official Letter of Invite', 'Judge Page Mention', 'Post on LinkedIn or Website', 'Not Sure Yet'].map((deliverable) => (
                          <div key={deliverable} className="flex items-center space-x-2">
                            <Checkbox
                              id={deliverable}
                              checked={formData.deliverables.includes(deliverable)}
                              onCheckedChange={(checked) => handleArrayChange('deliverables', deliverable, checked as boolean)}
                            />
                            <Label htmlFor={deliverable} className="text-sm font-normal">{deliverable}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="judgeCount">How Many Judges Do You Need? *</Label>
                      <Input
                        id="judgeCount"
                        required
                        placeholder="e.g. 5-7 judges"
                        value={formData.judgeCount}
                        onChange={(e) => handleInputChange('judgeCount', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="timeCommitment">What Is the Expected Time Commitment? *</Label>
                      <Input
                        id="timeCommitment"
                        required
                        placeholder="e.g. Review 15 projects asynchronously over 48 hrs"
                        value={formData.timeCommitment}
                        onChange={(e) => handleInputChange('timeCommitment', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Section 5: Final Notes */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Final Notes
                    </h3>
                    
                    <div>
                      <Label htmlFor="whyJudgeBase">Why Do You Want to Use JudgeBase?</Label>
                      <Textarea
                        id="whyJudgeBase"
                        placeholder="Optional - tell us why you're interested in our platform..."
                        value={formData.whyJudgeBase}
                        onChange={(e) => handleInputChange('whyJudgeBase', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="additionalNotes">Anything Else We Should Know?</Label>
                      <Textarea
                        id="additionalNotes"
                        placeholder="Optional - any additional context or special requirements..."
                        value={formData.additionalNotes}
                        onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: checked as boolean }))}
                      />
                      <Label htmlFor="consent" className="text-sm">
                        I understand that my event will be reviewed manually before being granted access to the judge list. *
                      </Label>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg"
                  >
                    {mutation.isPending ? 'Submitting...' : 'Submit Hackathon Request'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* What Happens Next */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 text-center">
                  What Happens After You Submit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                    <p>Your request is reviewed by the JudgeBase team.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                    <p>If approved, you'll get a private link to /judges with access to our panel.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                    <p>You'll be asked to confirm deliverables for the judges.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                    <p>From there, we'll start shortlisting based on your theme and format.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Final CTA */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
              <CardContent className="py-8">
                <h2 className="text-2xl font-bold mb-4">
                  Build your panel the right way.
                </h2>
                <p className="text-lg mb-6">
                  No scraping. No random invites. Just handpicked talent.
                </p>
                <Button 
                  onClick={scrollToForm}
                  variant="secondary"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg"
                >
                  Submit Your Event
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}