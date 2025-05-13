// System components data model
export const systemComponents = {
  incomingCall: {
    id: 'incomingCall',
    type: 'entry',
    name: 'Incoming Call',
    icon: 'Phone',
    connections: ['ivr'],
    description: 'External caller dials company number',
    position: { x: 0, y: 0, z: 0 }
  },
  ivr: {
    id: 'ivr',
    type: 'process',
    name: 'IVR System',
    icon: 'Server',
    connections: ['numberRecognition', 'voiceBiometrics'],
    description: 'Interactive Voice Response system greets caller and provides options',
    position: { x: 2, y: 0, z: 0 }
  },
  numberRecognition: {
    id: 'numberRecognition',
    type: 'process',
    name: 'Caller ID',
    icon: 'Database',
    connections: ['customerDatabase'],
    description: 'System attempts to identify caller by phone number',
    position: { x: 4, y: 1, z: 0 }
  },
  voiceBiometrics: {
    id: 'voiceBiometrics',
    type: 'process',
    name: 'Voice Biometrics',
    icon: 'Server',
    connections: ['customerDatabase'],
    description: 'Voice pattern analyzed for returning customers who have enrolled',
    position: { x: 4, y: -1, z: 0 }
  },
  customerDatabase: {
    id: 'customerDatabase',
    type: 'storage',
    name: 'Customer Database',
    icon: 'Database',
    connections: ['identificationResult'],
    description: 'Stores customer profiles, preferences, and interaction history',
    position: { x: 6, y: 0, z: 0 }
  },
  identificationResult: {
    id: 'identificationResult',
    type: 'decision',
    name: 'Identification Result',
    icon: 'Server',
    connections: ['callRouting'],
    description: 'Determines if caller is identified, authentication level, and confidence score',
    position: { x: 8, y: 0, z: 0 }
  },
  callRouting: {
    id: 'callRouting',
    type: 'process',
    name: 'Call Routing',
    icon: 'Server',
    connections: ['agent', 'selfService'],
    description: 'Routes call based on identification results and customer segment',
    position: { x: 10, y: 0, z: 0 }
  },
  agent: {
    id: 'agent',
    type: 'endpoint',
    name: 'Live Agent',
    icon: 'User',
    connections: [],
    description: 'Call connected to appropriate agent with customer context',
    position: { x: 12, y: 1, z: 0 }
  },
  selfService: {
    id: 'selfService',
    type: 'endpoint',
    name: 'Self-Service',
    icon: 'Phone',
    connections: [],
    description: 'Caller directed to automated self-service options',
    position: { x: 12, y: -1, z: 0 }
  }
};

// Define color scheme for component types
export const typeColors = {
  entry: '#4ade80',     // Green
  process: '#60a5fa',   // Blue
  storage: '#f97316',   // Orange
  decision: '#a78bfa',  // Purple
  endpoint: '#f43f5e'   // Red
};
