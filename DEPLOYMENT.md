# Deployment Guide for Local Food Truck App on Vercel

## Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **MongoDB Atlas** - Set up a cloud MongoDB database
4. **Stripe Account** - For payment processing

## Step 1: Prepare Your MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster (free tier available)
3. Create a database user with read/write permissions
4. Whitelist IP addresses (0.0.0.0/0 for Vercel)
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/localfoodtruck`

## Step 2: Set Up Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Import your GitHub repository
3. In Project Settings → Environment Variables, add:

### Production Environment Variables:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/localfoodtruck
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
NODE_ENV=production
PORT=5380
FRONTEND_URL=https://your-app-name.vercel.app
```

## Step 3: Update Frontend API URLs

Create a `.env.production` file in your project root:

```env
VITE_API_URL=https://your-app-name.vercel.app/api/items
VITE_ORDERS_URL=https://your-app-name.vercel.app/api/orders
VITE_FAVORITES_URL=https://your-app-name.vercel.app/api/favorites
VITE_REVIEWS_URL=https://your-app-name.vercel.app/api/reviews
```

## Step 4: Deploy to Vercel

### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
5. Add environment variables
6. Deploy

## Step 5: Post-Deployment Setup

1. **Update Stripe Webhook URLs** (if using):
   - Add `https://your-app-name.vercel.app/api/webhooks/stripe`

2. **Test Your Application**:
   - Visit your deployed URL
   - Test menu loading, cart functionality, and payments
   - Check browser console for any API errors

3. **Set Up Custom Domain** (optional):
   - In Vercel dashboard → Domains
   - Add your custom domain

## Troubleshooting Common Issues

### 1. API Calls Failing
- Check environment variables are set correctly
- Ensure CORS is configured for your Vercel domain
- Verify MongoDB connection string

### 2. Build Errors
- Run `npm run build` locally first
- Check for missing dependencies
- Ensure all import paths are correct

### 3. 500 Server Errors
- Check Vercel function logs
- Verify environment variables
- Test MongoDB connection

### 4. Assets Not Loading
- Ensure static assets are in `public/` directory
- Check asset paths in your code
- Verify Vite build configuration

## Monitoring and Maintenance

1. **Check Vercel Analytics** for performance metrics
2. **Monitor Function Logs** for backend errors
3. **Set up Uptime Monitoring** for production
4. **Regular Database Backups** from MongoDB Atlas

## Development vs Production

### Local Development:
```bash
# Frontend
npm run dev

# Backend (separate terminal)
cd backend
npm run dev
```

### Production:
- Frontend: Automatically built and served by Vercel
- Backend: Runs as Vercel serverless functions
- Database: MongoDB Atlas cloud database

## Security Considerations

1. Use environment variables for all secrets
2. Enable MongoDB IP whitelist in production
3. Use HTTPS-only cookies for authentication
4. Implement rate limiting for APIs
5. Validate all user inputs
6. Use Stripe in live mode for production

Your food truck app should now be successfully deployed on Vercel! 🚚🍔
