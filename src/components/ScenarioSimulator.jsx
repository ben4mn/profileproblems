import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { systemComponents, typeColors, flowTypes } from '../data/systemData';
import { 
  User, UserCog, Users, Database, Headphones, LayoutDashboard, Settings, 
  Laptop, Maximize, Globe, CreditCard, FileText, HardDrive, Share2, MessageSquare, 
  RefreshCw, Code, ExternalLink, Link, Briefcase, Monitor, Shield, Search, Cloud,
  Activity, AlertTriangle, BarChart2
} from 'lucide-react';

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

// Get only the starting points for profile updates
const getStartingPoints = () => {
  return Object.values(systemComponents).filter(comp => comp.isStartPoint);
};

// Define common profile update types
const profileUpdateTypes = [
  { id: 'contact', name: 'Contact Information Update', fields: ['email', 'phone', 'address'] },
  { id: 'payment', name: 'Payment Method Update', fields: ['creditCard', 'billingAddress'] },
  { id: 'preferences', name: 'Travel Preferences Update', fields: ['seatPreference', 'mealPreference', 'specialRequests'] },
  { id: 'document', name: 'Travel Document Update', fields: ['passport', 'visaInfo', 'loyaltyProgram'] },
  { id: 'compliance', name: 'Compliance Info Update', fields: ['travelPolicy', 'approvalWorkflow'] }
];

const ScenarioSimulator = () => {
  const [currentStep, setCurrentStep] = useState(null);
  const [currentPath, setCurrentPath] = useState([]);
  const [logMessages, setLogMessages] = useState([]);
  const [scenarioOptions, setScenarioOptions] = useState({
    startPoint: 'traveler',
    updateType: 'contact',
    includeOBT: true,
    includeGDS: true,
    errorScenario: false
  });
  
  const startingPoints = getStartingPoints();
  
  // Trace a possible path through the system
  const tracePath = (startId, options) => {
    // Reset current simulation
    setCurrentStep(startId);
    setCurrentPath([startId]);
    setLogMessages([
      {
        system: systemComponents[startId].name,
        message: `Profile update initiated by ${systemComponents[startId].name}`
      }
    ]);
    
    // Determine the type of update being performed
    const updateTypeObj = profileUpdateTypes.find(type => type.id === options.updateType);
    const updateMessage = updateTypeObj 
      ? `Updating ${updateTypeObj.fields.join(', ')}` 
      : 'Updating profile information';
    
    addLogMessage(startId, updateMessage);
  };
  
  const addLogMessage = (componentId, message) => {
    const component = systemComponents[componentId];
    if (!component) return;
    
    setLogMessages(prev => [
      ...prev,
      {
        system: component.name,
        message: message
      }
    ]);
  };
  
  const moveToNextStep = () => {
    const currentComponent = systemComponents[currentStep];
    
    if (!currentComponent || currentComponent.connections.length === 0) {
      addLogMessage(currentStep, 'End of profile synchronization flow reached');
      return; // End of flow
    }
    
    // Decide next step based on scenario options
    let nextStep = currentComponent.connections[0]; // Default to first connection
    
    // For queue systems, choose based on options
    if (currentComponent.type === 'queue') {
      if (scenarioOptions.errorScenario) {
        addLogMessage(currentStep, 'Error encountered during profile transformation');
        setCurrentStep('falloutInbox');
        setCurrentPath([...currentPath, 'falloutInbox']);
        return;
      }
    }
    
    // For central components that split to OBT/GDS 
    if (currentComponent.id === 'travelerProfileData') {
      if (scenarioOptions.includeOBT && scenarioOptions.includeGDS) {
        // Both OBT and GDS path - use distributor
        nextStep = 'profileDistributor';
      } else if (scenarioOptions.includeOBT) {
        nextStep = 'obtSystems';
      } else if (scenarioOptions.includeGDS) {
        nextStep = 'gdsSystems';
      }
    }
    
    // For OBT/GDS systems, choose a specific one
    if (currentComponent.id === 'obtSystems') {
      // Pick a random OBT system
      const obtSystems = currentComponent.connections;
      nextStep = obtSystems[Math.floor(Math.random() * obtSystems.length)];
    }
    
    if (currentComponent.id === 'gdsSystems') {
      // Pick a random GDS system
      const gdsSystems = currentComponent.connections;
      nextStep = gdsSystems[Math.floor(Math.random() * gdsSystems.length)];
    }
    
    // For profile distributor, choose queue systems
    if (currentComponent.id === 'profileDistributor') {
      nextStep = 'kafka'; // Default to Kafka for most profile updates
    }
    
    // Update the path and log
    const nextComponent = systemComponents[nextStep];
    if (nextComponent) {
      // Generate appropriate log message based on component type
      let logMessage = '';
      
      switch (nextComponent.type) {
        case 'interface':
          logMessage = 'Profile update submitted through user interface';
          break;
        case 'central':
          logMessage = 'Profile information validated and stored in central system';
          break;
        case 'queue':
          logMessage = 'Profile update queued for distribution to downstream systems';
          break;
        case 'transform':
          logMessage = 'Profile data transformed to target system format';
          break;
        case 'obt':
          logMessage = 'Profile synchronized to Online Booking Tool';
          break;
        case 'gds':
          logMessage = 'Profile synchronized to Global Distribution System';
          break;
        case 'consumer':
          logMessage = 'Profile data delivered to consumer application';
          break;
        case 'monitor':
          logMessage = 'Profile synchronization status monitored';
          break;
        default:
          logMessage = 'Profile data processed';
      }
      
      if (scenarioOptions.updateType === 'payment' && nextComponent.id === 'creditCardFeed') {
        logMessage = 'Credit card information encrypted and securely processed';
      }
      
      if (nextComponent.id === 'travelerProfileData' && systemComponents[currentStep].id === 'connectProfile') {
        logMessage = 'Profile data verified by Master of Record system';
      }
      
      addLogMessage(nextStep, logMessage);
      setCurrentStep(nextStep);
      setCurrentPath([...currentPath, nextStep]);
    }
  };
  
  const updateScenarioOption = (key, value) => {
    setScenarioOptions({
      ...scenarioOptions,
      [key]: value
    });
  };
  
  const startSimulation = () => {
    tracePath(scenarioOptions.startPoint, scenarioOptions);
  };
  
  const resetSimulation = () => {
    setCurrentStep(null);
    setCurrentPath([]);
    setLogMessages([]);
  };
  
  return (
    <div className="p-4 bg-gray-50 rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Profile Update Simulator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Scenario Configuration Panel */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold mb-4">Configure Profile Update</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Starting Point</label>
              <select 
                className="w-full p-2 border rounded"
                value={scenarioOptions.startPoint}
                onChange={(e) => updateScenarioOption('startPoint', e.target.value)}
              >
                {startingPoints.map(point => (
                  <option key={point.id} value={point.id}>{point.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Update Type</label>
              <select 
                className="w-full p-2 border rounded"
                value={scenarioOptions.updateType}
                onChange={(e) => updateScenarioOption('updateType', e.target.value)}
              >
                {profileUpdateTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="includeOBT" 
                className="mr-2" 
                checked={scenarioOptions.includeOBT}
                onChange={(e) => updateScenarioOption('includeOBT', e.target.checked)}
              />
              <label htmlFor="includeOBT" className="text-sm">Sync to OBT Systems</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="includeGDS" 
                className="mr-2" 
                checked={scenarioOptions.includeGDS}
                onChange={(e) => updateScenarioOption('includeGDS', e.target.checked)}
              />
              <label htmlFor="includeGDS" className="text-sm">Sync to GDS Systems</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="errorScenario" 
                className="mr-2" 
                checked={scenarioOptions.errorScenario}
                onChange={(e) => updateScenarioOption('errorScenario', e.target.checked)}
              />
              <label htmlFor="errorScenario" className="text-sm">Simulate Error Scenario</label>
            </div>
            
            <button 
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={startSimulation}
            >
              Start Simulation
            </button>
          </div>
        </div>
        
        {/* Current Step Visualization */}
        <div className="bg-white rounded-lg shadow-md p-4 col-span-2">
          <h3 className="font-bold mb-4">Profile River Flow</h3>
          
          {currentStep ? (
            <>
              <div className="flex mb-4 overflow-x-auto pb-2">
                {currentPath.map((stepId, index) => (
                  <div key={`step-${index}`} className="flex-none flex flex-col items-center mr-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
                      style={{ backgroundColor: typeColors[systemComponents[stepId]?.type || 'central'] }}
                    >
                      {React.createElement(
                        iconComponents[systemComponents[stepId]?.icon || 'Database'], 
                        { size: 24, color: "#fff" }
                      )}
                    </div>
                    <div className="text-xs text-center max-w-[80px] whitespace-normal">
                      {systemComponents[stepId]?.name || 'Unknown'}
                    </div>
                    {index < currentPath.length - 1 && (
                      <div className="w-6 h-6 flex items-center justify-center">
                        <ArrowRight size={16} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
          
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <div 
                    className="rounded-full p-3 mr-4"
                    style={{ backgroundColor: typeColors[systemComponents[currentStep]?.type || 'central'] }}
                  >
                    {React.createElement(
                      iconComponents[systemComponents[currentStep]?.icon || 'Database'], 
                      { size: 24, color: "#fff" }
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg">{systemComponents[currentStep]?.name || 'Unknown Step'}</h4>
                    <p className="text-gray-700">{systemComponents[currentStep]?.description || 'No description available'}</p>
                    {systemComponents[currentStep]?.type && (
                      <span className="inline-block bg-gray-200 px-2 py-1 rounded text-xs mt-1 capitalize">
                        {systemComponents[currentStep]?.type}
                      </span>
                    )}
                    {systemComponents[currentStep]?.isMasterOfRecord && (
                      <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs mt-1 ml-2">
                        Master of Record
                      </span>
                    )}
                  </div>
                </div>
              </div>
          
              <div className="bg-gray-100 rounded-lg p-4 mb-4 h-48 overflow-y-auto">
                <h4 className="font-bold mb-2">Profile Synchronization Log</h4>
                <div className="space-y-2 text-sm">
                  {logMessages.map((log, index) => (
                    <div key={index} className="p-2 bg-white rounded border-l-4" style={{
                      borderColor: typeColors[systemComponents[currentPath[index]]?.type || 'central']
                    }}>
                      <span className="text-gray-500 font-medium">{log.system}: </span>
                      <span>{log.message}</span>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          
              <div className="flex justify-between">
                <div>
                  {(currentComponent => {
                    if (!currentComponent) return (
                      <button className="bg-gray-300 text-white px-4 py-2 rounded">
                        End of Flow
                      </button>
                    );
                    
                    if (currentComponent.connections.length === 0 || currentComponent.isErrorPath) {
                      return (
                        <button className="bg-gray-300 text-white px-4 py-2 rounded">
                          End of Flow
                        </button>
                      );
                    }
                    
                    return (
                      <button 
                        className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600"
                        onClick={moveToNextStep}
                      >
                        Next Step <ArrowRight size={16} className="ml-2" />
                      </button>
                    );
                  })(systemComponents[currentStep])}
                </div>
                
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={resetSimulation}
                >
                  Reset
                </button>
              </div>
            </>
          ) : (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">Configure scenario options and click "Start Simulation" to begin</p>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={startSimulation}
              >
                Start Simulation
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow-md p-4">
        <h3 className="font-bold mb-2">About Profile Synchronization</h3>
        <p className="text-sm text-gray-700 mb-2">
          This simulator demonstrates how a traveler profile update flows through the "Profile River" from source systems
          through transformation processes to target systems. You can select different starting points and update types to
          see how the profile data flows through the system.
        </p>
        <p className="text-sm text-gray-700 mb-2">
          When a profile is updated (e.g., a traveler updates their phone number), the change is initiated at the source
          system and then flows downstream, creating, updating, or deleting the traveler profile in all downstream systems.
        </p>
        <p className="text-sm text-gray-700">
          The "Master of Record" (Connect Profile) is the authoritative system that "owns" the profile,
          and only this system can make actual profile changes. All other systems keep synchronized with it.
        </p>
      </div>
    </div>
  );
};

export default ScenarioSimulator;
