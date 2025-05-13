import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { systemComponents, typeColors } from '../data/systemData';
import { Phone, Server, Database, User } from 'lucide-react';

// Map of icon components
const iconComponents = {
  Phone: Phone,
  Server: Server,
  Database: Database,
  User: User
};

const ScenarioSimulator = () => {
  const [currentStep, setCurrentStep] = useState('incomingCall');
  const [scenarioOptions, setScenarioOptions] = useState({
    callerType: 'returning',
    phoneNumberRegistered: true,
    voiceEnrolled: true,
    authenticationNeeded: true
  });
  
  const updateScenario = (key, value) => {
    setScenarioOptions({
      ...scenarioOptions,
      [key]: value
    });
    // Reset to beginning when changing parameters
    setCurrentStep('incomingCall');
  };
  
  const moveToNextStep = () => {
    const currentComponent = systemComponents[currentStep];
    
    if (currentComponent.connections.length === 0) {
      return; // End of flow
    }
    
    // Simple logic to determine next step based on scenario options
    if (currentStep === 'callRouting') {
      if (scenarioOptions.authenticationNeeded) {
        setCurrentStep('agent');
      } else {
        setCurrentStep('selfService');
      }
    } else if (currentStep === 'ivr') {
      if (scenarioOptions.phoneNumberRegistered) {
        setCurrentStep('numberRecognition');
      } else if (scenarioOptions.voiceEnrolled) {
        setCurrentStep('voiceBiometrics');
      } else {
        // No identification possible, skip to result
        setCurrentStep('identificationResult');
      }
    } else if (currentComponent.connections.length === 1) {
      setCurrentStep(currentComponent.connections[0]);
    } else {
      // Default to first connection
      setCurrentStep(currentComponent.connections[0]);
    }
  };
  
  const resetScenario = () => {
    setCurrentStep('incomingCall');
  };
  
  return (
    <div className="p-4 bg-gray-50 rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Scenario Simulator</h2>
      
      <div className="grid grid-cols-3 gap-6">
        {/* Scenario Configuration Panel */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold mb-4">Configure Scenario</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Caller Type</label>
              <select 
                className="w-full p-2 border rounded"
                value={scenarioOptions.callerType}
                onChange={(e) => updateScenario('callerType', e.target.value)}
              >
                <option value="new">New Caller</option>
                <option value="returning">Returning Customer</option>
                <option value="priority">Priority Customer</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="phoneReg" 
                className="mr-2" 
                checked={scenarioOptions.phoneNumberRegistered}
                onChange={(e) => updateScenario('phoneNumberRegistered', e.target.checked)}
              />
              <label htmlFor="phoneReg" className="text-sm">Phone Number Registered</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="voiceEnrolled" 
                className="mr-2" 
                checked={scenarioOptions.voiceEnrolled}
                onChange={(e) => updateScenario('voiceEnrolled', e.target.checked)}
              />
              <label htmlFor="voiceEnrolled" className="text-sm">Voice Biometrics Enrolled</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="authNeeded" 
                className="mr-2" 
                checked={scenarioOptions.authenticationNeeded}
                onChange={(e) => updateScenario('authenticationNeeded', e.target.checked)}
              />
              <label htmlFor="authNeeded" className="text-sm">Advanced Authentication Required</label>
            </div>
            
            <button 
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={resetScenario}
            >
              Reset Simulation
            </button>
          </div>
        </div>
        
        {/* Current Step Visualization */}
        <div className="bg-white rounded-lg shadow-md p-4 col-span-2">
          <h3 className="font-bold mb-4">Simulation Progress</h3>
          
          <div className="flex mb-4">
            {Object.values(systemComponents).map((component, index) => (
              <div 
                key={component.id} 
                className={`flex-1 h-2 ${currentStep === component.id ? 'bg-blue-500' : 'bg-gray-200'} ${index > 0 ? 'ml-1' : ''}`}
              />
            ))}
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <div 
                className="rounded-full p-4 mr-4"
                style={{ backgroundColor: typeColors[systemComponents[currentStep].type] }}
              >
                {React.createElement(iconComponents[systemComponents[currentStep].icon], { size: 28, color: "#fff" })}
              </div>
              
              <div>
                <h4 className="font-bold text-lg">{systemComponents[currentStep].name}</h4>
                <p className="text-gray-700">{systemComponents[currentStep].description}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-4 h-48 overflow-y-auto">
            <h4 className="font-bold mb-2">System Activity Log</h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-white rounded">
                <span className="text-gray-500">System: </span>Call received from {scenarioOptions.callerType} caller
              </div>
              {currentStep !== 'incomingCall' && (
                <div className="p-2 bg-white rounded">
                  <span className="text-gray-500">IVR: </span>Greeting played, collecting initial information
                </div>
              )}
              {(currentStep === 'numberRecognition' || currentStep === 'customerDatabase' || currentStep === 'identificationResult' || currentStep === 'callRouting' || currentStep === 'agent' || currentStep === 'selfService') && (
                <div className="p-2 bg-white rounded">
                  <span className="text-gray-500">Identification: </span>
                  {scenarioOptions.phoneNumberRegistered ? "Phone number matched to existing customer" : "Phone number not recognized"}
                </div>
              )}
              {(currentStep === 'voiceBiometrics' || (currentStep === 'customerDatabase' && scenarioOptions.voiceEnrolled)) && (
                <div className="p-2 bg-white rounded">
                  <span className="text-gray-500">Voice Biometrics: </span>
                  {scenarioOptions.voiceEnrolled ? "Voice pattern matched with 92% confidence" : "No voice pattern on file"}
                </div>
              )}
              {(currentStep === 'identificationResult' || currentStep === 'callRouting' || currentStep === 'agent' || currentStep === 'selfService') && (
                <div className="p-2 bg-white rounded">
                  <span className="text-gray-500">Database: </span>
                  Customer profile retrieved with preference history
                </div>
              )}
              {(currentStep === 'callRouting' || currentStep === 'agent' || currentStep === 'selfService') && (
                <div className="p-2 bg-white rounded">
                  <span className="text-gray-500">Decision: </span>
                  {scenarioOptions.authenticationNeeded ? "Authentication required, routing to agent" : "Self-service eligible"}
                </div>
              )}
              {(currentStep === 'agent' || currentStep === 'selfService') && (
                <div className="p-2 bg-white rounded">
                  <span className="text-gray-500">Routing: </span>
                  Call routed to {currentStep === 'agent' ? "live agent with customer context" : "self-service menu"}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between">
            <div>
              {systemComponents[currentStep].connections.length > 0 ? (
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600"
                  onClick={moveToNextStep}
                >
                  Next Step <ArrowRight size={16} className="ml-2" />
                </button>
              ) : (
                <button className="bg-gray-300 text-white px-4 py-2 rounded">
                  End of Flow
                </button>
              )}
            </div>
            
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={resetScenario}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSimulator;
