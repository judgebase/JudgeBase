import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Hackathon } from "@shared/schema";

interface HackathonPasswordDisplayProps {
  hackathon: Hackathon;
  password: string;
  isOpen: boolean;
  onClose: () => void;
}

export function HackathonPasswordDisplay({ hackathon, password, isOpen, onClose }: HackathonPasswordDisplayProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to clipboard`,
    });
  };

  const sendCredentialsEmail = () => {
    const subject = `JudgeBase - Your Hackathon Dashboard Access`;
    const body = `Hi ${hackathon.organizerName},

Your hackathon "${hackathon.name}" has been approved! You can now access your organizer dashboard to manage judge applications.

Login Details:
- Dashboard URL: ${window.location.origin}/hackathons
- Email: ${hackathon.organizerEmail}
- Password: ${password}

Use these credentials to:
• View judges interested in your hackathon
• Accept or reject judge applications
• Contact judges directly via email
• Track your hackathon's judge recruitment progress

Best regards,
The JudgeBase Team`;

    const mailtoLink = `mailto:${hackathon.organizerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Hackathon Approved!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">Dashboard Access Created</h4>
            <p className="text-sm text-green-700">
              The hackathon "{hackathon.name}" has been approved and credentials have been generated for the organizer dashboard.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="hackathon-name">Hackathon</Label>
              <div className="flex gap-2">
                <Input 
                  id="hackathon-name"
                  value={hackathon.name}
                  readOnly 
                  className="bg-gray-50"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(hackathon.name, "Hackathon name")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="organizer-email">Organizer Email</Label>
              <div className="flex gap-2">
                <Input 
                  id="organizer-email"
                  value={hackathon.organizerEmail}
                  readOnly 
                  className="bg-gray-50"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(hackathon.organizerEmail, "Email")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="hackathon-password">Generated Password</Label>
              <div className="flex gap-2">
                <Input 
                  id="hackathon-password"
                  value={password}
                  readOnly 
                  className="bg-gray-50 font-mono"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(password, "Password")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="dashboard-url">Dashboard URL</Label>
              <div className="flex gap-2">
                <Input 
                  id="dashboard-url"
                  value={`${window.location.origin}/hackathons`}
                  readOnly 
                  className="bg-gray-50"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(`${window.location.origin}/hackathons`, "Dashboard URL")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={sendCredentialsEmail} className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Email Credentials
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>

          <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded">
            <strong>Next Steps:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Email the credentials to the organizer</li>
              <li>• They can login at /hackathons to manage judge applications</li>
              <li>• Judges can express interest, organizers can accept/reject</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}