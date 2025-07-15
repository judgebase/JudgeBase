# Deploying JudgeBase to Netlify

This guide will help you deploy your JudgeBase platform to Netlify.

## Prerequisites

1. A Netlify account (free tier works fine)
2. Your JudgeBase project in a Git repository (GitHub, GitLab, or Bitbucket)

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your code is committed and pushed to a Git repository:

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### 2. Connect to Netlify

1. Log in to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your JudgeBase repository
5. Configure build settings:
   - **Branch to deploy**: `main` (or your default branch)
   - **Build command**: `vite build --config vite.config.ts`
   - **Publish directory**: `dist/public`

### 3. Environment Variables

No environment variables are required for the current setup since we're using in-memory storage.

### 4. Deploy

Click "Deploy site" and Netlify will:
1. Build your site using the build command
2. Deploy to a random subdomain (e.g., `amazing-site-123.netlify.app`)
3. Provide you with a live URL

### 5. Custom Domain (Optional)

To use your own domain:
1. Go to Site settings → Domain management
2. Add your custom domain (e.g., `judgebase.co`)
3. Follow DNS configuration instructions
4. Netlify will automatically provision SSL certificates

## Important Notes

### Current Limitations

- **In-Memory Storage**: The current setup uses in-memory storage, which means:
  - Judge data resets on each deployment
  - No persistence between sessions
  - All data is lost when the function restarts

### For Production Use

To make this production-ready, you'll need to:

1. **Add a Database**: Replace in-memory storage with a real database (PostgreSQL, MongoDB, etc.)
2. **Environment Variables**: Add database connection strings and other secrets
3. **Admin Interface**: Implement proper admin authentication for managing judges

### File Structure After Deployment

```
dist/
├── public/           # Static files served by Netlify
│   ├── index.html
│   ├── assets/
│   └── ...
└── netlify/
    └── functions/
        └── api.js    # Serverless function for API routes
```

## Testing Your Deployment

After deployment, test these endpoints:

1. **Homepage**: `https://your-site.netlify.app/`
2. **API**: `https://your-site.netlify.app/api/judges/featured`
3. **Judge Profile**: `https://your-site.netlify.app/judges/rishulchanana`

## Troubleshooting

### Build Fails

If the build fails, check:
1. All dependencies are in `package.json`
2. TypeScript compiles without errors
3. Build command is correct in `netlify.toml`

### API Not Working

If API endpoints return 404:
1. Check that `netlify/functions/api.ts` exists
2. Verify `netlify.toml` redirects are configured
3. Check function logs in Netlify dashboard

### Judge Data Missing

If no judges appear:
1. Check that `initializeData()` runs in the serverless function
2. Verify judge data is properly formatted
3. Check browser console for API errors

## Updating Your Site

To update your deployed site:

1. Make changes to your code
2. Commit and push to your repository
3. Netlify will automatically rebuild and deploy

## Performance Optimization

For better performance:
1. Enable Netlify's edge functions for global distribution
2. Use Netlify's image optimization for judge avatars
3. Enable caching headers for static assets

## Monitoring

Monitor your site through:
1. Netlify's built-in analytics
2. Function logs in the Netlify dashboard
3. Real User Monitoring (RUM) tools

Your JudgeBase platform is now live and accessible to the world!