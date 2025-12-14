# Learning Guide: Building a Scalable ERP with React & Firebase

Welcome! This project is designed not just to be a functional ERP (Enterprise Resource Planning) system, but also a **learning resource**.

We have structured this project to mimic professional, large-scale application architecture.

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

We enforce this in two places:
1.  **Routing**: `ProtectedRoute` prevents users from visiting URLs they shouldn't see.
2.  **UI**: We hide/disable buttons based on roles.

## 4. Next Steps for You

1.  Explore `src/types/auth.types.ts` to see how we define Roles.
2.  Check `src/context/AuthContext.tsx` to understand how we track the logged-in user.
3.  Look at `src/pages/DashboardPage.tsx` to see how the Sidebar changes based on the role.
