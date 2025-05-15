import React, { useState } from 'react';
import { Database } from 'lucide-react';
import { systemComponents, typeColors, flowTypes } from '../data/systemData';

const SystemModel3D = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [visualizationMode, setVisualizationMode] = useState('components');
  
  // Filter components by type
  const filteredComponents = selectedType === 'all' 
    ? Object.values(systemComponents)
    : Object.values(systemComponents).filter(comp => comp.type === selectedType);
  
  // Get all component types for filter
  const componentTypes = ['all', ...new Set(Object.values(systemComponents).map(comp => comp.type))];
  
  return (
    <div className="p-4 bg-gray-50 rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-6">3D Profile System Model</h2>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Filter by Type</label>
            <select 
              className="p-2 border rounded"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {componentTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Visualization Mode</label>
            <select 
              className="p-2 border rounded"
              value={visualizationMode}
              onChange={(e) => setVisualizationMode(e.target.value)}
            >
              <option value="components">Component View</option>
              <option value="profileFlow">Profile Flow</option>
              <option value="heatMap">Heat Map (Sync Volume)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Flow Type</label>
            <select className="p-2 border rounded">
              <option value="all">All Flows</option>
              <option value="push">Push Flows</option>
              <option value="pull">Pull Flows</option>
              <option value="transform">Transformation Points</option>
              <option value="error">Error Paths</option>
            </select>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg h-96 flex items-center justify-center">
          <div className="text-white">
            <Database size={48} className="mx-auto mb-4" />
            <p>3D model would render here using Three.js</p>
            <p className="text-sm mt-2 max-w-md mx-auto">
              The full implementation would create a 3D scene showing profile components as nodes in space with connections visualized as the "profile river" flowing between them.
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Rotate View</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Zoom In/Out</button>
          <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Highlight Flow Path</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">Component Details</h3>
          <div className="mb-2">
            <select 
              className="w-full p-2 border rounded"
              value={selectedComponent}
              onChange={(e) => setSelectedComponent(e.target.value)}
            >
              <option value="">Select a component...</option>
              {filteredComponents.map(comp => (
                <option key={comp.id} value={comp.id}>{comp.name}</option>
              ))}
            </select>
          </div>
          
          {selectedComponent && (
            <div className="bg-gray-50 rounded p-3">
              <h4 className="font-bold">{systemComponents[selectedComponent].name}</h4>
              <p className="text-sm mb-2">{systemComponents[selectedComponent].description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Type:</span>{' '}
                  <span className="capitalize">{systemComponents[selectedComponent].type}</span>
                </div>
                <div>
                  <span className="font-medium">Flow:</span>{' '}
                  <span className="capitalize">{systemComponents[selectedComponent].flowType || 'push'}</span>
                </div>
                {systemComponents[selectedComponent].isMasterOfRecord && (
                  <div className="col-span-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                      Master of Record
                    </span>
                  </div>
                )}
                {systemComponents[selectedComponent].isStartPoint && (
                  <div className="col-span-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      Profile Update Starting Point
                    </span>
                  </div>
                )}
                {systemComponents[selectedComponent].isErrorPath && (
                  <div className="col-span-2">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                      Error Path
                    </span>
                  </div>
                )}
              </div>
              
              <h5 className="font-medium mt-3 mb-1">Connections:</h5>
              <ul className="text-xs bg-white p-2 rounded border max-h-32 overflow-y-auto">
                {systemComponents[selectedComponent].connections.map(connId => (
                  <li key={connId} className="mb-1 pb-1 border-b border-gray-100">
                    {systemComponents[connId]?.name || connId}
                    <span className="text-gray-500 ml-1 capitalize">
                      ({systemComponents[connId]?.type || 'unknown'})
                    </span>
                  </li>
                ))}
                {systemComponents[selectedComponent].connections.length === 0 && (
                  <li className="text-gray-500">No outgoing connections</li>
                )}
              </ul>
            </div>
          )}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">System Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="text-sm font-medium mb-1">Component Types</h4>
              <div className="space-y-1">
                {Object.entries(
                  Object.values(systemComponents).reduce((acc, comp) => {
                    acc[comp.type] = (acc[comp.type] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{backgroundColor: typeColors[type]}}
                      ></div>
                      <span className="text-xs capitalize">{type}</span>
                    </div>
                    <span className="text-xs font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="text-sm font-medium mb-1">Flow Types</h4>
              <div className="space-y-1">
                {Object.entries(
                  Object.values(systemComponents).reduce((acc, comp) => {
                    const flow = comp.flowType || 'push';
                    acc[flow] = (acc[flow] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([flow, count]) => (
                  <div key={flow} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg width="14" height="14" className="mr-2">
                        <line 
                          x1="2" y1="7" x2="12" y2="7" 
                          stroke={flowTypes[flow]?.strokeColor || "#555"} 
                          strokeWidth={flowTypes[flow]?.strokeWidth || 2} 
                          strokeDasharray={flowTypes[flow]?.strokeDash}
                        />
                      </svg>
                      <span className="text-xs capitalize">{flow}</span>
                    </div>
                    <span className="text-xs font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="text-sm font-medium mb-1">Key Metrics</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Total Components:</span>
                  <span className="font-medium">{Object.keys(systemComponents).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Starting Points:</span>
                  <span className="font-medium">
                    {Object.values(systemComponents).filter(c => c.isStartPoint).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Master of Record:</span>
                  <span className="font-medium">
                    {Object.values(systemComponents).filter(c => c.isMasterOfRecord).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Error Paths:</span>
                  <span className="font-medium">
                    {Object.values(systemComponents).filter(c => c.isErrorPath).length}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="text-sm font-medium mb-1">Connectivity</h4>
              <div className="space-y-1 text-xs">
                {/* Most Connected Components */}
                <div>
                  <p className="font-medium">Most Connected:</p>
                  <ul className="ml-4 list-disc">
                    {Object.values(systemComponents)
                      .sort((a, b) => b.connections.length - a.connections.length)
                      .slice(0, 3)
                      .map(comp => (
                        <li key={comp.id}>
                          {comp.name} ({comp.connections.length})
                        </li>
                      ))
                    }
                  </ul>
                </div>
                
                {/* Leafs (No Outgoing Connections) */}
                <div className="mt-2">
                  <p className="font-medium">End Points:</p>
                  <span>
                    {Object.values(systemComponents).filter(c => c.connections.length === 0).length} components
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-2">Profile River Concept - 3D Visualization</h3>
        <p className="text-sm text-gray-700 mb-2">
          The 3D visualization represents the profile river concept as a three-dimensional flow network. Components are shown as nodes 
          in 3D space, with profile data flowing between them like a river system.
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Component Types:</span> Different types of components are color-coded according to their function
          in the profile synchronization process. Source systems (green) initiate profile updates, which flow through interfaces (blue),
          central systems (orange), and eventually reach target and consumer systems (red).
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Flow Types:</span> The visualization distinguishes between push flows (where a system initiates
          transfer of a profile), pull flows (where a system retrieves profiles from elsewhere), transformation flows (where profile
          data is converted between formats), and error paths (where synchronization failures occur).
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Monitoring Points:</span> The model includes visualization of queue levels (metaphorical "water dams")
          and monitoring points where system health can be observed, allowing for comprehensive understanding of the entire
          profile synchronization ecosystem.
        </p>
      </div>
    </div>
  );
};

export default SystemModel3D;
