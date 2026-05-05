# Velocita VCE Platform - Deployment Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com and sign in
2. Click "New repository" 
3. Repository name: `velocita`
4. Description: `Premium VCE tutoring platform for Melbourne students`
5. Set as Public
6. Do NOT initialize with README (we already have one)
7. Click "Create repository"

## Step 2: Push Code to GitHub

Run these commands in your terminal from the `/Users/admin/CascadeProjects/Tutor/ascend` directory:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/velocita.git

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to https://vercel.com and sign in with your GitHub account
2. Click "New Project"
3. Import the `velocita` repository from GitHub
4. Vercel will automatically detect it's a Next.js project
5. Click "Deploy"

## Step 4: Set Environment Variables on Vercel

1. After deployment, go to your project dashboard on Vercel
2. Click "Settings" tab
3. Click "Environment Variables"
4. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://htqldlyejnloaiwkgirj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_CJEUGaNckNlL9YrZh43biw_Nr1grV-r
```

5. Click "Save"
6. Redeploy the project (Vercel will prompt you)

## Step 5: Verify Deployment

Your live Velocita VCE platform will be available at:
- Primary URL: `https://velocita.vercel.app`
- Custom domain can be added later

## Features Deployed

✅ Complete 5-step ATAR diagnostic tool
✅ Responsive design for mobile and desktop
✅ Velocita branding with gold theme
✅ Supabase integration for data storage
✅ Google Fonts (Playfair Display, DM Sans)
✅ Progress tracking and validation
✅ ATAR prediction algorithm
✅ Email capture and results display

## Environment Variables Needed

Make sure these are set in your `.env.local` file and on Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=https://htqldlyejnloaiwkgirj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_CJEUGaNckNlL9YrZh43biw_Nr1grV-r
```

## Git Commit History

Your project has 6 savepoint commits:
- SAVEPOINT 1: Working diagnostic Step 1 with gold styling
- SAVEPOINT 2: Step 1 complete with Next button and gold styling  
- SAVEPOINT 3: Steps 1-4 navigating correctly
- SAVEPOINT 4: Study Habits step complete with Next button and gold sliders
- SAVEPOINT 5: Results page working with ATAR prediction and both CTAs
- SAVEPOINT 6: Results page polished and logo added
