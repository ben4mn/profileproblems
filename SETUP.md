# Telecom System Visualization Suite - Setup Guide

## Quickstart

1. **Run the setup script:**
   - Double-click on `setup-and-run.bat` 
   - This will install dependencies and start the development server

2. **Visit the application:**
   - Open your browser to http://localhost:5173
   - You should see the visualization suite running

## Manual Setup

If the setup script doesn't work, follow these steps manually:

1. **Open terminal:** 
   - Press `Win+R`, type `cmd`, and press Enter
   - Navigate to the project folder: `cd C:\Users\ben4m\Documents\ProfileVisualized`

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Start the development server:**
   ```
   npm run dev
   ```

## Troubleshooting

If you encounter issues:

### Node.js Version Issues
```
set NODE_OPTIONS=--openssl-legacy-provider
npm install
npm run dev
```

### Dependency Issues
```
npm cache clean --force
del package-lock.json
npm install --legacy-peer-deps
```

### Start from Scratch
```
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Try with Yarn Instead
```
npm install -g yarn
yarn
yarn dev
```

## Project Structure

- `src/components/` - React components for visualization tabs
  - `FlowDiagram.jsx` - Interactive 2D flow diagram
  - `SystemModel3D.jsx` - 3D visualization (placeholder)
  - `ScenarioSimulator.jsx` - Call scenario simulator
- `src/data/systemData.js` - Data model for the telecom system
- `src/App.jsx` - Main application component
- `index.html` - Entry point for the Vite application

## Customizing the System

To add or modify components in the system:

1. Edit `src/data/systemData.js` to add new components
2. Each component needs:
   - `id`: Unique identifier
   - `type`: Component type (entry, process, storage, decision, endpoint)
   - `name`: Display name
   - `icon`: Icon name (from Lucide icons)
   - `connections`: Array of component IDs this connects to
   - `description`: Text description
   - `position`: Coordinates for visualization {x, y, z}

## Next Development Steps

1. Implement the 3D visualization using Three.js
2. Enhance the scenario simulator with more complex logic
3. Add user authentication for protected access
4. Implement data persistence for saved scenarios
