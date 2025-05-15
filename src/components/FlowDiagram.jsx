import React, { useState, useCallback } from 'react';
import { 
  User, UserCog, Users, Database, Headphones, LayoutDashboard, Settings, 
  Laptop, Maximize, Globe, CreditCard, FileText, HardDrive, Share2, MessageSquare, 
  RefreshCw, Code, ExternalLink, Link, Briefcase, Monitor, Shield, Search, Cloud,
  Activity, AlertTriangle, BarChart2, PlusCircle, MinusCircle, Star, 
  XCircle, ChevronRight, ChevronLeft, ArrowUpRight, Info, HelpCircle
} from 'lucide-react';
import { systemComponents, typeColors, flowTypes } from '../data/systemData';
import DetailPanel from './DetailPanel';
import GlossaryPanel from './GlossaryPanel';

// Map of icon components
const iconComponents = {
  User: User,
  UserCog: UserCog,
  Users: Users,
  Database: Database,
  Headphones: Headphones,
  LayoutDashboard: LayoutDashboard,
  Settings: Settings,
  Laptop: Laptop,
  Maximize: Maximize,
  Globe: Globe,
  CreditCard: CreditCard,
  FileText: FileText,
  HardDrive: HardDrive,
  Share2: Share2,
  MessageSquare: MessageSquare,
  RefreshCw: RefreshCw,
  Code: Code,
  ExternalLink: ExternalLink,
  Link: Link,
  Briefcase: Briefcase,
  Monitor: Monitor,
  Shield: Shield,
  Search: Search,
  Cloud: Cloud,
  Activity: Activity,
  AlertTriangle: AlertTriangle,
  BarChart2: BarChart2
};

// Documentation references
const documentationReferences = {
  "Push vs Pull": "Push flows (solid lines) indicate that a system initiates the transfer of a profile to another system, while Pull flows (dashed lines) show systems that retrieve profiles from elsewhere.",
  "System vs Master of Record": "The 'Master of Record' (usually Connect Profile) is the authoritative system that 'owns' the profile data and is the only system that can make actual changes to the profile. A 'System of Record' may be trusted for specific data elements but doesn't have full ownership.",
  "Profile River Concept": "The visualization shows how traveler profiles flow (like a river) from source systems through transformation processes to target systems. Profile updates originate at a source, flow downstream through the central systems, and ultimately reach consumer applications.",
  "Queue Levels": "Queue systems act as 'water dams' in the profile river, controlling the flow of profile updates. Queue levels indicate the volume of updates waiting to be processed.",
  "Error Handling": "When profile updates encounter problems, they follow fallout paths to error handling systems. Support teams monitor these paths and resolve synchronization issues.",
  "Transformation Points": "Points where profile data is converted between different formats to meet the requirements of various target systems. These are critical for ensuring compatibility across diverse platforms."
};

const FlowDiagram = () => {
  const [expandedNodes, setExpandedNodes] = useState({});
  const [highlightedPath, setHighlightedPath] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showQueueLevels, setShowQueueLevels] = useState(false);
  const [showStartPoints, setShowStartPoints] = useState(true);
  const [showErrorPaths, setShowErrorPaths] = useState(false);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [selectedDocReference, setSelectedDocReference] = useState(null);
  const [showGlossary, setShowGlossary] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Toggle node expansion
  const toggleNode = (id) => {
    setExpandedNodes({
      ...expandedNodes,
      [id]: !expandedNodes[id]
    });
  };
  
  // Handle component selection
  const handleComponentSelect = (id) => {
    if (selectedComponent === id) {
      // If already selected, toggle highlight path instead
      highlightComponentPath(id);
    } else {
      // Select the component and show detail panel
      setSelectedComponent(id);
      setShowDetailPanel(true);
      setShowGlossary(false);
    }
  };
  
  // Highlight component path
  const highlightComponentPath = (id) => {
    setHighlightedPath(highlightedPath === id ? null : id);
  };
  
  // Close detail panel
  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    // Keep the component selected for a short time so it stays highlighted
    setTimeout(() => {
      setSelectedComponent(null);
    }, 300);
  };
  
  // Toggle glossary panel
  const toggleGlossary = () => {
    setShowGlossary(!showGlossary);
    if (!showGlossary) {
      setShowDetailPanel(false);
    }
  };
  
  // Show documentation reference
  const showDocReference = (key) => {
    setSelectedDocReference(key);
  };
  
  // Get all connections from a component in a flat array (for highlighting)
  const getAllConnections = useCallback((component, visited = new Set()) => {
    if (!component || visited.has(component.id)) return [];
    
    visited.add(component.id);
    let connections = [...component.connections];
    
    component.connections.forEach(targetId => {
      const target = systemComponents[targetId];
      if (target) {
        connections = [...connections, ...getAllConnections(target, visited)];
      }
    });
    
    return connections;
  }, []);
  
  // Get all incoming connections to a component
  const getIncomingConnections = useCallback((componentId) => {
    return Object.values(systemComponents)
      .filter(comp => comp.connections.includes(componentId))
      .map(comp => comp.id);
  }, []);
  
  // Check if a connection is part of the highlighted path
  const isHighlighted = useCallback((sourceId, targetId) => {
    if (!highlightedPath) return false;
    
    const startComponent = systemComponents[highlightedPath];
    if (!startComponent) return false;
    
    const allConnections = getAllConnections(startComponent);
    return sourceId === highlightedPath || 
           (allConnections.includes(sourceId) && allConnections.includes(targetId));
  }, [highlightedPath, getAllConnections]);
  
  // Get the selected component object
  const selectedComponentData = selectedComponent ? systemComponents[selectedComponent] : null;
  
  return (
    <div className="p-4 bg-gray-50 rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Profile Synchronization Flow</h2>
      
      <div className="mb-4 flex flex-wrap gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-3 py-1 rounded text-sm ${showStartPoints ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setShowStartPoints(!showStartPoints)}
          >
            {showStartPoints ? 'Hide' : 'Show'} Start Points
          </button>
          <button 
            className={`px-3 py-1 rounded text-sm ${showQueueLevels ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setShowQueueLevels(!showQueueLevels)}
          >
            {showQueueLevels ? 'Hide' : 'Show'} Queue Levels
          </button>
          <button 
            className={`px-3 py-1 rounded text-sm ${showErrorPaths ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setShowErrorPaths(!showErrorPaths)}
          >
            {showErrorPaths ? 'Hide' : 'Show'} Error Paths
          </button>
          <button 
            className="px-3 py-1 rounded text-sm bg-blue-500 text-white"
            onClick={() => {
              setHighlightedPath(null);
              setSelectedComponent(null);
              setShowDetailPanel(false);
              setShowGlossary(false);
            }}
          >
            Clear Selection
          </button>
        </div>
        
        <div className="flex gap-2">
          <button 
            className={`px-3 py-1 rounded text-sm flex items-center ${showGlossary ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
            onClick={toggleGlossary}
          >
            <HelpCircle size={16} className="mr-1" />
            Glossary
          </button>
          
          <select 
            className="px-3 py-1 rounded text-sm bg-gray-200"
            onChange={(e) => showDocReference(e.target.value)}
            value={selectedDocReference || ""}
          >
            <option value="">Documentation References</option>
            {Object.keys(documentationReferences).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Documentation reference display */}
      {selectedDocReference && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r-md">
          <div className="flex justify-between">
            <h3 className="font-medium text-blue-800">{selectedDocReference}</h3>
            <button 
              className="text-blue-500"
              onClick={() => setSelectedDocReference(null)}
            >
              <XCircle size={16} />
            </button>
          </div>
          <p className="text-sm text-blue-700 mt-1">{documentationReferences[selectedDocReference]}</p>
        </div>
      )}
      
      <div className="flex gap-4">
        {/* Main diagram area */}
        <div className={`bg-white rounded-lg shadow-md flex-1 transition-all duration-300 ${showDetailPanel || showGlossary ? 'w-2/3' : 'w-full'}`}>
          <div className="relative overflow-auto">
            <svg width="1800" height="800">
              <defs>
                {/* Arrow markers for different flow types */}
                <marker id="arrowhead-push" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#555" />
                </marker>
                <marker id="arrowhead-pull" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#555" />
                </marker>
                <marker id="arrowhead-transform" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
                </marker>
                <marker id="arrowhead-error" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                </marker>
                <marker id="arrowhead-highlight" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                </marker>
              </defs>
              
              {/* Draw connections */}
              {Object.values(systemComponents).map(component => (
                component.connections.map(targetId => {
                  const target = systemComponents[targetId];
                  if (!target) return null;
                  
                  const startX = component.position.x * 80 + 60;
                  const startY = component.position.y * 60 + 400;
                  const endX = target.position.x * 80 + 40;
                  const endY = target.position.y * 60 + 400;
                  
                  // Skip error paths if not showing them
                  if (!showErrorPaths && component.flowType === 'error') return null;
                  
                  const flowType = component.flowType || 'push';
                  const flow = flowTypes[flowType] || flowTypes.push;
                  
                  const isPathHighlighted = isHighlighted(component.id, targetId);
                  const isSelected = component.id === selectedComponent || targetId === selectedComponent;
                  
                  return (
                    <path 
                      key={`${component.id}-${targetId}`}
                      d={`M${startX},${startY} C${(startX + endX) / 2},${startY} ${(startX + endX) / 2},${endY} ${endX},${endY}`} 
                      stroke={isPathHighlighted ? "#3b82f6" : (isSelected ? "#9333ea" : flow.strokeColor || "#555")} 
                      strokeWidth={isPathHighlighted || isSelected ? 3 : flow.strokeWidth} 
                      strokeDasharray={flow.strokeDash}
                      fill="none" 
                      markerEnd={isPathHighlighted ? "url(#arrowhead-highlight)" : `url(#arrowhead-${flowType})`}
                      opacity={isPathHighlighted || isSelected ? 1 : (highlightedPath || selectedComponent ? 0.3 : 0.8)}
                    />
                  );
                })
              ))}
              
              {/* Draw nodes */}
              {Object.values(systemComponents).map(component => {
                const isExpanded = expandedNodes[component.id];
                const isSelected = selectedComponent === component.id;
                const NodeIcon = iconComponents[component.icon] || iconComponents.Database;
                const posX = component.position.x * 80 + 50;
                const posY = component.position.y * 60 + 400;
                
                // Skip error nodes if not showing error paths
                if (!showErrorPaths && component.isErrorPath) return null;
                
                // Skip nodes not in the highlighted path if one is selected
                const isNodeHighlighted = !highlightedPath || 
                                         highlightedPath === component.id || 
                                         isHighlighted(highlightedPath, component.id) ||
                                         isHighlighted(component.id, highlightedPath);
                
                // Also highlight if it's related to selected component
                const isRelated = selectedComponent && 
                                 (component.connections.includes(selectedComponent) || 
                                  getIncomingConnections(selectedComponent).includes(component.id));
                
                return (
                  <g 
                    key={component.id} 
                    transform={`translate(${posX}, ${posY})`}
                    opacity={(isNodeHighlighted || isSelected || isRelated) ? 1 : (highlightedPath || selectedComponent ? 0.4 : 1)}
                    onClick={() => handleComponentSelect(component.id)}
                    className="cursor-pointer"
                  >
                    {/* Node background */}
                    <rect 
                      x="-40" 
                      y="-25" 
                      width={isExpanded ? "280" : "80"} 
                      height={isExpanded ? "140" : "50"} 
                      rx="5" 
                      fill={typeColors[component.type]} 
                      opacity="0.9"
                      className="shadow-md"
                      stroke={isSelected ? "#9333ea" : (component.isMasterOfRecord ? "#fbbf24" : "none")}
                      strokeWidth={isSelected ? 3 : (component.isMasterOfRecord ? 3 : 0)}
                    />
                    
                    {/* Start point indicator */}
                    {showStartPoints && component.isStartPoint && (
                      <circle 
                        cx="-50" 
                        cy="-25" 
                        r="8" 
                        fill="#fbbf24"
                      />
                    )}
                    
                    {/* Queue level indicator */}
                    {showQueueLevels && component.hasQueueMonitoring && (
                      <rect 
                        x="30" 
                        y="-35" 
                        width="10" 
                        height="60" 
                        fill="#f8fafc"
                        stroke="#a78bfa"
                        strokeWidth="1"
                      >
                        <rect 
                          x="30" 
                          y="5" 
                          width="10" 
                          height="20" 
                          fill="#a78bfa"
                        />
                      </rect>
                    )}
                    
                    {/* Icon and label for collapsed node */}
                    <foreignObject x="-35" y="-22" width="70" height="45">
                      <div className="flex flex-col items-center">
                        <NodeIcon size={20} color="#fff" />
                        <div className="text-xs text-white font-medium mt-1 text-center">{component.name}</div>
                      </div>
                    </foreignObject>
                    
                    {/* Toggle expand/collapse button */}
                    <foreignObject x="25" y="-22" width="20" height="20">
                      <div className="cursor-pointer" onClick={(e) => {
                        e.stopPropagation();
                        toggleNode(component.id);
                      }}>
                        {isExpanded ? 
                          <MinusCircle size={14} color="#fff" /> : 
                          <PlusCircle size={14} color="#fff" />
                        }
                      </div>
                    </foreignObject>
                    
                    {/* Master of Record indicator */}
                    {component.isMasterOfRecord && (
                      <foreignObject x="-38" y="-23" width="20" height="20">
                        <div className="cursor-pointer">
                          <Star size={14} color="#fbbf24" fill="#fbbf24" />
                        </div>
                      </foreignObject>
                    )}
                    
                    {/* Error path indicator */}
                    {component.isErrorPath && (
                      <foreignObject x="-38" y="-23" width="20" height="20">
                        <div className="cursor-pointer">
                          <AlertTriangle size={14} color="#ef4444" />
                        </div>
                      </foreignObject>
                    )}
                    
                    {/* Monitoring point indicator */}
                    {component.isMonitoringPoint && (
                      <foreignObject x="-38" y="-23" width="20" height="20">
                        <div className="cursor-pointer">
                          <Activity size={14} color="#a855f7" />
                        </div>
                      </foreignObject>
                    )}
                    
                    {/* Expanded node content */}
                    {isExpanded && (
                      <foreignObject x="-35" y="5" width="270" height="105">
                        <div className="text-white p-2">
                          <div className="font-bold mb-1">{component.name}</div>
                          <div className="text-xs mb-1">Type: {component.type.charAt(0).toUpperCase() + component.type.slice(1)}</div>
                          <div className="text-xs mb-1">Flow: {component.flowType || 'push'}</div>
                          <div className="text-xs">{component.description}</div>
                        </div>
                      </foreignObject>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
        
        {/* Component detail panel */}
        {showDetailPanel && selectedComponentData && (
          <DetailPanel
            iconComponents={iconComponents}
            componentData={selectedComponentData}
            onClose={closeDetailPanel}
            onViewComponent={handleComponentSelect}
            getIncomingConnections={getIncomingConnections}
          />
        )}
        
        {/* Glossary panel */}
        {showGlossary && (
          <GlossaryPanel
            onClose={toggleGlossary}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      </div>
      
      <div className="mt-4 bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-2">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h4 className="font-medium mb-1">Component Types</h4>
            <div className="space-y-1">
              {Object.entries(typeColors).map(([type, color]) => (
                <div key={type} className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-2" style={{backgroundColor: color}}></div>
                  <span className="text-sm capitalize">{type}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">Flow Types</h4>
            <div className="space-y-1">
              {Object.entries(flowTypes).map(([type, config]) => (
                <div key={type} className="flex items-center">
                  <svg width="20" height="20" className="mr-2">
                    <line 
                      x1="2" y1="10" x2="18" y2="10" 
                      stroke={config.strokeColor || "#555"} 
                      strokeWidth={config.strokeWidth} 
                      strokeDasharray={config.strokeDash}
                    />
                  </svg>
                  <span className="text-sm capitalize">{type}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">Indicators</h4>
            <div className="space-y-1">
              <div className="flex items-center">
                <Star size={14} color="#fbbf24" fill="#fbbf24" className="mr-2" />
                <span className="text-sm">Master of Record</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2 bg-yellow-400"></div>
                <span className="text-sm">Start Point</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle size={14} color="#ef4444" className="mr-2" />
                <span className="text-sm">Error Path</span>
              </div>
              <div className="flex items-center">
                <Activity size={14} color="#a855f7" className="mr-2" />
                <span className="text-sm">Monitoring Point</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">Controls</h4>
            <div className="space-y-1 text-sm">
              <p>• Click a component to view details</p>
              <p>• Click + to expand component</p>
              <p>• Click a component twice to highlight path</p>
              <p>• Use the Glossary for term definitions</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-2">Profile River Concept</h3>
        <p className="text-sm text-gray-700 mb-2">
          The diagram shows how traveler profiles flow (like a river) from source systems through transformation processes to target systems. 
          Profile updates originate at a source, flow downstream through the central systems, and ultimately reach consumer applications.
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Push vs Pull:</span> "Push" flows (solid lines) indicate that a system initiates the transfer of a profile to another system, 
          while "Pull" flows (dashed lines) show systems that retrieve profiles from elsewhere.
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Master of Record:</span> The system marked with a star is the "Master of Record" - the authoritative source for profile data 
          that "owns" the profile. Only this system can make actual changes to the profile. All other systems should stay synchronized with it.
        </p>
      </div>
    </div>
  );
};

export default FlowDiagram;