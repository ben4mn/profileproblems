import React, { useState } from 'react';
import FlowDiagram from './components/FlowDiagram.jsx';
import SystemModel3D from './components/SystemModel3D.jsx';
import ScenarioSimulator from './components/ScenarioSimulator.jsx';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <header className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold text-gray-800">CPR Architecture Visualization Suite</h1>
        <p className="text-gray-600 mt-2">Interactive visualization of traveler profile synchronization system</p>
      </header>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button 
            className={`py-2 px-4 font-medium mr-4 ${activeTab === 0 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab(0)}
          >
            2D Flow Diagram
          </button>
          <button 
            className={`py-2 px-4 font-medium mr-4 ${activeTab === 1 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab(1)}
          >
            3D System Model
          </button>
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 2 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab(2)}
          >
            Profile Update Simulator
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        {activeTab === 0 && <FlowDiagram />}
        {activeTab === 1 && <SystemModel3D />}
        {activeTab === 2 && <ScenarioSimulator />}
      </div>
      
      <footer className="mt-8 text-center text-gray-600 text-sm">
        <p>CPR Architecture Visualization Suite • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;
