# Maintenance Guide

This document provides instructions for maintaining and updating the Telecom System Visualization Suite.

## Quick Reference

| Task | Command |
|------|---------|
| Start development server | `npm run dev` |
| Build for production | `npm run build` |
| Deploy to GitHub Pages | Push to `main` branch |

## Repository Information

- **Repository URL**: https://github.com/ben4mn/profileproblems
- **Live Site**: https://ben4mn.github.io/profileproblems/
- **Default Branch**: main
- **Deployment Branch**: gh-pages (automatically updated by GitHub Actions)

## Making Changes

### Development Workflow

1. Clone the repository:
   ```bash
   git clone https://github.com/ben4mn/profileproblems.git
   cd profileproblems
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Make your changes to the code

5. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

6. GitHub Actions will automatically deploy to GitHub Pages

### Updating System Components

To update or add new components to the system visualization:

1. Edit `src/data/systemData.js`
2. Follow the existing structure for components:
   ```javascript
   componentId: {
     id: 'componentId',
     type: 'process', // entry, process, storage, decision, endpoint
     name: 'Component Name',
     icon: 'Server', // from Lucide icons
     connections: ['otherComponentId1', 'otherComponentId2'],
     description: 'What this component does',
     position: { x: 10, y: 5, z: 0 }
   }
   ```

### Adding a New Visualization Tab

To add a new visualization tab:

1. Create a new component in `src/components/`
2. Update `App.jsx` to include the new tab:
   ```jsx
   // Add a new state in the activeTab options
   <button 
     className={`py-2 px-4 font-medium mr-4 ${activeTab === 3 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
     onClick={() => setActiveTab(3)}
   >
     New Tab Name
   </button>

   // Add the component rendering
   {activeTab === 3 && <NewComponent />}
   ```

## Deployment

### Automatic Deployment

The project is set up with GitHub Actions for automatic deployment:

1. Any push to the `main` branch triggers the workflow
2. The workflow builds the site and deploys to the `gh-pages` branch
3. GitHub Pages serves content from the `gh-pages` branch

### Troubleshooting Deployment

If the GitHub Actions deployment fails:

1. Check the Actions tab in the GitHub repository for error messages
2. Verify the workflow file (.github/workflows/simple-deploy.yml) is correct
3. Ensure GitHub Pages is configured to deploy from the gh-pages branch:
   - Go to Settings > Pages
   - Source should be set to "Deploy from a branch"
   - Branch should be set to "gh-pages" and folder to "/ (root)"

### Manual Deployment

If needed, you can manually deploy to GitHub Pages:

1. Add a deploy script to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

2. Install gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

## Updating Dependencies

To update project dependencies to their latest versions:

1. Check for outdated packages:
   ```bash
   npm outdated
   ```

2. Update packages individually or all at once:
   ```bash
   npm update
   ```

3. For major version updates, install the specific version:
   ```bash
   npm install package-name@latest
   ```

## Best Practices

1. **Version Control**: Always make changes on a feature branch, then merge to main

2. **Testing**: Test all changes locally before pushing to main

3. **Commits**: Use descriptive commit messages that explain the changes

4. **Documentation**: Update documentation when you make significant changes

5. **Dependencies**: Regularly update dependencies to keep the project secure

## Common Issues

1. **Node.js Version Conflicts**: Use `set NODE_OPTIONS=--openssl-legacy-provider` when using Node.js 17+

2. **Build Errors**: Make sure all imports are correct and components exist

3. **Styling Issues**: Check that Tailwind CSS is correctly configured

4. **Deployment Failures**: Check GitHub Actions logs for specific errors
