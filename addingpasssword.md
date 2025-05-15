# AI Instructions: Adding Client-Side Password Protection to a React App on GitHub Pages

## Goal:
Implement a basic client-side password protection mechanism for a React application hosted on GitHub Pages. This will act as a deterrent for casual access, not as a high-security solution.

## Core Principle:
The protection will rely on comparing a user-entered password with a pre-hashed password.
1.  The **plain-text password** will be hashed **once** by the developer locally.
2.  This **pre-computed hash** will be stored as a **GitHub Secret**.
3.  During the application's build process (via GitHub Actions), the **pre-computed hash** will be injected as an **environment variable** into the React application bundle.
4.  The React application will prompt the user for a password.
5.  The user-entered password will be hashed on the client-side.
6.  This newly hashed input will be compared against the injected pre-computed hash.
7.  Access to the main application content will be granted only if the hashes match.

## Prerequisites for the AI (You should be able to):
* Create, read, and modify files within a standard React project structure.
* Write React functional components and utilize hooks (`useState`, `useEffect`).
* Implement JavaScript logic, including asynchronous operations (`async/await`).
* Add and manage project dependencies using `npm` or `yarn`.
* Generate a simple Node.js script for a one-off utility task.
* Modify GitHub Actions workflow YAML files to include environment variables from secrets.
* Understand the concept of client-side password hashing and use a library for it.
* Understand how environment variables (e.g., `process.env.REACT_APP_...` or `process.env.VITE_...`) are accessed in a React build.

## Implementation Steps:

### Step 1: Install Client-Side Hashing Library
* **Action:** Add the `bcrypt.js` library to the project's dependencies.
    * Identify the package manager used by the project (`npm` or `yarn`).
    * Execute the appropriate command to install `bcrypt.js` and save it as a dependency.

### Step 2: Create a Password Hashing Utility Script (For Developer's Local Use)
* **Action:** Create a new JavaScript file in the project's root directory (e.g., `generate-hash.js`). This script is **NOT** part of the React application bundle and should ideally be added to `.gitignore` after use, or at least the plain password within it should never be committed.
* **Script Logic:**
    1.  Require the `bcrypt.js` library.
    2.  Define a variable holding the desired plain-text password (the developer will provide this).
    3.  Define a salt rounds variable (e.g., 10).
    4.  Use `bcrypt.hash()` to generate a hash of the plain-text password.
    5.  Print the generated hash to the console.
    6.  Include error handling for the hashing process.
* **Guidance for AI:** Inform the developer that they need to run this script locally (e.g., `node generate-hash.js`) to obtain the hashed password for the next step.

### Step 3: GitHub Secret Configuration (Instruction for Developer)
* **Action:** You, the AI, need to instruct the developer to perform the following manual steps in their GitHub repository:
    1.  Run the `generate-hash.js` script (from Step 2) to get the hashed password.
    2.  Navigate to the GitHub repository's `Settings` tab.
    3.  Go to `Secrets and variables` > `Actions` in the sidebar.
    4.  Click on `New repository secret`.
    5.  For the secret's **Name**:
        * If the project uses Create React App, it must start with `REACT_APP_`. Suggest `REACT_APP_PASSWORD_HASH`.
        * If the project uses Vite, it must start with `VITE_`. Suggest `VITE_PASSWORD_HASH`.
        * Otherwise, advise the developer to use the appropriate prefix for their build tool.
    6.  For the secret's **Value**: Paste the hashed password obtained from the utility script.
    7.  Add the secret.

### Step 4: Modify GitHub Actions Workflow for Deployment
* **Action:** Locate the GitHub Actions workflow YAML file responsible for building and deploying the React application to GitHub Pages (commonly found in `.github/workflows/`).
* **Modification Logic:**
    1.  In the job that performs the React application build (e.g., `npm run build` or `yarn build`):
    2.  Add an `env` block if it doesn't exist.
    3.  Within the `env` block, define an environment variable that matches the name used for the GitHub Secret (e.g., `REACT_APP_PASSWORD_HASH` or `VITE_PASSWORD_HASH`).
    4.  Set its value to the GitHub Secret using the syntax: `${{ secrets.YOUR_SECRET_NAME_HERE }}` (e.g., `${{ secrets.REACT_APP_PASSWORD_HASH }}`).

### Step 5: Create a Password Entry React Component
* **Action:** Create a new React functional component file (e.g., `src/components/PasswordProtect.js`).
* **Component Logic (`PasswordProtect.js`):**
    1.  Import `React`, `useState` hook, and the `bcrypt.js` library.
    2.  Access the pre-computed hashed password from the build-time environment variable (e.g., `process.env.REACT_APP_PASSWORD_HASH` or `process.env.VITE_PASSWORD_HASH`). Store this in a constant.
    3.  Define component props: it should accept an `onAuthSuccess` callback function.
    4.  **State Management:**
        * Use `useState` to manage the current value of the password input field.
        * Use `useState` to manage an error message string (e.g., for "Incorrect password").
    5.  **JSX Structure:**
        * Render a form element.
        * Inside the form, include:
            * An `<input type="password">` field, controlled by the password state.
            * A `<button type="submit">` to submit the password.
        * Display the error message state conditionally.
        * Conditionally render a warning if the pre-computed hash environment variable is not found (indicating a configuration issue).
    6.  **Form Submission Handler (`async` function):**
        * Prevent the default form submission behavior.
        * Clear any previous error messages.
        * **Crucial Check:** Verify that the pre-computed hashed password (from the environment variable) is actually available. If not, set an appropriate error message about configuration.
        * Use `bcrypt.compare()` to compare the plain-text password from the input field state with the pre-computed hashed password.
        * **If `bcrypt.compare()` is true (match):**
            * Call the `onAuthSuccess()` prop function.
            * (Optional) Store an authentication status flag (e.g., `isAuthenticated: 'true'`) in `sessionStorage` to allow the user to remain "logged in" during the browser session.
        * **If `bcrypt.compare()` is false (no match):**
            * Set an appropriate error message (e.g., "Incorrect password.").
        * Include `try...catch` for error handling during the `bcrypt.compare()` operation.

### Step 6: Implement Conditional Rendering in the Main Application Component
* **Action:** Modify the project's main application component (e.g., `src/App.js`).
* **Component Logic (`App.js`):**
    1.  Import `React`, `useState`, `useEffect`, and the `PasswordProtect` component created in Step 5.
    2.  Import the component that represents your main application's content (e.g., `YourMainAppContent.js` - see Step 7).
    3.  **State Management:**
        * Use `useState` to manage an `isAuthenticated` boolean state, initialized to `false`.
    4.  **Effect Hook (`useEffect`):**
        * If `sessionStorage` was used in Step 5 for persistence, use `useEffect` (running once on component mount) to check for the authentication flag in `sessionStorage`.
        * If the flag exists and indicates authentication, update the `isAuthenticated` state to `true`.
    5.  **Conditional Rendering Logic:**
        * If `isAuthenticated` is `false`:
            * Render the `PasswordProtect` component.
            * Pass a callback function to its `onAuthSuccess` prop. This callback should update the `isAuthenticated` state in `App.js` to `true`.
        * If `isAuthenticated` is `true`:
            * Render the main application content component (e.g., `<YourMainAppContent />`).

### Step 7: Define Placeholder for Main Application Content
* **Action:** Ensure a React component exists that represents the actual content of the application to be displayed after successful password entry.
* **Example:** Create a simple placeholder component (e.g., `src/YourMainAppContent.js`) if one doesn't already exist.
    ```jsx
    // src/YourMainAppContent.js (Example structure)
    // import React from 'react';
    //
    // const YourMainAppContent = () => {
    //   return (
    //     <div>
    //       <h1>Welcome to the Protected App!</h1>
    //       {/* Your actual app content goes here */}
    //     </div>
    //   );
    // };
    //
    // export default YourMainAppContent;
    ```
    (You can provide the above stub structure to the AI, as it's more about the existence of this component than complex logic within it for this task).

