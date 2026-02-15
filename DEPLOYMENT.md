# GitHub Pages Deployment Guide

This document explains how to enable and configure GitHub Pages for this repository.

## Enabling GitHub Pages

To make the public URL live, you need to enable GitHub Pages in the repository settings:

### Steps to Enable:

1. **Navigate to Repository Settings**
   - Go to your GitHub repository: `https://github.com/spataray/The-Bar-Signage`
   - Click on **Settings** tab

2. **Configure Pages**
   - In the left sidebar, click on **Pages** (under "Code and automation")
   - Under **Source**, select **GitHub Actions** (instead of Deploy from a branch)
   - The workflow in `.github/workflows/deploy.yml` will automatically deploy the site

3. **Wait for Deployment**
   - Once enabled, push to the main/master branch or manually trigger the workflow
   - Go to the **Actions** tab to monitor deployment progress
   - The site will be live at: `https://spataray.github.io/The-Bar-Signage/`

## Manual Deployment

You can also manually trigger a deployment:

1. Go to the **Actions** tab in your repository
2. Click on **Deploy to GitHub Pages** workflow
3. Click **Run workflow** dropdown
4. Select the branch and click **Run workflow**

## Verifying Deployment

Once the workflow completes successfully:

1. Visit: `https://spataray.github.io/The-Bar-Signage/`
2. You should see the Bar-TV Signage Controller application
3. Test the Karaoke Lock and Toggle Ad features

## Troubleshooting

### Site Not Loading

- Check the **Actions** tab for any failed workflows
- Ensure GitHub Pages is enabled in repository settings
- Verify the repository is public (or you have GitHub Pro for private repos)

### 404 Error

- Make sure `index.html` exists in the repository root
- Check that the workflow ran successfully
- Wait a few minutes after the first deployment

### Permission Errors

- Ensure the repository has the correct permissions:
  - Settings > Actions > General > Workflow permissions
  - Select "Read and write permissions"
  - Check "Allow GitHub Actions to create and approve pull requests"

## Custom Domain (Optional)

To use a custom domain:

1. Go to Settings > Pages
2. Add your custom domain under "Custom domain"
3. Configure DNS records as instructed by GitHub
4. Wait for DNS propagation (can take up to 24 hours)

## Automatic Deployments

The workflow is configured to automatically deploy when:
- Changes are pushed to the `main` or `master` branch
- A workflow is manually triggered

No additional steps are needed after the initial setup.
