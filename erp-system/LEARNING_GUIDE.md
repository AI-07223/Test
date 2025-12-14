
## 5. Setting up Real Firebase (Authentication)

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
5.  Copy the `firebaseConfig` object values.

### Step 5: Configure Environment Variables
1.  In this project, rename `.env.example` to `.env`.
2.  Fill in the values from your Firebase Console:
    ```
    VITE_FIREBASE_API_KEY=AIzaSy...
    VITE_FIREBASE_AUTH_DOMAIN=...
    ...
    ```
3.  Restart your server (`npm run dev`).

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
