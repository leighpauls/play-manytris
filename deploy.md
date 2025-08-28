# GitHub Pages Deployment Guide

## Step-by-Step Deployment

### 1. Create GitHub Repository
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit: WASM game hosting setup"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

### 3. Upload Your Game Files
```bash
# Add your WASM game files
cp your-game.wasm ./
cp your-game.js ./
cp your-game.html ./game.html  # Optional: rename for clarity
cp -r your-assets/ ./assets/   # Copy asset folder

# Commit and push
git add .
git commit -m "Add WASM game files"
git push
```

### 4. Access Your Game
Your game will be available at:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Alternative: Using GitHub Web Interface

1. **Upload files directly**:
   - Go to your repository
   - Click **Add file** → **Upload files**
   - Drag and drop your WASM game files
   - Commit changes

2. **Enable Pages** (same as above)

## Verification Checklist

- [ ] Repository is public (required for free GitHub Pages)
- [ ] `.wasm` files are uploaded and visible in repository
- [ ] GitHub Pages is enabled in repository settings
- [ ] Site builds successfully (check Actions tab)
- [ ] Game loads at the GitHub Pages URL

## Common Issues

**404 Error**: Wait 5-10 minutes after enabling Pages
**WASM not loading**: Check browser console for MIME type errors
**Build failed**: Check that all files are properly committed

## Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file with your domain
2. Configure DNS to point to `YOUR_USERNAME.github.io`
3. Enable HTTPS in Pages settings
