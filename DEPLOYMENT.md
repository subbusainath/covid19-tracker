# COVID-19 Tracker - GitHub Pages Deployment Guide

## 🚀 Quick Deployment Steps

### Prerequisites
- GitHub account
- Git installed on your machine
- Node.js and npm installed

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `covid19-tracker` (or any name you prefer)
3. Make it **public** (required for free GitHub Pages)
4. Don't initialize with README, .gitignore, or license (we already have these)

### 2. Connect Local Project to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: COVID-19 Tracker with modern UI"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/covid19-tracker.git

# Push to GitHub
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` with your actual GitHub username!

### 3. Update Base URL (if needed)

If your repository name is different from `covid19-tracker`, update the base URL in `vite.config.js`:

```javascript
// Replace 'covid19-tracker' with your actual repository name
base: '/your-repo-name/',
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically trigger on your next push

### 5. Deploy Your App

#### Option A: Automatic Deployment (Recommended)
Every time you push to the main branch, GitHub Actions will automatically build and deploy your app.

```bash
# Make any changes to your code
git add .
git commit -m "Update: your changes description"
git push origin main
```

#### Option B: Manual Deployment
```bash
# Build and deploy manually
npm run deploy
```

### 6. Access Your Deployed App

After deployment (usually takes 2-5 minutes), your app will be available at:
```
https://YOUR_USERNAME.github.io/covid19-tracker/
```

## 🔧 Configuration Details

### Vite Configuration
- **Base URL**: Set to `/covid19-tracker/` for GitHub Pages
- **Build Optimization**: Code splitting for better performance
- **Minification**: Using Terser for smaller bundle sizes

### GitHub Actions Workflow
- **Triggers**: Automatic on push to main branch
- **Node.js Version**: 18 (LTS)
- **Build Process**: npm ci → npm run build → deploy
- **Permissions**: Configured for GitHub Pages deployment

## 📦 Build Output
The build creates optimized chunks:
- **vendor.js**: React and React DOM
- **mui.js**: Material-UI components
- **charts.js**: Chart.js and react-chartjs-2
- **maps.js**: Leaflet and react-leaflet
- **index.js**: Your app code

## 🐛 Troubleshooting

### Common Issues

1. **404 Error on Deployment**
   - Check if the base URL in `vite.config.js` matches your repository name
   - Ensure GitHub Pages is enabled in repository settings

2. **Build Fails**
   - Run `npm install` to ensure all dependencies are installed
   - Check if there are any TypeScript or linting errors

3. **API Calls Not Working**
   - The COVID-19 API (disease.sh) should work fine with HTTPS
   - Check browser console for any CORS issues

4. **Map Not Loading**
   - Leaflet CSS should be included automatically
   - Check if all map dependencies are properly installed

### Useful Commands

```bash
# Test build locally
npm run build

# Preview built app locally
npm run preview

# Check for dependency issues
npm audit

# Update dependencies
npm update
```

## 🎯 Performance Tips

1. **Lazy Loading**: Components are already optimized with code splitting
2. **Image Optimization**: Consider using WebP format for better compression
3. **Caching**: GitHub Pages automatically handles caching headers
4. **Bundle Analysis**: Use `npm run build` to see chunk sizes

## 🔄 Updating Your App

1. Make changes to your code
2. Test locally with `npm run dev`
3. Commit and push changes
4. GitHub Actions will automatically deploy the updates

## 📊 Monitoring

- **GitHub Actions**: Check the Actions tab for deployment status
- **Performance**: Use browser dev tools to monitor loading times
- **Analytics**: Consider adding Google Analytics for usage tracking

---

**Your COVID-19 Tracker is now ready for the world! 🌍**

Live URL: `https://YOUR_USERNAME.github.io/covid19-tracker/` 