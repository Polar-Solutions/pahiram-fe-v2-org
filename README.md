# pahiram-fe-V2


# To-Do List

This section outlines the tasks that are planned or currently being worked on for this project. Tasks are categorized for better organization and prioritization.

## Frontend Development
- [ ] **Apply lazy loading to components, libraries, etc.**

- [ ] **Mobile view of filter and search component**

- [ ] **Ensure that all cookie storing or local storage storing has http only flags in it**

- [x] **Store the filter, search, page, sort, item id, item-modal-open, state of borrowing cart in the URL**

- [ ] **Create error, 404, unauthroized, etc. pages**

- [ ] **Borrowing Cart**
    *(File: `component\ui\borrowing-cart.tsx`)
    Develop the borrowing cart as sheet.

- [ ] **Request list draft**
    Develop a request list page just to send the request in the frontend.

- [ ] **Replace with logo***
  *(File: `common\logout\page.tsx`, Line: 55)*
  Replace the placeholder with the actual logo.

- [ ] **Add loading spinner**
  *(File: `login-form.tsx`, Line: 41)*
  Implement a loading spinner for better user experience.

- [ ] **Make a terms and condition page***
  *(File: `login-form.tsx`, Line: 154)*
  Create a dedicated page for terms and conditions.

- [ ] **Make the filter, filter all the items and not just what's in the page**
  *(File: `items-container.tsx`, Line: 2)*
  Enhance the filtering logic to apply to all items.

- [ ] **Remove scrollbar when opened**
  *(File: `item-card.tsx`, Line: 13)*
  Adjust the UI to hide the scrollbar when the item is opened.

- [ ] **Replace with loading animation**
  *(File: `menu.tsx`, Line: 119)*
  Implement a smoother loading animation.

- [ ] **Change the href to first menu item***
  *(File: `sheet-menu.tsx`, Line: 24)*
  Ensure the first menu item is selected by default.

- [ ] **Fix the aliases**
  *(File: `siteConfig.ts`, Line: 8)*
  Resolve any issues related to module aliasing.

## Backend Development
- [ ] **Add these attributes in the backend**
  *(File: `interfaces.ts`, Line: 25)*
  Implement the necessary attributes in the backend for proper data handling.

- [ ] **Implement URL reading instead of useState**
  *(File: `item-modal.tsx`, Line: 18)*
  Transition from `useState` to URL-based state management.

- [ ] **Secure cookie, don't expose user data and tokens on cookie [security risk]**
  *(File: `cookies.ts`, Line: 2)*
  Improve security by ensuring sensitive data is not exposed via cookies.

- [ ] **Call the get user by email API and pass the email**
  *(File: `data-access\users.ts`, Line: 4)*
  Implement the logic to retrieve user data by email.

- [ ] **Call the logout API and pass the tokens**
  *(File: `data-access\users.ts`, Line: 8)*
  Ensure tokens are passed correctly during logout.

- [ ] **Call the server API in the env for prod**
  *(File: `data-access\users.ts`, Line: 19)*
  Adjust the API calls to use the production environment settings.

- [ ] **Use cases before returning the items**
  *(File: `use-cases\items.ts`, Line: 4)*
  Make sure all use cases are handled before item retrieval.

- [ ] **Call the logout API first before deleting the auth cookie**
  *(File: `use-cases\users.ts`, Line: 5)*
  Implement logout logic that prioritizes API calls before cookie deletion.

- [ ] **Implement business logic here**
  *(File: `use-cases\users.ts`, Line: 16)*
  Add the required business logic for user management.

- [ ] **Implement zsa**
  *(File: `authentication.ts`, Line: 11)*
  Implement the zsa feature in the authentication module.

- [ ] **Make the protected routes middlewares redirect to an error page**
  *(File: `_middleware.ts`, Line: 15)*
  Redirect users to an error page when accessing protected routes.

- [ ] **Instead of redirecting, this should redirect to an error page**
  *(File: `_middleware.ts`, Line: 147)*
  Adjust the redirect logic to point to an error page in case of unauthorized access.

