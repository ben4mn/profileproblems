# CPR Architecture Visualization Update Instructions

This document outlines step-by-step instructions for transforming the current Telecom System Visualization into an accurate CPR (Customer Profile Record) Architecture Visualization based on the provided documentation.

## Phase 1: System Renaming and Conceptual Updates

1. **Update Application Name and Description**
   - Change all references from "Telecom System Visualization Suite" to "CPR Architecture Visualization Suite"
   - Update the application description to "Interactive visualization of traveler profile synchronization system"
   - Modify the footer text to reflect the new application name

2. **Update Conceptual Framework**
   - Replace "call flow" concept with "profile river" concept from documentation
   - Update tab names to reflect profile synchronization rather than telephony
   - Rename "Scenario Simulator" to "Profile Update Simulator"

## Phase 2: Component Structure Redesign

3. **Define New Component Types**
   - Create the following component types:
     - Source System (systems where profile updates originate)
     - Target System (systems receiving profile updates)
     - Queue System (profile queuing points)
     - Transform Service (profile transformation points)
     - API/Service (connection points between systems)
     - Consumer System (end-point systems using profiles)
     - Monitoring Point (where system health is observed)

4. **Define Color Scheme**
   - Assign distinct colors to each component type
   - Create distinct visual indicators for:
     - Push flows vs Pull flows
     - Master/System of Record indicators
     - Queue levels
     - Transformation points
     - Error/fallout paths

5. **Create New Component List**
   - Replace current components with:

     **Entry Points:**
     - Traveler
     - Travel Arranger
     - Client Admin
     - GTAS/SID
     - Travel Agent

     **Profile Interfaces:**
     - Customer Profile UI
     - Admin Profile UI
     - Connect Client
     - PE+
     - WebID Client

     **Data Providers:**
     - Citi Bank
     - MasterCard
     - Amex
     - Client feeds (HR Feed, IKEA, Hitachi)

     **Central Components:**
     - Connect Profile
     - Traveler Profile Data
     - Credit Card feed
     - HR Feed Processor

     **Queue Systems:**
     - RabbitMQ
     - Kafka
     - ActiveMQ Queues

     **OBT Integrations:**
     - Concur
     - Deem
     - Cytric
     - Neo
     - GetThere
     - Serko
     - Uvet
     - HRGO
     - Argo
     - CITS online
     - Connect (Japan)

     **GDS Integrations:**
     - Sabre
     - Apollo
     - Galileo
     - Amadeus

     **Consumer Applications:**
     - CPRd
     - Okta
     - Data Lake
     - KnowMe
     - SFDC
     - SOLR

     **API Layers:**
     - API for External Clients
     - API for Internal Clients

## Phase 3: Flow Implementation

6. **Define Connection Types**
   - Implement directional flow indicators
   - Create different line styles for:
     - Push connections
     - Pull connections
     - Transformation paths
     - Error/fallout paths

7. **Implement Flow Starting Points**
   - Add visual indicators for "yellow starting points" mentioned in documentation
   - Allow user to select any starting point to visualize a profile update flow

8. **Implement Flow Branching**
   - Add visualization for "split into two or more flows" as mentioned in documentation
   - Show how profile updates can flow to multiple downstream systems

9. **Add Queue Visualization**
   - Implement visual representation of queues
   - Add indicators for queue levels (metaphorical "water dams")

## Phase 4: Detailed Information Display

10. **Create Component Detail Panels**
    - Design expanded view for each component showing:
      - Component name and type
      - Detailed description from documentation
      - Role in the profile synchronization process
      - Links to related systems
      - Technical details from glossary

11. **Implement Glossary Integration**
    - Create a searchable glossary tab with all terms from documentation
    - Make technical terms in component descriptions clickable to show definitions
    - Include abbreviation explanations

12. **Add Documentation References**
    - Include text explaining key concepts (Push, Pull, Transform, etc.)
    - Add notes about "Master of Record" vs "System of Record" terminology
    - Include links to more detailed flow diagrams as mentioned in documentation

## Phase 5: Interactive Features

13. **Implement Path Highlighting**
    - Add ability to highlight full synchronization paths
    - Implement tracing of profile updates from source to target systems
    - Add animation option to show flow of profiles through the system

14. **Add Filtering Capabilities**
    - Implement filters for:
      - Integration types (OBT, GDS)
      - Flow types (Push vs Pull)
      - System types (Source, Target, etc.)
      - Error/fallout paths

15. **Add Zoom and Focus Features**
    - Implement zooming capabilities for large diagram
    - Add ability to focus on specific subsystems
    - Create mini-map for navigation in the full system view

16. **Create System Health Visualization**
    - Add monitoring indicators for L2/L3 Support points
    - Include links to monitoring tools mentioned in documentation
    - Add visualization of error/fallout paths

## Phase 6: Profile Update Simulator

17. **Redesign Simulator Functionality**
    - Replace call simulation with profile update simulation
    - Allow selection of profile update type (phone number change, address update, etc.)
    - Show how updates propagate through the system

18. **Add Error Scenario Simulation**
    - Implement simulation of error conditions
    - Show fallout inbox processes
    - Visualize retry mechanisms

19. **Create Success Path Visualization**
    - Show successful synchronization paths
    - Visualize transformation steps
    - Display end-to-end latency estimates

20. **Implement Monitoring Integration**
    - Add simulated queue level monitoring
    - Show how support teams would observe system health
    - Include fallout inbox simulation

## Phase 7: Layout and Organization

21. **Reorganize Component Layout**
    - Structure layout to match documentation diagram
    - Group related components (all OBT integrations, all GDS integrations, etc.)
    - Place components according to their position in the synchronization flow

22. **Implement Subsystem Views**
    - Create detailed views for major subsystems:
      - Legacy Profile Sync
      - Connect Profile Distributor
      - CPRD: Profile Poll
      - Fallout handling

23. **Add Master Legend**
    - Create comprehensive legend explaining all symbols, colors, and line styles
    - Include visual explanation of push vs pull
    - Add documentation for error/fallout indicators

24. **Include Authorization Information**
    - Add section for Multiple Authorization Schemes
    - Include Multiple Client Hierarchy Patterns
    - Add GDPR/PCI compliance indicators

## Phase 8: Final Touches

25. **Implement Search Functionality**
    - Add search box to find components by name
    - Include ability to search glossary terms
    - Implement highlighting of search results

26. **Create Documentation Mode**
    - Add toggle for documentation mode that shows explanatory text
    - Include step-by-step guide for understanding the visualization
    - Add tooltips explaining technical concepts

27. **Add User Guide**
    - Create introduction explaining how to use the visualization
    - Include explanation of the "profile river" concept
    - Add tutorial for using the Profile Update Simulator

28. **Mobile Responsiveness**
    - Ensure the application works on different screen sizes
    - Implement collapsible panels for smaller screens
    - Create simplified view for mobile devices

Follow these steps sequentially to transform the current telecom system visualization into an accurate representation of the CPR architecture as detailed in the provided documentation, focusing on profile synchronization between systems rather than call routing.
