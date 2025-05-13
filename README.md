# Telecom System Visualization Suite

This project creates an interactive visualization suite for a complex voice and telephone caller identification system. It helps stakeholders understand the system architecture through multiple visualization approaches.

## Features

- **Interactive 2D Flow Diagram**: Explore system components with expandable nodes
- **3D System Model**: Visualize the system architecture in three dimensions (placeholder for implementation)
- **Scenario Simulator**: Test different caller scenarios and see how they flow through the system

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:
```
npm install
```
or
```
yarn install
```

3. Start the development server:
```
npm start
```
or
```
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

- `src/components/` - React components for each visualization type
- `src/data/` - Data model for the telecom system
- `public/` - Static assets and index.html

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
2. Create a scene, camera, and renderer in the SystemModel3D component
3. Represent each component as a 3D object with appropriate materials
4. Add controls for camera movement and interaction
5. Implement connections between components as 3D lines or tubes

## License

This project is licensed under the MIT License - see the LICENSE file for details.
