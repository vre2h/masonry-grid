# Masonry Photo Grid Application

This is a **Masonry Photo Grid Application** built with React, TypeScript, and Vite. It implements a virtualized masonry grid layout for efficient rendering of large datasets, a photo detail view, and a search feature with debounced API calls.

## Features

- **Virtualized Masonry Grid**: Displays images dynamically while only rendering visible items for performance optimization.
- **Photo Detail View**: Provides detailed information about each photo, including title, photographer, and date taken.
- **Search Functionality**: Allows users to search photos with debounced query handling.
- **Infinite Scrolling**: Dynamically loads more images as the user clicks the "Load More" button.
- **Responsive Design**: Optimized for various screen sizes.

---

## Installation and Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**

### Clone the Repository

```bash
git clone https://github.com/your-username/masonry-photo-grid.git
cd masonry-photo-grid
```

### Install Dependencies

```bash
npm install
```

### Add `.env` variables:
**Note**, I've added them to the submit form field with task url to avoid publishing it to github.

```
VITE_PEXELS_KEY=
VITE_PEXELS_BASE_URL=
```

### Run the Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The optimized production build will be available in the `dist` folder.

### Preview the Production Build

```bash
npm run preview
```

---

## Design Decisions

### Framework and Tooling

- **Vite**: Chosen for its fast development environment and optimized builds.
- **React**: Used for building the UI with component-based architecture.
- **TypeScript**: Ensures type safety and robust code.

### Architecture

- **Component-Based**: The application is modular, with reusable components such as `VirtualizedMasonryGrid`, `PhotoDetail`, and `MasonryGrid`.
- **Custom Hooks**: The `usePhotos` hook handles API integration, state management, and pagination.

---

## Performance Enhancements

### Techniques Used

1. **Virtualization**:

   - The grid only renders visible items, ensuring performance is not degraded with large datasets.

2. **Debounced Search**:

   - Implemented a reusable `debounce` utility to delay API calls until the user stops typing.

3. **Memoization**:

   - Used `useMemo` and `useCallback` for derived states and event handlers to avoid unnecessary re-renders.

4. **Responsive Design**:

   - CSS grid layout adapts to different screen sizes seamlessly.

5. **Optimized Builds**:
   - Vite ensures fast development and optimized production builds with tree-shaking and code splitting.

### Tools Used

- **React Developer Tools and Chrome Developer Tools**: For debugging component behavior.
- **LightHouse**: To analyze and optimize network requests and rendering.

---

## Author

[Oganisyan Vrezh](https://oganisyan.com)
