# Adding a Judge to JudgeBase - Complete Guide

This guide will walk you through the process of adding a new judge to the JudgeBase platform. Follow these steps carefully to ensure proper integration.

## Overview

Adding a judge involves:
1. Adding judge data to the server storage
2. Creating a profile image/avatar (optional)
3. Updating the judge's status and featured status
4. Testing the judge profile page

## Step-by-Step Guide

### 1. Add Judge Data to Server Storage

**File to edit:** `server/index.ts`

Look for the development section where judges are created (around line 45-100). Add your new judge data in the same format:

```typescript
await storage.createJudge({
  name: 'Judge Full Name',
  title: 'Job Title',
  company: 'Company Name',
  location: 'City, State/Country',
  bio: 'Detailed bio about the judge. This can be multiple paragraphs describing their background, achievements, and experience. Keep it engaging and professional.',
  judgingPhilosophy: 'Describe their judging philosophy. What do they look for in projects? What criteria do they use? This helps participants understand what to expect.',
  linkedin: 'https://linkedin.com/in/username',
  twitter: 'https://twitter.com/username', // Can be empty string if not available
  website: 'https://judgewebsite.com',
  avatar: null, // Set to null for now, or path to image file
  expertise: ['Skill 1', 'Skill 2', 'Skill 3'], // Array of expertise areas
  experience: 'Brief summary of their professional experience and achievements',
  slug: 'judge-url-slug', // URL-friendly version of name (lowercase, hyphens)
  status: 'approved', // 'pending', 'approved', or 'rejected'
  featured: true, // true to show on homepage, false to hide
  badges: ['Badge 1', 'Badge 2'], // Array of achievement badges
});
```

### 2. Required Fields Explanation

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Judge's full name | "Sarah Chen" |
| `title` | Professional title | "Senior Product Manager" |
| `company` | Current company | "Google" |
| `location` | City and country | "San Francisco, CA" |
| `bio` | Detailed biography (2-3 paragraphs) | "Sarah is a passionate..." |
| `judgingPhilosophy` | Judging approach and criteria | "I focus on user impact..." |
| `linkedin` | LinkedIn profile URL | "https://linkedin.com/in/sarahchen" |
| `twitter` | Twitter profile URL (optional) | "https://twitter.com/sarahchen" |
| `website` | Personal website URL | "https://sarahchen.dev" |
| `avatar` | Profile image path (optional) | null or "/images/sarah-chen.jpg" |
| `expertise` | Array of skill areas | ["AI/ML", "Product Management"] |
| `experience` | Professional experience summary | "8 years in product management" |
| `slug` | URL-friendly identifier | "sarah-chen" |
| `status` | Approval status | "approved" |
| `featured` | Show on homepage | true |
| `badges` | Achievement badges | ["AI Expert", "Product Leader"] |

### 3. Creating the Judge Slug

The slug is used in the URL (e.g., `/judges/sarah-chen`). Follow these rules:
- Use lowercase letters only
- Replace spaces with hyphens
- Remove special characters
- Keep it short but descriptive
- Ensure uniqueness

Examples:
- "Sarah Chen" → "sarah-chen"
- "Dr. John Smith III" → "john-smith"
- "Maria Rodriguez-García" → "maria-rodriguez-garcia"

### 4. Adding Profile Images (Optional)

If you have a profile image:

1. **Add image to project:**
   - Place the image in the `uploads/` directory
   - Name it descriptively (e.g., `sarah-chen-profile.jpg`)
   - Recommended: 400x400px, JPG/PNG format

2. **Update avatar field:**
   ```typescript
   avatar: '/uploads/sarah-chen-profile.jpg',
   ```

### 5. Judge Status Options

- **`pending`**: Judge application is under review
- **`approved`**: Judge is approved and can appear on site
- **`rejected`**: Judge application was declined

### 6. Featured Status

- **`featured: true`**: Judge appears on homepage in "Featured Judges" section
- **`featured: false`**: Judge has profile page but doesn't appear on homepage

### 7. Expertise Areas

Common expertise categories:
- **Technical**: "Full Stack", "Frontend", "Backend", "Mobile", "AI/ML", "DevOps", "Blockchain"
- **Business**: "Product Management", "UX Design", "Marketing", "Sales", "Strategy"
- **Industry**: "FinTech", "HealthTech", "EdTech", "Gaming", "E-commerce"
- **Leadership**: "CTO", "Startup Founder", "Team Leadership", "Mentoring"

### 8. Badge Examples

Common judge badges:
- **Expertise**: "AI Expert", "Blockchain Expert", "UX Expert"
- **Leadership**: "Tech Leader", "Startup Mentor", "Industry Expert"
- **Achievement**: "Top Judge", "Rising Star", "Community Favorite"
- **Special**: "Founder's Pick", "Hall of Fame", "Guest Judge"

### 9. Testing Your New Judge

After adding a judge:

1. **Restart the server:**
   ```bash
   npm run dev
   ```

2. **Test the API endpoint:**
   ```bash
   curl http://localhost:5000/api/judges/featured
   ```

3. **Check the judge profile:**
   - Navigate to `/judges/your-judge-slug`
   - Verify all information displays correctly
   - Test the social media links

4. **Verify homepage display:**
   - Check that featured judges appear on homepage
   - Ensure profile cards render properly

### 10. Common Issues and Solutions

**Issue: Judge not appearing on homepage**
- Solution: Ensure `featured: true` and `status: 'approved'`

**Issue: Profile page shows 404**
- Solution: Check that the slug is unique and URL-friendly

**Issue: Image not displaying**
- Solution: Verify image path and that file exists in uploads folder

**Issue: Broken social links**
- Solution: Ensure URLs include `https://` prefix

### 11. Example: Complete Judge Entry

```typescript
await storage.createJudge({
  name: 'Alex Thompson',
  title: 'VP of Engineering',
  company: 'Stripe',
  location: 'Seattle, WA',
  bio: 'Alex is a seasoned engineering leader with over 12 years of experience building scalable systems at companies like Stripe, Uber, and Microsoft. He specializes in distributed systems, payment infrastructure, and team leadership.\n\nAlex has been actively involved in the startup ecosystem as both a founder and advisor. He founded two successful startups and has mentored over 50 early-stage companies through various accelerator programs.',
  judgingPhilosophy: 'I evaluate projects based on three key criteria: technical innovation, scalability potential, and real-world impact. I believe the best hackathon projects solve actual problems and demonstrate clear thinking about implementation challenges.',
  linkedin: 'https://linkedin.com/in/alexthompson',
  twitter: 'https://twitter.com/alexthompson',
  website: 'https://alexthompson.dev',
  avatar: '/uploads/alex-thompson-profile.jpg',
  expertise: ['Distributed Systems', 'Payment Infrastructure', 'Team Leadership', 'Startup Scaling'],
  experience: 'VP of Engineering at Stripe, Former CTO at two successful startups, 12+ years in engineering leadership',
  slug: 'alex-thompson',
  status: 'approved',
  featured: true,
  badges: ['Engineering Leader', 'Startup Mentor', 'Payments Expert'],
});
```

### 12. Deployment Notes

After adding judges locally:

1. **Test thoroughly** in development environment
2. **Commit changes** to your repository
3. **Deploy to production** (Netlify or your hosting provider)
4. **Verify** judge profiles work on live site

### 13. Database Schema Reference

The judge data structure is defined in `shared/schema.ts`:

```typescript
export const judges = pgTable('judges', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  company: text('company').notNull(),
  location: text('location').notNull(),
  bio: text('bio').notNull(),
  judgingPhilosophy: text('judging_philosophy').notNull(),
  linkedin: text('linkedin').notNull(),
  twitter: text('twitter').notNull(),
  website: text('website').notNull(),
  avatar: text('avatar'),
  expertise: text('expertise').array().notNull(),
  experience: text('experience').notNull(),
  slug: text('slug').notNull().unique(),
  status: text('status').notNull().default('pending'),
  featured: boolean('featured').default(false),
  badges: text('badges').array().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

This ensures type safety and proper database structure.

## Summary

Adding a judge requires:
1. Adding judge data to `server/index.ts`
2. Setting proper slug, status, and featured flags
3. Testing the judge profile page
4. Deploying changes to production

Follow this guide carefully and your new judge will be properly integrated into the JudgeBase platform!