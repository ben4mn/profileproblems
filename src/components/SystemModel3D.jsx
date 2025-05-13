import React from 'react';
import { Server } from 'lucide-react';
import { systemComponents } from '../data/systemData';

const SystemModel3D = () => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-6">3D System Model</h2>
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="bg-gray-800 rounded-lg h-96 flex items-center justify-center">
          <div className="text-white">
            <Server size={48} className="mx-auto mb-4" />
            <p>3D model would render here using Three.js</p>
            <p className="text-sm mt-2 max-w-md mx-auto">
              The full implementation would create a 3D scene showing components as nodes in space with connections visualized as beams or tubes between them.
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Rotate View</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Zoom In/Out</button>
          <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Highlight Path</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">Component Details</h3>
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Connections</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(systemComponents).map(component => (
                  <tr key={component.id} className="border-b">
                    <td className="p-2">{component.name}</td>
                    <td className="p-2 capitalize">{component.type}</td>
                    <td className="p-2">{component.connections.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">3D Visualization Controls</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Visualization Mode</label>
              <select className="w-full p-2 border rounded">
                <option>Component View</option>
                <option>Connection Flow</option>
                <option>Heat Map (Traffic)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Highlight Component</label>
              <select className="w-full p-2 border rounded">
                <option value="">Select a component...</option>
                {Object.values(systemComponents).map(component => (
                  <option key={component.id} value={component.id}>{component.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemModel3D;
