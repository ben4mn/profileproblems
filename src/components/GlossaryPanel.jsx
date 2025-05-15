import React from 'react';
import { XCircle, Search, Book } from 'lucide-react';

// Glossary terms
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

const GlossaryPanel = ({ onClose, searchTerm, setSearchTerm }) => {
  // Filter glossary terms by search
  const filteredGlossaryTerms = searchTerm
    ? Object.entries(glossaryTerms).filter(([term, _]) => 
        term.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : Object.entries(glossaryTerms);
  
  return (
    <div className="bg-white rounded-lg shadow-md w-1/3 max-w-md transition-all duration-300 overflow-hidden">
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg flex items-center">
            <Book className="mr-2" size={20} />
            CPR Architecture Glossary
          </h3>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <XCircle size={20} />
          </button>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search terms..."
            className="w-full p-2 pl-10 border rounded-md text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
      
      <div className="p-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
        <div className="divide-y">
          {filteredGlossaryTerms.length > 0 ? (
            filteredGlossaryTerms.map(([term, definition]) => (
              <div key={term} className="py-3">
                <h4 className="font-medium text-indigo-700">{term}</h4>
                <p className="text-sm text-gray-700 mt-1">{definition}</p>
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-gray-500">
              No glossary terms found matching "{searchTerm}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlossaryPanel;