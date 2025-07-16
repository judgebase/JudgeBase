import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Eye, EyeOff, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JudgePasswordDisplayProps {
  judge: any;
  password: string;
  onClose: () => void;
}

export function JudgePasswordDisplay({ judge, password, onClose }: JudgePasswordDisplayProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: 'Password Copied',
      description: 'The password has been copied to your clipboard.',
    });
  };

  const copyCredentials = () => {
    const credentials = `JudgeBase Login Credentials\n\nEmail: ${judge.email}\nPassword: ${password}\n\nLogin at: ${window.location.origin}/judging`;
    navigator.clipboard.writeText(credentials);
    toast({
      title: 'Credentials Copied',
      description: 'Full login credentials have been copied to your clipboard.',
    });
  };

  const sendEmailToJudge = () => {
    const subject = encodeURIComponent('JudgeBase - Your Login Credentials');
    const body = encodeURIComponent(`Hi ${judge.name},\n\nCongratulations! Your application to join JudgeBase has been approved.\n\nYour login credentials:\nEmail: ${judge.email}\nPassword: ${password}\n\nYou can now access the judging dashboard at: ${window.location.origin}/judging\n\nWelcome to the JudgeBase community!\n\nBest regards,\nThe JudgeBase Team`);
    window.open(`mailto:${judge.email}?subject=${subject}&body=${body}`);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-green-600">Judge Approved Successfully!</CardTitle>
        <CardDescription>
          Login credentials have been generated for {judge.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Login Credentials</h3>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-gray-600">Email:</span>
              <div className="font-mono text-sm bg-white p-2 rounded border">
                {judge.email}
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Password:</span>
              <div className="font-mono text-sm bg-white p-2 rounded border flex items-center justify-between">
                <span>{showPassword ? password : '••••••••••••'}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Judge Details</h3>
          <div className="space-y-1 text-sm">
            <p><strong>Name:</strong> {judge.name}</p>
            <p><strong>Slug:</strong> /judges/{judge.slug}</p>
            <p><strong>Status:</strong> <Badge variant="secondary" className="bg-green-100 text-green-800">Approved</Badge></p>
            {judge.featured && <p><strong>Featured:</strong> Yes</p>}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Button onClick={copyPassword} variant="outline">
            <Copy className="h-4 w-4 mr-2" />
            Copy Password
          </Button>
          <Button onClick={copyCredentials} variant="outline">
            <Copy className="h-4 w-4 mr-2" />
            Copy Full Credentials
          </Button>
          <Button onClick={sendEmailToJudge} variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Send Email to Judge
          </Button>
          <Button onClick={onClose} className="mt-4">
            Continue
          </Button>
        </div>

        <div className="text-xs text-gray-500 mt-4">
          <p><strong>Important:</strong> Save these credentials securely. The judge will need them to access the judging dashboard at /judging.</p>
        </div>
      </CardContent>
    </Card>
  );
}