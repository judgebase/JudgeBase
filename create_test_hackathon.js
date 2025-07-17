import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function createTestHackathon() {
  console.log('Creating test hackathon...');
  
  try {
    const result = await sql`
      INSERT INTO hackathons (
        name, organizer_name, organizer_email, organizer_phone,
        hackathon_type, participant_count, date, location,
        description, judging_criteria, prizes, 
        judge_deadline, venue_details, schedule_overview,
        is_first_time, theme, domains, event_summary,
        need_mentors, has_existing_judges, deliverables,
        judge_count, time_commitment, why_judge_base,
        additional_notes, status, auth_password
      ) VALUES (
        'Tech Innovation Challenge 2025',
        'Sarah Wilson',
        'sarah@techinnovation.com',
        '+1-555-0123',
        'University Hackathon',
        150,
        '2025-08-15 09:00:00',
        'Stanford University, Palo Alto, CA',
        'A 48-hour hackathon focused on solving real-world problems using emerging technologies like AI, blockchain, and IoT.',
        'Innovation, Technical Implementation, Market Viability, Presentation Quality',
        '$10,000 grand prize, $5,000 second place, $2,500 third place',
        '2025-07-30',
        'Gates Computer Science Building, 353 Jane Stanford Way',
        'Friday 6pm: Opening ceremony and team formation, Saturday: Development and mentoring, Sunday: Final presentations and judging',
        'No',
        'Sustainable Technology Solutions',
        ARRAY['AI/ML', 'Sustainability', 'FinTech', 'HealthTech'],
        'We are hosting our annual hackathon to bring together students and professionals to build innovative solutions for sustainability challenges.',
        'Yes',
        'No',
        ARRAY['Working prototype', 'Business pitch', 'Technical documentation'],
        '8',
        '6-8 hours per judge over the weekend',
        'We want experienced judges who understand both technology and business applications.',
        'We have partnerships with local tech companies and can provide additional mentorship opportunities.',
        'approved',
        'TechHack2025!'
      )
      RETURNING *
    `;
    
    console.log('✅ Test hackathon created successfully:');
    console.log('Email:', result[0].organizer_email);
    console.log('Password:', result[0].auth_password);
    console.log('Hackathon ID:', result[0].id);
    
  } catch (error) {
    console.error('❌ Error creating test hackathon:', error);
  }
}

createTestHackathon();