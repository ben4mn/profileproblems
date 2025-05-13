# Telecom System Visualization Suite

This project creates an interactive visualization suite for a complex voice and telephone caller identification system. It helps stakeholders understand the system architecture through multiple visualization approaches.

🔗 **Live Demo**: [https://ben4mn.github.io/profileproblems/](https://ben4mn.github.io/profileproblems/)

## Features

- **Interactive 2D Flow Diagram**: Explore system components with expandable nodes
- **3D System Model**: Visualize the system architecture in three dimensions (placeholder for implementation)
- **Scenario Simulator**: Test different caller scenarios and see how they flow through the system

## Technologies Used

- **React**: Frontend UI framework
- **Vite**: Modern frontend build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icons component library 
- **Three.js**: 3D visualization (ready for implementation)

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Local Development

1. Clone this repository
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

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
profileproblems/
├── src/
│   ├── components/           # React components 
│   │   ├── FlowDiagram.jsx   # 2D interactive flow diagram
│   │   ├── SystemModel3D.jsx # 3D visualization (placeholder)
│   │   └── ScenarioSimulator.jsx # Simulator for call scenarios
│   ├── data/
│   │   └── systemData.js     # Data model for system components
│   ├── App.jsx               # Main component with tab navigation
│   ├── main.jsx              # Entry point
│   └── App.css               # Global styles
├── public/                   # Static assets
└── .github/workflows/        # GitHub Actions deployment
```

## Deployment

This project is deployed on GitHub Pages. The deployment is automated through GitHub Actions.

### How the Deployment Works

1. Push changes to the `main` branch
2. GitHub Actions workflow automatically:
   - Builds the project with `npm run build`
   - Deploys the `dist` directory to the `gh-pages` branch
3. GitHub Pages serves the content from the `gh-pages` branch

### Manual Deployment

If needed, you can manually deploy by running:

```bash
# Build the site
npm run build

# Deploy to GitHub Pages (requires push access)
npm run deploy
```

### Updating the Deployment

To modify the GitHub Pages deployment:

1. Edit the workflow file: `.github/workflows/simple-deploy.yml`
2. Push changes to the `main` branch
3. The changes will be automatically deployed

## Extending the System

### Adding New Components

To add new components to the telecom system, edit the `systemComponents` object in `src/data/systemData.js`. Each component should have:

- `id`: Unique identifier
- `type`: Component type (entry, process, storage, decision, endpoint)
- `name`: Display name
- `icon`: Icon to display (from Lucide React)
- `connections`: Array of IDs this component connects to
- `description`: Text description of the component's purpose
- `position`: Coordinates for positioning in visualizations

### Implementing the 3D Model

The current 3D model view is a placeholder. To implement the actual 3D visualization:

1. Study the Three.js documentation (https://threejs.org/)
2. Update the `SystemModel3D.jsx` component to:
   - Create a scene, camera, and renderer
   - Represent each component as a 3D object with appropriate materials
   - Add controls for camera movement and interaction
   - Implement connections between components as 3D lines or tubes

## Troubleshooting

### Node.js Version Issues

If you encounter issues with Node.js versions:

```bash
# For development
set NODE_OPTIONS=--openssl-legacy-provider
npm run dev

# For build
set NODE_OPTIONS=--openssl-legacy-provider
npm run build
```

### Dependency Issues

If you have issues with dependencies:

```bash
npm cache clean --force
del package-lock.json
npm install --legacy-peer-deps
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Lucide Icons: https://lucide.dev/
- Three.js: https://threejs.org/
- Tailwind CSS: https://tailwindcss.com/
- Vite: https://vitejs.dev/
