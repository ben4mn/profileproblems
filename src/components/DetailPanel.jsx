import React from 'react';
import { 
  XCircle, Info, Activity, Share2, ArrowUpRight, Code, ExternalLink 
} from 'lucide-react';
import { systemComponents, typeColors } from '../data/systemData';

// Glossary terms to highlight in descriptions
const glossaryTerms = {
  "Master of Record": "The authoritative source for a profile that 'owns' the data. Only this system can make actual changes to the profile information.",
  "System of Record": "A trusted source for a specific data element that maintains the most accurate and complete data.",
  "Push": "Flow type where a system initiates the transfer of a profile to another system.",
  "Pull": "Flow type where a system retrieves profiles from another system on demand.",
  "Transform": "Process where profile data is converted between different formats to meet the requirements of target systems.",
  "Profile River": "Conceptual view of how traveler profiles flow from source systems through transformation processes to target systems, similar to a river network.",
  "Connect Profile": "The central profile management system (CPr) that serves as the Master of Record for traveler profiles.",
  "Profile Distributor": "Connect Profile Distributor (CPRD) that sends profiles to downstream systems.",
  "Queue System": "System that manages the ordered distribution of profile updates to downstream systems.",
  "OBT": "Online Booking Tool - systems used to book travel services online.",
  "GDS": "Global Distribution System - systems that enable transactions between travel service providers and travel agencies.",
  "Fallout Path": "Error handling route for profile updates that cannot be processed normally.",
  "Monitoring Point": "Locations in the system where the health and status of profile synchronization is observed."
};

const DetailPanel = ({ 
  iconComponents,
  componentData, 
  onClose, 
  onViewComponent, 
  getIncomingConnections 
}) => {
  // Render term with glossary links if available
  const renderWithGlossaryLinks = (text) => {
    if (!text) return null;
    
    // Simple approach: check for exact terms
    let processedText = text;
    
    Object.keys(glossaryTerms).forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'g');
      processedText = processedText.replace(regex, `<span class="glossary-term" title="${glossaryTerms[term]}">${term}</span>`);
    });
    
    return (
      <div 
        className="glossary-enabled" 
        dangerouslySetInnerHTML={{ __html: processedText }}
      />
    );
  };

  if (!componentData) return null;

  return (
    <div className="bg-white rounded-lg shadow-md w-1/3 max-w-md transition-all duration-300 overflow-hidden">
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Component Details</h3>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <XCircle size={20} />
          </button>
        </div>
      </div>
      
      <div className="p-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
        {/* Component header */}
        <div className="flex items-start mb-6">
          <div 
            className="p-3 rounded-md mr-4 flex-shrink-0"
            style={{ backgroundColor: typeColors[componentData.type] }}
          >
            {React.createElement(
              iconComponents[componentData.icon] || iconComponents.Database, 
              { size: 24, color: "#fff" }
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-bold">{componentData.name}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-block px-2 py-1 bg-gray-100 rounded-md text-xs capitalize">
                {componentData.type}
              </span>
              <span className="inline-block px-2 py-1 bg-gray-100 rounded-md text-xs capitalize">
                {componentData.flowType || "push"} flow
              </span>
              {componentData.isMasterOfRecord && (
                <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs">
                  Master of Record
                </span>
              )}
              {componentData.isStartPoint && (
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                  Start Point
                </span>
              )}
              {componentData.isErrorPath && (
                <span className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs">
                  Error Path
                </span>
              )}
              {componentData.isMonitoringPoint && (
                <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs">
                  Monitoring Point
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Component description */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 flex items-center">
            <Info size={16} className="mr-1" />
            Description
          </h3>
          <div className="text-gray-700 text-sm p-3 bg-gray-50 rounded-md glossary-content">
            {renderWithGlossaryLinks(componentData.description)}
          </div>
        </div>
        
        {/* Role in the profile synchronization process */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 flex items-center">
            <Activity size={16} className="mr-1" />
            Role in the Profile River
          </h3>
          <div className="text-gray-700 text-sm p-3 bg-gray-50 rounded-md">
            {componentData.type === 'source' && (
              <p>This component serves as a source for profile updates, initiating changes that flow downstream through the system.</p>
            )}
            {componentData.type === 'interface' && (
              <p>This component provides a user interface for interacting with and updating profile information.</p>
            )}
            {componentData.type === 'central' && (
              <p>This component acts as a central repository for profile data, managing and distributing updates.</p>
            )}
            {componentData.type === 'queue' && (
              <p>This component manages the ordered distribution of profile updates to downstream systems, controlling flow like a dam in the profile river.</p>
            )}
            {componentData.type === 'transform' && (
              <p>This component converts profile data between different formats to meet the requirements of various target systems.</p>
            )}
            {componentData.type === 'api' && (
              <p>This component provides programmatic access to profile data for other systems and applications.</p>
            )}
            {componentData.type === 'obt' && (
              <p>This Online Booking Tool receives profile updates to ensure travelers have access to their latest information when booking.</p>
            )}
            {componentData.type === 'gds' && (
              <p>This Global Distribution System receives profile updates to support travel reservations with accurate traveler data.</p>
            )}
            {componentData.type === 'consumer' && (
              <p>This application consumes profile data for various business purposes, representing an endpoint in the profile river.</p>
            )}
            {componentData.type === 'monitor' && (
              <p>This component monitors the health and status of profile synchronization, tracking updates and identifying issues.</p>
            )}
            {componentData.isMasterOfRecord && (
              <p className="mt-2 font-medium">As the Master of Record, this system is the authoritative source for profile data and the only one that can make actual changes to the profile.</p>
            )}
          </div>
        </div>
        
        {/* Connections section */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 flex items-center">
            <Share2 size={16} className="mr-1" />
            Connections
          </h3>
          
          <div className="space-y-4">
            {/* Outgoing connections */}
            <div>
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <ArrowUpRight size={14} className="mr-1" /> 
                Outgoing Connections
              </h4>
              {componentData.connections.length > 0 ? (
                <ul className="text-xs bg-gray-50 p-2 rounded-md max-h-40 overflow-y-auto">
                  {componentData.connections.map(connId => (
                    <li key={connId} className="mb-1 pb-1 border-b border-gray-100 flex items-center justify-between">
                      <div>
                        <span>{systemComponents[connId]?.name || connId}</span>
                        <span className="text-gray-500 ml-1 capitalize">
                          ({systemComponents[connId]?.type || 'unknown'})
                        </span>
                      </div>
                      <button 
                        className="text-blue-500 text-xs hover:underline"
                        onClick={() => onViewComponent(connId)}
                      >
                        View
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-500 p-2">No outgoing connections</p>
              )}
            </div>
            
            {/* Incoming connections */}
            <div>
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <ArrowUpRight size={14} className="mr-1 transform rotate-180" /> 
                Incoming Connections
              </h4>
              {(() => {
                const incomingConnections = getIncomingConnections(componentData.id);
                return incomingConnections.length > 0 ? (
                  <ul className="text-xs bg-gray-50 p-2 rounded-md max-h-40 overflow-y-auto">
                    {incomingConnections.map(connId => (
                      <li key={connId} className="mb-1 pb-1 border-b border-gray-100 flex items-center justify-between">
                        <div>
                          <span>{systemComponents[connId]?.name || connId}</span>
                          <span className="text-gray-500 ml-1 capitalize">
                            ({systemComponents[connId]?.type || 'unknown'})
                          </span>
                        </div>
                        <button 
                          className="text-blue-500 text-xs hover:underline"
                          onClick={() => onViewComponent(connId)}
                        >
                          View
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-500 p-2">No incoming connections</p>
                );
              })()}
            </div>
          </div>
        </div>
        
        {/* Technical details */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 flex items-center">
            <Code size={16} className="mr-1" />
            Technical Details
          </h3>
          
          <div className="text-gray-700 text-sm p-3 bg-gray-50 rounded-md space-y-2">
            <div>
              <span className="font-medium">Component ID:</span> {componentData.id}
            </div>
            <div>
              <span className="font-medium">Type:</span> {componentData.type}
            </div>
            <div>
              <span className="font-medium">Flow Type:</span> {componentData.flowType || 'push'}
            </div>
            {componentData.hasQueueMonitoring && (
              <div>
                <span className="font-medium">Queue Monitoring:</span> Enabled
              </div>
            )}
            <div>
              <span className="font-medium">Position:</span> x: {componentData.position.x}, 
              y: {componentData.position.y}, 
              z: {componentData.position.z}
            </div>
          </div>
        </div>
        
        {/* Documentation links */}
        <div className="mb-2">
          <h3 className="font-semibold mb-2 flex items-center">
            <ExternalLink size={16} className="mr-1" />
            Documentation Links
          </h3>
          
          <div className="text-gray-700 text-sm p-3 bg-gray-50 rounded-md">
            <p className="mb-2">For more detailed information, check the following documentation:</p>
            <ul className="space-y-1 list-disc pl-5 text-blue-600">
              <li><a href="#" className="hover:underline">Profile Synchronization Guide</a></li>
              <li><a href="#" className="hover:underline">System Integration Reference</a></li>
              {componentData.type === 'transform' && (
                <li><a href="#" className="hover:underline">Data Transformation Rules</a></li>
              )}
              {componentData.type === 'queue' && (
                <li><a href="#" className="hover:underline">Queue Management Documentation</a></li>
              )}
              {componentData.isMonitoringPoint && (
                <li><a href="#" className="hover:underline">Monitoring Guidelines</a></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
