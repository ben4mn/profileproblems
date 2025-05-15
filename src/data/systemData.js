// System components data model

// Define color scheme for component types
export const typeColors = {
  source: '#4ade80',      // Green - systems where profile updates originate
  interface: '#60a5fa',   // Blue - user interfaces for profile management
  dataProvider: '#fbbf24', // Yellow - systems providing data to the profile system
  central: '#f97316',     // Orange - central profile data systems
  queue: '#a78bfa',       // Purple - profile queuing points
  transform: '#ec4899',   // Pink - profile transformation points
  api: '#06b6d4',         // Cyan - API connection points between systems
  obt: '#3b82f6',         // Blue - Online Booking Tool integrations
  gds: '#8b5cf6',         // Violet - Global Distribution System integrations
  consumer: '#ef4444',    // Red - end-point systems using profiles
  monitor: '#6b7280'      // Gray - monitoring points
};

// Define flow types
export const flowTypes = {
  push: {
    strokeDash: "none",
    strokeWidth: 2,
    description: "Push flow - system initiates transfer to another system"
  },
  pull: {
    strokeDash: "5,5",
    strokeWidth: 2,
    description: "Pull flow - system pulls data from another system"
  },
  transform: {
    strokeDash: "10,2",
    strokeWidth: 3,
    description: "Transform flow - profile data is transformed between formats"
  },
  error: {
    strokeDash: "5,2,2,2",
    strokeWidth: 2,
    strokeColor: "#ef4444",
    description: "Error flow - fallout path for errors"
  }
};

// System components data
export const systemComponents = {
  // Entry Points
  traveler: {
    id: 'traveler',
    type: 'source',
    name: 'Traveler',
    icon: 'User',
    connections: ['customerProfileUI'],
    flowType: 'push',
    description: 'Individual traveler who updates their own profile information',
    position: { x: 0, y: 1, z: 0 },
    isStartPoint: true
  },
  travelArranger: {
    id: 'travelArranger',
    type: 'source',
    name: 'Travel Arranger',
    icon: 'UserCog',
    connections: ['customerProfileUI'],
    flowType: 'push',
    description: 'Person who arranges travel on behalf of others and can update their profiles',
    position: { x: 0, y: 2, z: 0 },
    isStartPoint: true
  },
  clientAdmin: {
    id: 'clientAdmin',
    type: 'source',
    name: 'Client Admin',
    icon: 'Users',
    connections: ['adminProfileUI'],
    flowType: 'push',
    description: 'Client administrator who manages multiple traveler profiles',
    position: { x: 0, y: 3, z: 0 },
    isStartPoint: true
  },
  gtas: {
    id: 'gtas',
    type: 'source',
    name: 'GTAS / SID',
    icon: 'Database',
    connections: ['adminProfileUI'],
    flowType: 'push',
    description: 'System that provides traveler identification data',
    position: { x: 0, y: 4, z: 0 },
    isStartPoint: true
  },
  travelAgent: {
    id: 'travelAgent',
    type: 'source',
    name: 'Travel Agent',
    icon: 'Headphones',
    connections: ['connectClient'],
    flowType: 'push',
    description: 'Agent who assists travelers and can update their profiles',
    position: { x: 0, y: 5, z: 0 },
    isStartPoint: true
  },
  
  // Profile Interfaces
  customerProfileUI: {
    id: 'customerProfileUI',
    type: 'interface',
    name: 'Customer Profile UI',
    icon: 'LayoutDashboard',
    connections: ['connectProfile'],
    flowType: 'push',
    description: 'User interface for travelers to view and update their profiles',
    position: { x: 2, y: 1.5, z: 0 }
  },
  adminProfileUI: {
    id: 'adminProfileUI',
    type: 'interface',
    name: 'Admin Profile UI',
    icon: 'Settings',
    connections: ['connectProfile'],
    flowType: 'push',
    description: 'Administrative interface for managing multiple traveler profiles',
    position: { x: 2, y: 3.5, z: 0 }
  },
  connectClient: {
    id: 'connectClient',
    type: 'interface',
    name: 'Connect Client',
    icon: 'Laptop',
    connections: ['travelerProfileData'],
    flowType: 'push',
    description: 'Client interface for travel agents to access and update profiles',
    position: { x: 2, y: 5, z: 0 }
  },
  pePlus: {
    id: 'pePlus',
    type: 'interface',
    name: 'PE+',
    icon: 'Maximize',
    connections: ['travelerProfileData'],
    flowType: 'push',
    description: 'Profile Expert Plus (PE+) is a point-of-sale application deployed on travel counselor desktops',
    position: { x: 2, y: 6, z: 0 }
  },
  webIdClient: {
    id: 'webIdClient',
    type: 'interface',
    name: 'WebID Client',
    icon: 'Globe',
    connections: ['travelerProfileData'],
    flowType: 'push',
    description: 'Web-based interface for profile identification and management',
    position: { x: 2, y: 7, z: 0 }
  },
  
  // Data Providers
  citiBank: {
    id: 'citiBank',
    type: 'dataProvider',
    name: 'Citi Bank',
    icon: 'CreditCard',
    connections: ['creditCardFeed'],
    flowType: 'push',
    description: 'Provides credit card information for traveler profiles',
    position: { x: 2, y: -1, z: 0 }
  },
  masterCard: {
    id: 'masterCard',
    type: 'dataProvider',
    name: 'MasterCard',
    icon: 'CreditCard',
    connections: ['creditCardFeed'],
    flowType: 'push',
    description: 'Provides MasterCard information for traveler profiles',
    position: { x: 2, y: -2, z: 0 }
  },
  amex: {
    id: 'amex',
    type: 'dataProvider',
    name: 'Amex',
    icon: 'CreditCard',
    connections: ['creditCardFeed'],
    flowType: 'push',
    description: 'Provides American Express card information for traveler profiles',
    position: { x: 2, y: -3, z: 0 }
  },
  clientFeeds: {
    id: 'clientFeeds',
    type: 'dataProvider',
    name: 'Client feeds',
    icon: 'Database',
    connections: ['hrFeedProcessor'],
    flowType: 'push',
    description: 'Various client data feeds including HR Feed, IKEA, Hitachi, etc.',
    position: { x: 2, y: -4, z: 0 }
  },
  
  // Central Components
  connectProfile: {
    id: 'connectProfile',
    type: 'central',
    name: 'Connect Profile',
    icon: 'Database',
    connections: ['travelerProfileData'],
    flowType: 'push',
    description: 'The Connect Profile (CPr) profile system that serves as the central profile management system',
    position: { x: 4, y: 2.5, z: 0 },
    isMasterOfRecord: true
  },
  travelerProfileData: {
    id: 'travelerProfileData',
    type: 'central',
    name: 'Traveler Profile Data',
    icon: 'HardDrive',
    connections: ['profileDistributor', 'api', 'obtSystems', 'gdsSystems'],
    flowType: 'push',
    description: 'Core storage of traveler profile data that is distributed to other systems',
    position: { x: 6, y: 2.5, z: 0 }
  },
  creditCardFeed: {
    id: 'creditCardFeed',
    type: 'central',
    name: 'Credit Card feed',
    icon: 'CreditCard',
    connections: ['travelerProfileData'],
    flowType: 'push',
    description: 'Aggregates credit card information from various providers',
    position: { x: 4, y: -2, z: 0 }
  },
  hrFeedProcessor: {
    id: 'hrFeedProcessor',
    type: 'central',
    name: 'HR Feed Processor',
    icon: 'FileText',
    connections: ['travelerProfileData'],
    flowType: 'push',
    description: 'Processes HR feeds from client systems to update profiles',
    position: { x: 4, y: -4, z: 0 }
  },
  
  // Queue Systems
  profileDistributor: {
    id: 'profileDistributor',
    type: 'queue',
    name: 'Profile Distributor',
    icon: 'Share2',
    connections: ['rabbitMq', 'kafka', 'activeMqQueues'],
    flowType: 'push',
    description: 'Connect Profile Distributor (CPRD) sends profiles to downstream systems',
    position: { x: 8, y: 2.5, z: 0 }
  },
  rabbitMq: {
    id: 'rabbitMq',
    type: 'queue',
    name: 'RabbitMQ',
    icon: 'MessageSquare',
    connections: ['transformServices'],
    flowType: 'push',
    description: 'Message queue for profile synchronization with profile queueing capabilities',
    position: { x: 10, y: 1.5, z: 0 },
    hasQueueMonitoring: true
  },
  kafka: {
    id: 'kafka',
    type: 'queue',
    name: 'Kafka',
    icon: 'MessageSquare',
    connections: ['consumerApplications'],
    flowType: 'push',
    description: 'Distributed event store and streaming platform for profile updates',
    position: { x: 10, y: 2.5, z: 0 },
    hasQueueMonitoring: true
  },
  activeMqQueues: {
    id: 'activeMqQueues',
    type: 'queue',
    name: 'ActiveMQ Queues',
    icon: 'MessageSquare',
    connections: ['gbtProfileSync'],
    flowType: 'push',
    description: 'Message-oriented middleware for profile synchronization',
    position: { x: 10, y: 3.5, z: 0 },
    hasQueueMonitoring: true
  },
  
  // Transform Services
  transformServices: {
    id: 'transformServices',
    type: 'transform',
    name: 'Transform Services',
    icon: 'RefreshCw',
    connections: ['obtSystems', 'gdsSystems'],
    flowType: 'transform',
    description: 'Services that transform profile data between different formats',
    position: { x: 12, y: 1.5, z: 0 }
  },
  gbtProfileSync: {
    id: 'gbtProfileSync',
    type: 'transform',
    name: 'GBT Profile Sync',
    icon: 'RefreshCw',
    connections: ['sabreAmadeusSync'],
    flowType: 'transform',
    description: 'Profile synchronization service for GBT systems',
    position: { x: 12, y: 3.5, z: 0 }
  },
  sabreAmadeusSync: {
    id: 'sabreAmadeusSync',
    type: 'transform',
    name: 'Sabre Amadeus Sync',
    icon: 'RefreshCw',
    connections: ['templates'],
    flowType: 'transform',
    description: 'Synchronizes profiles between Sabre and Amadeus systems',
    position: { x: 14, y: 3.5, z: 0 }
  },
  templates: {
    id: 'templates',
    type: 'transform',
    name: 'Templates',
    icon: 'FileText',
    connections: ['sabreAmadeus'],
    flowType: 'transform',
    description: 'XSL templates used to transform profiles for regional/local variations',
    position: { x: 16, y: 3.5, z: 0 }
  },
  
  // API Layers
  api: {
    id: 'api',
    type: 'api',
    name: 'API',
    icon: 'Code',
    connections: ['externalClients', 'internalClients'],
    flowType: 'push',
    description: 'API layer for accessing profile data',
    position: { x: 8, y: 6, z: 0 }
  },
  externalClients: {
    id: 'externalClients',
    type: 'api',
    name: 'External Clients',
    icon: 'ExternalLink',
    connections: [],
    flowType: 'push',
    description: 'External client systems accessing profile data via API',
    position: { x: 10, y: 5.5, z: 0 }
  },
  internalClients: {
    id: 'internalClients',
    type: 'api',
    name: 'Internal Clients',
    icon: 'Link',
    connections: [],
    flowType: 'push',
    description: 'Internal client systems accessing profile data via API',
    position: { x: 10, y: 6.5, z: 0 }
  },
  
  // OBT Integrations
  obtSystems: {
    id: 'obtSystems',
    type: 'obt',
    name: 'OBT Integrations',
    icon: 'Briefcase',
    connections: [
      'concur', 'deem', 'cytric', 'neo', 'getThere', 
      'serko', 'uvet', 'hrgo', 'argo', 'citsOnline', 'connectJapan'
    ],
    flowType: 'push',
    description: 'Online Booking Tool integration systems',
    position: { x: 8, y: 0, z: 0 }
  },
  concur: {
    id: 'concur',
    type: 'obt',
    name: 'Concur',
    icon: 'Briefcase',
    connections: [],
    flowType: 'push',
    description: 'SAP Concur online booking tool and T&E solution',
    position: { x: 10, y: -3, z: 0 }
  },
  deem: {
    id: 'deem',
    type: 'obt',
    name: 'Deem',
    icon: 'Briefcase',
    connections: [],
    flowType: 'push',
    description: 'Deem (formerly AXIOM) online booking tool used primarily in the US',
    position: { x: 10, y: -2.5, z: 0 }
  },
  cytric: {
    id: 'cytric',
    type: 'obt',
    name: 'Cytric',
    icon: 'Briefcase',
    connections: [],
    flowType: 'push',
    description: 'Cytric online booking tool for travel from GBT Portal',
    position: { x: 10, y: -2, z: 0 }
  },
  neo: {
    id: 'neo',
    type: 'obt',
    name: 'Neo',
    icon: 'Briefcase',
    connections: [],
    flowType: 'push',
    description: 'KDS Neo cloud-based tool for door-to-door itineraries',
    position: { x: 10, y: -1.5, z: 0 }
  },
  getThere: {
    id: 'getThere',
    type: 'obt',
    name: 'GetThere',
    icon: 'Briefcase',
    connections: [],
    flowType: 'push',
    description: 'GetThere online booking tool used globally',
    position: { x: 10, y: -1, z: 0 }
  },
  serko: {
    id: 'serko',
    type: 'obt',
    name: 'Serko',
    icon: 'Briefcase',
    connections: [],
    flowType: 'push',
    description: 'Serko online booking tool used in Australia and APAC',
    position: { x: 10, y: -0.5, z: 0 }
  },
  uvet: {
    id: 'uvet',
    type: 'obt',
    name: 'Uvet',
    icon: 'Briefcase',
    connections: [],
    flowType: 'push',
    description: 'Uvet online booking tool',
    position: { x: 10, y: 0, z: 0 }
  },
  hrgo: {
    id: 'hrgo',
    type: 'obt',
    name: 'HRGO',
    icon: 'Briefcase',
    connections: [],
    flowType: 'push',
    description: 'HRG/Hogg Robinson Group - part of American Express GBT',
    position: { x: 10, y: 0.5, z: 0 }
  },
  argo: {
    id: 'argo',
    type: 'obt',
    name: 'Argo',
    icon: 'Briefcase',
    connections: [],
    flowType: 'push',
    description: 'Argo online booking tool',
    position: { x: 10, y: 1, z: 0 }
  },
  citsOnline: {
    id: 'citsOnline',
    type: 'obt',
    name: 'CITS online',
    icon: 'Briefcase',
    connections: [],
    flowType: 'push',
    description: 'CITS online booking tool',
    position: { x: 10, y: 1.5, z: 0 }
  },
  connectJapan: {
    id: 'connectJapan',
    type: 'obt',
    name: 'Connect (Japan)',
    icon: 'Briefcase',
    connections: [],
    flowType: 'push',
    description: 'Connect system for the Japanese market',
    position: { x: 10, y: 2, z: 0 }
  },
  
  // GDS Integrations
  gdsSystems: {
    id: 'gdsSystems',
    type: 'gds',
    name: 'GDS Integrations',
    icon: 'Globe',
    connections: ['sabre', 'apollo', 'galileo', 'amadeus'],
    flowType: 'push',
    description: 'Global Distribution System integrations',
    position: { x: 8, y: 5, z: 0 }
  },
  sabre: {
    id: 'sabre',
    type: 'gds',
    name: 'Sabre',
    icon: 'Globe',
    connections: [],
    flowType: 'push',
    description: 'Sabre GDS for travel reservation services',
    position: { x: 10, y: 4, z: 0 }
  },
  apollo: {
    id: 'apollo',
    type: 'gds',
    name: 'Apollo',
    icon: 'Globe',
    connections: [],
    flowType: 'push',
    description: 'Apollo GDS for travel reservation services',
    position: { x: 10, y: 4.5, z: 0 }
  },
  galileo: {
    id: 'galileo',
    type: 'gds',
    name: 'Galileo',
    icon: 'Globe',
    connections: [],
    flowType: 'push',
    description: 'Galileo GDS for travel reservation services',
    position: { x: 10, y: 5, z: 0 }
  },
  amadeus: {
    id: 'amadeus',
    type: 'gds',
    name: 'Amadeus',
    icon: 'Globe',
    connections: [],
    flowType: 'push',
    description: 'Amadeus GDS for travel reservation services',
    position: { x: 10, y: 5.5, z: 0 }
  },
  sabreAmadeus: {
    id: 'sabreAmadeus',
    type: 'gds',
    name: 'Sabre Amadeus',
    icon: 'Globe',
    connections: [],
    flowType: 'push',
    description: 'Amadeus GDS allowing features related to flights, hotels, car transfers',
    position: { x: 18, y: 3.5, z: 0 }
  },
  
  // Consumer Applications
  consumerApplications: {
    id: 'consumerApplications',
    type: 'consumer',
    name: 'Consumer Applications',
    icon: 'Monitor',
    connections: ['cprd', 'okta', 'dataLake', 'knowMe', 'sfdc', 'solr'],
    flowType: 'push',
    description: 'Applications requiring profile data',
    position: { x: 12, y: 2.5, z: 0 }
  },
  cprd: {
    id: 'cprd',
    type: 'consumer',
    name: 'CPRd',
    icon: 'Monitor',
    connections: [],
    flowType: 'push',
    description: 'Connect Profile Distributor application',
    position: { x: 14, y: 0, z: 0 }
  },
  okta: {
    id: 'okta',
    type: 'consumer',
    name: 'Okta',
    icon: 'Shield',
    connections: [],
    flowType: 'push',
    description: 'Identity and access management for user authentication',
    position: { x: 14, y: 0.5, z: 0 }
  },
  dataLake: {
    id: 'dataLake',
    type: 'consumer',
    name: 'Data Lake',
    icon: 'Database',
    connections: [],
    flowType: 'push',
    description: 'GBT Bigdata platform to hold enterprise-wide data',
    position: { x: 14, y: 1, z: 0 }
  },
  knowMe: {
    id: 'knowMe',
    type: 'consumer',
    name: 'KnowMe',
    icon: 'Search',
    connections: [],
    flowType: 'push',
    description: 'System that collects phone numbers and links them to individual people',
    position: { x: 14, y: 1.5, z: 0 }
  },
  sfdc: {
    id: 'sfdc',
    type: 'consumer',
    name: 'SFDC',
    icon: 'Cloud',
    connections: [],
    flowType: 'push',
    description: 'Salesforce CRM tool for support, sales, and marketing',
    position: { x: 14, y: 2, z: 0 }
  },
  solr: {
    id: 'solr',
    type: 'consumer',
    name: 'SOLR',
    icon: 'Search',
    connections: [],
    flowType: 'push',
    description: 'Apache Solr enterprise-search platform for profile searching',
    position: { x: 14, y: 2.5, z: 0 }
  },
  
  // Monitoring Points
  l2l3Support: {
    id: 'l2l3Support',
    type: 'monitor',
    name: 'L2/L3 Support',
    icon: 'Activity',
    connections: [],
    flowType: 'pull',
    description: 'L2 and L3 support teams that monitor and triage synchronization issues',
    position: { x: 16, y: 6, z: 0 },
    isMonitoringPoint: true
  },
  falloutInbox: {
    id: 'falloutInbox',
    type: 'monitor',
    name: 'Fallout Inbox',
    icon: 'AlertTriangle',
    connections: [],
    flowType: 'error',
    description: 'Shared email inboxes where error reports are sent when sync failures occur',
    position: { x: 14, y: 6, z: 0 },
    isErrorPath: true
  },
  elkStack: {
    id: 'elkStack',
    type: 'monitor',
    name: 'ELK Stack',
    icon: 'BarChart2',
    connections: [],
    flowType: 'pull',
    description: 'Elasticsearch, Logstash, and Kibana for log aggregation and analysis',
    position: { x: 16, y: 5, z: 0 },
    isMonitoringPoint: true
  },
  newRelic: {
    id: 'newRelic',
    type: 'monitor',
    name: 'NewRelic',
    icon: 'Activity',
    connections: [],
    flowType: 'pull',
    description: 'Monitoring technology that tracks web and mobile applications in real-time',
    position: { x: 16, y: 4, z: 0 },
    isMonitoringPoint: true
  }
};
