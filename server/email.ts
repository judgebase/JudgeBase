import { Resend } from 'resend';
import type { Hackathon, Judge } from '@shared/schema';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export class EmailService {
  private fromEmail = 'noreply@judgebase.com';

  async sendHackathonApprovalEmail(hackathon: Hackathon): Promise<void> {
    if (!resend) {
      console.warn('Email service not configured - RESEND_API_KEY not found');
      return;
    }
    try {
      await resend.emails.send({
        from: this.fromEmail,
        to: hackathon.organizerEmail,
        subject: `🎉 Your hackathon "${hackathon.hackathonName}" has been approved!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #7c3aed; margin-bottom: 20px;">Congratulations! Your hackathon has been approved</h1>
            
            <p>Hi ${hackathon.organizerName},</p>
            
            <p>Great news! Your hackathon <strong>"${hackathon.hackathonName}"</strong> has been approved by the JudgeBase team.</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Event Details:</h3>
              <p><strong>Event:</strong> ${hackathon.hackathonName}</p>
              <p><strong>Organization:</strong> ${hackathon.organizationName}</p>
              <p><strong>Dates:</strong> ${hackathon.hackathonDates}</p>
              <p><strong>Platform:</strong> ${hackathon.platform}</p>
              <p><strong>Expected Participants:</strong> ${hackathon.participantCount}</p>
              <p><strong>Theme:</strong> ${hackathon.theme}</p>
            </div>
            
            <h3 style="color: #374151;">Next Steps:</h3>
            <ul>
              <li>You now have access to our curated panel of expert judges</li>
              <li>You can invite specific judges to your hackathon</li>
              <li>Our judges will provide professional evaluation and mentorship</li>
            </ul>
            
            <p>You can now invite judges to your hackathon through your admin dashboard.</p>
            
            <p>Best regards,<br>
            The JudgeBase Team</p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="font-size: 12px; color: #6b7280;">
              This email was sent from JudgeBase. If you have any questions, please contact us.
            </p>
          </div>
        `
      });
    } catch (error) {
      console.error('Failed to send hackathon approval email:', error);
      throw new Error('Failed to send approval email');
    }
  }

  async sendJudgeInvitationEmail(judge: Judge, hackathon: Hackathon): Promise<void> {
    if (!resend) {
      console.warn('Email service not configured - RESEND_API_KEY not found');
      return;
    }
    try {
      await resend.emails.send({
        from: this.fromEmail,
        to: judge.email,
        subject: `Judge invitation: ${hackathon.hackathonName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #7c3aed; margin-bottom: 20px;">You're invited to judge a hackathon!</h1>
            
            <p>Hi ${judge.name},</p>
            
            <p>You've been invited to judge <strong>"${hackathon.hackathonName}"</strong> - a hackathon that has been approved by JudgeBase.</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Event Details:</h3>
              <p><strong>Event:</strong> ${hackathon.hackathonName}</p>
              <p><strong>Organization:</strong> ${hackathon.organizationName}</p>
              <p><strong>Organizer:</strong> ${hackathon.organizerName}</p>
              <p><strong>Dates:</strong> ${hackathon.hackathonDates}</p>
              <p><strong>Platform:</strong> ${hackathon.platform}</p>
              <p><strong>Theme:</strong> ${hackathon.theme}</p>
              <p><strong>Judge Deadline:</strong> ${hackathon.judgeDeadline}</p>
              <p><strong>Expected Participants:</strong> ${hackathon.expectedParticipants}</p>
              <p><strong>Judging Format:</strong> ${hackathon.judgingFormat}</p>
            </div>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Event Description:</h3>
              <p>${hackathon.description}</p>
            </div>
            
            <h3 style="color: #374151;">What's Expected:</h3>
            <ul>
              <li>Evaluate submissions based on criteria provided</li>
              <li>Provide constructive feedback to participants</li>
              <li>Participate in final judging rounds</li>
              <li>Optional: Mentor teams during the event</li>
            </ul>
            
            <p><strong>Time Commitment:</strong> Approximately ${hackathon.timeCommitment || '2-4 hours'}</p>
            
            <p>If you're interested in participating, please reply to this email or contact the organizer directly.</p>
            
            <p>Best regards,<br>
            The JudgeBase Team</p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="font-size: 12px; color: #6b7280;">
              This invitation was sent through JudgeBase. If you're not interested in judging opportunities, please let us know.
            </p>
          </div>
        `
      });
    } catch (error) {
      console.error('Failed to send judge invitation email:', error);
      throw new Error('Failed to send invitation email');
    }
  }

  async sendBulkJudgeInvitations(judges: Judge[], hackathon: Hackathon): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    for (const judge of judges) {
      try {
        await this.sendJudgeInvitationEmail(judge, hackathon);
        success++;
      } catch (error) {
        console.error(`Failed to send invitation to ${judge.email}:`, error);
        failed++;
      }
    }

    return { success, failed };
  }
}

export const emailService = new EmailService();