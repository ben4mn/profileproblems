import React, { useState } from 'react';
import { Phone, Server, Database, User, PlusCircle, MinusCircle } from 'lucide-react';
import { systemComponents, typeColors } from '../data/systemData';

// Map of icon components
const iconComponents = {
  Phone: Phone,
  Server: Server,
  Database: Database,
  User: User
};

const FlowDiagram = () => {
  const [expandedNodes, setExpandedNodes] = useState({});
  
  const toggleNode = (id) => {
    setExpandedNodes({
      ...expandedNodes,
      [id]: !expandedNodes[id]
    });
  };
  
  return (
    <div className="p-4 bg-gray-50 rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Interactive System Flow</h2>
      <div className="relative">
        <svg width="1200" height="600" className="bg-white rounded-lg shadow-md">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
            </marker>
          </defs>
          
          {/* Draw connections */}
          {Object.values(systemComponents).map(component => (
            component.connections.map(targetId => {
              const target = systemComponents[targetId];
              const startX = component.position.x * 100 + 60;
              const startY = component.position.y * 100 + 300;
              const endX = target.position.x * 100 + 40;
              const endY = target.position.y * 100 + 300;
              
              return (
                <path 
                  key={`${component.id}-${targetId}`}
                  d={`M${startX},${startY} C${(startX + endX) / 2},${startY} ${(startX + endX) / 2},${endY} ${endX},${endY}`} 
                  stroke="#888" 
                  strokeWidth="2" 
                  fill="none" 
                  markerEnd="url(#arrowhead)" 
                />
              );
            })
          ))}
          
          {/* Draw nodes */}
          {Object.values(systemComponents).map(component => {
            const isExpanded = expandedNodes[component.id];
            const NodeIcon = iconComponents[component.icon];
            const posX = component.position.x * 100 + 50;
            const posY = component.position.y * 100 + 300;
            
            return (
              <g key={component.id} transform={`translate(${posX}, ${posY})`}>
                {/* Node background */}
                <rect 
                  x="-50" 
                  y="-30" 
                  width={isExpanded ? "300" : "100"} 
                  height={isExpanded ? "150" : "60"} 
                  rx="5" 
                  fill={typeColors[component.type]} 
                  opacity="0.8"
                  className="shadow-md"
                />
                
                {/* Icon and label for collapsed node */}
                <foreignObject x="-40" y="-25" width="80" height="50">
                  <div className="flex flex-col items-center">
                    <NodeIcon size={24} color="#fff" />
                    <div className="text-xs text-white font-medium mt-1">{component.name}</div>
                  </div>
                </foreignObject>
                
                {/* Toggle expand/collapse button */}
                <foreignObject x="30" y="-25" width="20" height="20">
                  <div className="cursor-pointer" onClick={() => toggleNode(component.id)}>
                    {isExpanded ? 
                      <MinusCircle size={16} color="#fff" /> : 
                      <PlusCircle size={16} color="#fff" />
                    }
                  </div>
                </foreignObject>
                
                {/* Expanded node content */}
                {isExpanded && (
                  <foreignObject x="-45" y="5" width="290" height="110">
                    <div className="text-white p-2">
                      <div className="font-bold mb-1">{component.name}</div>
                      <div className="text-xs mb-2">Type: {component.type.charAt(0).toUpperCase() + component.type.slice(1)}</div>
                      <div className="text-xs">{component.description}</div>
                    </div>
                  </foreignObject>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-4 bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-2">Legend</h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{backgroundColor: color}}></div>
              <span className="text-sm capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowDiagram;
