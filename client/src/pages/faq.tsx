import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { HelpCircle, Users, Calendar, Award } from "lucide-react";

export default function FAQ() {
  const faqCategories = [
    {
      title: "For Judges",
      icon: <Users className="h-6 w-6 text-purple-600" />,
      questions: [
        {
          q: "How do I apply to become a judge?",
          a: "Visit our Apply to Judge page and fill out the application form. We'll review your background and expertise, then contact you within 2-3 business days with next steps."
        },
        {
          q: "What qualifications do I need to be a judge?",
          a: "We look for industry professionals with relevant experience in technology, business, or entrepreneurship. This includes CTOs, product managers, founders, senior developers, and domain experts."
        },
        {
          q: "How much time does judging require?",
          a: "Typically 2-4 hours per event, including project review, evaluation, and feedback. We offer flexible scheduling and remote judging options to accommodate your schedule."
        },
        {
          q: "Do I get compensated for judging?",
          a: "While judging is voluntary, we provide recognition, networking opportunities, and sometimes modest honorariums depending on the event size and budget."
        },
        {
          q: "Can I judge remotely?",
          a: "Yes! Many of our hackathons support remote judging. You can evaluate projects via video calls, recorded demos, or asynchronous review."
        }
      ]
    },
    {
      title: "For Organizers",
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      questions: [
        {
          q: "How do I request judges for my hackathon?",
          a: "Use our Find Judges page to submit your event details. We'll match you with qualified judges based on your event's theme, size, and requirements."
        },
        {
          q: "How many judges can I request?",
          a: "We recommend 1 judge per 8-10 teams. For larger events, we can provide additional judges or help you organize multi-stage judging."
        },
        {
          q: "What information do I need to provide?",
          a: "Event details (date, format, theme), number of participants, judging criteria, and any specific expertise requirements. The more details you provide, the better we can match judges."
        },
        {
          q: "How far in advance should I request judges?",
          a: "We recommend requesting judges at least 2-3 weeks before your event. For larger events or specific expertise needs, 4-6 weeks is ideal."
        },
        {
          q: "Is there a cost for judge placement?",
          a: "Our basic matching service is free. Premium services (dedicated support, specific judge requirements, training) may have associated costs."
        }
      ]
    },
    {
      title: "General",
      icon: <HelpCircle className="h-6 w-6 text-green-600" />,
      questions: [
        {
          q: "What makes JudgeBase different from other platforms?",
          a: "We focus on quality over quantity, with a curated network of experienced judges. We provide comprehensive support, flexible scheduling, and maintain high standards for both judges and events."
        },
        {
          q: "How do you ensure judge quality?",
          a: "All judges go through a vetting process including background verification, reference checks, and initial training. We maintain feedback systems and continuous quality monitoring."
        },
        {
          q: "What types of hackathons do you support?",
          a: "We support all types: corporate hackathons, university events, public competitions, virtual hackathons, and specialized domain hackathons (AI, blockchain, healthcare, etc.)."
        },
        {
          q: "How does the matching process work?",
          a: "Our algorithm considers judge expertise, availability, location preferences, and event requirements. We also manually review matches to ensure optimal fit."
        },
        {
          q: "Can I provide feedback about judges or events?",
          a: "Yes! We encourage feedback from both judges and organizers. This helps us improve our matching process and maintain high-quality experiences."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="FAQ - JudgeBase"
        description="Frequently asked questions about JudgeBase. Get answers about becoming a judge, requesting judges, and using our platform."
        keywords="JudgeBase FAQ, hackathon judging questions, judge application, event organization"
      />
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2">
            ❓ FAQ
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about JudgeBase
          </p>
        </div>

        <div className="space-y-8">
          {faqCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.icon}
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                      <AccordionTrigger className="text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center">Still Have Questions?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-gray-700">
                Can't find what you're looking for? We're here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/support">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    Contact Support
                  </Button>
                </Link>
                <Link href="/resources">
                  <Button size="lg" variant="outline">
                    View Resources
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}