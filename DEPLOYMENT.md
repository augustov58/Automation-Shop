# Deployment Guide - Vercel

This guide will help you deploy the AI Automation Shop to Vercel in minutes.

## 🚀 Quick Start - Deploy via Vercel Dashboard (Recommended)

### Step 1: Sign Up / Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub repositories

### Step 2: Import Your Project

1. Once logged in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **"Automation-Shop"** in the list
4. Click **"Import"** next to it

### Step 3: Configure Project (Auto-detected)

Vercel will automatically detect your Next.js project and configure:

- ✅ Framework Preset: **Next.js**
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

**You don't need to change anything!** These settings are perfect.

### Step 4: Deploy

1. Review the settings (should all be correct)
2. Click **"Deploy"** button
3. Wait 1-2 minutes while Vercel builds your site
4. 🎉 **Done!** Your site is live!

### Step 5: View Your Live Site

After deployment completes, you'll see:

- ✅ **Live URL**: `https://automation-shop-xxxx.vercel.app`
- 🎨 **Screenshot preview** of your deployed site
- 📊 **Deployment details** and logs

Click **"Visit"** to see your live website!

---

## 🔧 Alternative: Deploy via Vercel CLI

If you prefer using the command line:

### Install Vercel CLI

```bash
npm i -g vercel
```

### Deploy from Your Project Directory

```bash
# Navigate to your project
cd /path/to/Automation-Shop

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

---

## 🌐 Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to your project dashboard on Vercel
2. Click **"Settings"** → **"Domains"**
3. Enter your custom domain (e.g., `aiautomationshop.com`)
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (~5-10 minutes)
6. ✅ Your site is now on your custom domain!

---

## 🔐 Environment Variables (If Needed)

If your app uses environment variables:

1. Go to your project on Vercel
2. Click **"Settings"** → **"Environment Variables"**
3. Add your variables:
   - `NEXT_PUBLIC_CALENDLY_API_KEY`
   - `NEXT_PUBLIC_ANALYTICS_ID`
   - etc.
4. Redeploy for changes to take effect

---

## 🔄 Automatic Deployments

**Good news:** Vercel automatically deploys when you push to GitHub!

- **Push to main branch** → Automatic production deployment
- **Push to other branches** → Preview deployment with unique URL
- **Pull requests** → Automatic preview deployments

### How It Works

```bash
# Make changes locally
git add .
git commit -m "Update homepage"
git push origin main

# Vercel automatically:
# 1. Detects the push
# 2. Builds your app
# 3. Deploys to production
# ✅ Your site is updated in ~2 minutes!
```

---

## 📊 Monitoring & Analytics

### View Deployment Logs

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Click on any deployment
4. View **Build Logs** and **Function Logs**

### Add Analytics (Optional)

Vercel offers free analytics:

1. Go to your project settings
2. Enable **Vercel Analytics**
3. Track page views, performance, and more

---

## 🐛 Troubleshooting

### Build Fails

**Check build logs:**

1. Go to deployment details
2. Click **"Build Logs"**
3. Look for error messages

**Common fixes:**

- Ensure `package.json` has correct dependencies
- Run `npm run build` locally to test
- Check for TypeScript errors

### Site Not Updating

**Force a new deployment:**

```bash
# Via CLI
vercel --prod --force

# Or via dashboard
# Go to Deployments → Click "..." → Redeploy
```

### Environment Variables Not Working

- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding/changing variables
- Check spelling and naming

---

## 🎯 Deployment Checklist

Before going live, consider updating:

- [ ] Update contact information in `components/Footer.js`
- [ ] Replace placeholder email and phone numbers
- [ ] Add real Calendly links
- [ ] Set up custom domain (optional)
- [ ] Enable Vercel Analytics (optional)
- [ ] Test all links and forms
- [ ] Check mobile responsiveness
- [ ] Run `npm run build` locally to catch errors

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Custom Domains](https://vercel.com/docs/concepts/projects/domains)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 💡 Pro Tips

1. **Preview Deployments**: Every branch gets a unique URL for testing
2. **Instant Rollback**: Easily rollback to previous deployments
3. **Edge Network**: Your site is deployed globally for fast loading
4. **HTTPS Automatic**: SSL certificates are automatically configured
5. **Zero Config**: Vercel auto-detects and configures Next.js

---

## 🆘 Need Help?

- Check [Vercel Status](https://vercel-status.com)
- Visit [Vercel Community](https://github.com/vercel/vercel/discussions)
- Read [Vercel Documentation](https://vercel.com/docs)

---

**Ready to deploy? Go to [vercel.com/new](https://vercel.com/new) and import your project!** 🚀
