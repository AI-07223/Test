# Learning Guide: Building a Scalable ERP with React & Firebase

Welcome! This project is designed not just to be a functional ERP (Enterprise Resource Planning) system, but also a **learning resource**.

## 1. Project Structure Explained

Here is why we organized the `src` folder this way:

-   **`/components`**: Divided into `common` (reusable buttons, inputs) and `layout` (navbars, sidebars). This separation ensures that your basic UI elements are consistent across the entire app.
-   **`/context`**: React Context allows us to share "global" data (like *Who is logged in?*) without passing it down manually through every component. This is where `AuthContext` lives.
-   **`/pages`**: These are the main screens of your app (e.g., `LoginPage`, `DashboardPage`). Pages are composed of multiple *components*.
-   **`/services`**: This is the "Bridge" to the outside world. All logic that talks to Firebase or APIs goes here. This keeps your UI code clean.
-   **`/types`**: Since we are using TypeScript, we define our data shapes (Interfaces) here. For example, what properties does a `User` have?
-   **`/firebase`**: Configuration files for connecting to Firebase services.

## 2. The Hybrid Architecture (Firebase)

For an ERP, security is paramount. We use a **Hybrid Approach**:

1.  **Client-Side (React)**: We use the Firebase SDK directly to *read* data that the user is allowed to see. This is fast and reactive.
2.  **Server-Side (Conceptual)**: For sensitive actions (like "Promote User to Admin"), we would ideally call a **Cloud Function**.
    *   *Why?* If we did this on the client, a hacker could modify the JavaScript code to promote themselves. By moving this logic to the server (Cloud Function), we ensure only trusted code runs.

## 3. Role-Based Access Control (RBAC)

We implement RBAC using a hierarchical system:
*   **Super Admin**: Can do everything.
*   **Admin**: Can manage users but not system settings.
*   **Manager**: Can view reports and manage employees.
*   **Employee**: Can only view their own tasks.

## 4. Setting up Real Firebase (Authentication)

To make the Login screen work, you need to connect this app to your own Firebase project.

### Step 1: Create a Firebase Project
1.  Go to [console.firebase.google.com](https://console.firebase.google.com/).
2.  Click **Add project** and follow the steps.

### Step 2: Enable Authentication
1.  In your Firebase Console, go to **Build** > **Authentication**.
2.  Click **Get Started**.
3.  Select **Email/Password** as a Sign-in provider and **Enable** it.
4.  Click **Save**.

### Step 3: Enable Firestore (Database)
1.  Go to **Build** > **Firestore Database**.
2.  Click **Create Database**.
3.  Choose **Start in Test Mode** (for now) so you can write data easily.
4.  Select a location close to you.

### Step 4: Get API Keys
1.  Click the **Gear Icon** (Project Settings) next to "Project Overview".
2.  Scroll down to **Your apps**.
3.  Click the **Web (</>)** icon to create a web app.
4.  Give it a name (e.g., "ERP System").
5.  **Copy the `firebaseConfig` object values.**
    *   **NOTE:** You do **NOT** need to send these keys to me or anyone else. You will paste them privately into your local environment file.

### Step 5: Configure Environment Variables
1.  In this project, rename `.env.example` to `.env`.
2.  Fill in the values from your Firebase Console.
3.  **Security Tip:** The `.gitignore` file is configured to ignore `.env`. This means even if you push this code to GitHub, your keys will **not** be uploaded.

### Step 6: Create Your First Admin
1.  Go to the app's Login page.
2.  Click "Need an account? Sign Up".
3.  Create an account. **Note:** By default, you will be an **EMPLOYEE**.
4.  To make yourself an **ADMIN**:
    *   Go to Firebase Console > **Firestore Database**.
    *   Find the `users` collection.
    *   Find your User Document (ID matches your Auth UID).
    *   Change the `role` field from `EMPLOYEE` to `SUPER_ADMIN`.
5.  Refresh the app, and you will see the full dashboard!

## 5. Security & Deployment

### "Are my keys safe?"
Yes and No.
*   **Technically Public:** Anyone who visits your website can find your API Key in the browser's "Network" tab. This is normal for Firebase.
*   **Real Security:** We rely on **Firestore Security Rules**.

We have included a `firestore.rules` file in this project. You should copy the contents of this file into the **Rules** tab of your Firestore Database in the Console.

**What does it do?**
It tells Firebase: *"Even if someone has the API Key, only allow them to write data if they are logged in AND have the 'ADMIN' role."*

This is the industry standard for securing "Serverless" applications.
