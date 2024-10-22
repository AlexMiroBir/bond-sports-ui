
# Tech Design Guidelines

## 1. How to Run the Application

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AlexMiroBir/bond-sports-ui
   cd bond-sports-ui
   ```

2. **Install dependencies**:
   Make sure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm ci
   ```

3. **Run the application**:
   To start the development server, use:
   ```bash
   npm start
   ```

   This will run the app on `http://localhost:3000`.

4. **Build the application** (for production):
   If you want to build the app for production:
   ```bash
   npm run build
   ```

   This will create an optimized production build in the `build` folder.

---

## 2. Breakdown of Components

### MainPage

- **Description**: Main container for the application, including the left sidebar (`CharactersList`), right sidebar (`Favorites`), and modal window for character details.

### CharactersList

- **Description**: Displays a list of all characters with their basic information. Handles search functionality and displays filtered results. Interacts with favorites management and modal system.

### Favorites

- **Description**: Manages the list of characters marked as "favorite." Allows users to open a modal with character details.

### PersonCard

- **Description**: Reusable component displaying individual character information (image, name, etc.). Supports interaction like opening a modal or marking a character as a favorite.

### Modal

- **Description**: Displays detailed character information in a "passport-style" format. Includes interactions to close the modal and view character details.

### UI Elements

- **Description**: Reusable UI components for consistent styling across the app.

---

## 3. Services

### API Service

- **Purpose**: Fetches data from the Star Wars API (SWAPI).
- **Methods**:
    - Fetching a list of characters by page number.
    - Fetching details (home world) for a specific character by ID.

### State Management

- **Purpose**: Manages the app's state using React hooks (`useState`, `useEffect`) and `useCallback` for memoization.
- **States**:
    - **Characters**: The list of characters fetched from the API.
    - **Favorites**: Manages the list of favorite characters and persists them in `localStorage`.
    - **Modal**: Controls the visibility and content of the modal window.

---

## 4. Interaction Flow Diagram

### Component Render

- **Flow**:
    1. `MainPage` renders `CharactersList` and `Favorites`.
    2. `CharactersList` fetches and displays characters using `PersonCard`.
    3. Clicking on a character opens the modal with detailed information.

### Search

- **Flow**:
    1. The user types into the search input (with debounce 500ms).
    2. The characters list updates dynamically to display only matching results.

### Modal Interaction

- **Flow**:
    1. Clicking on a character opens a modal displaying the character's full details.
    2. The modal can be closed by clicking the close button.

### Favorites Management

- **Flow**:
    1. Clicking the star icon on a `PersonCard` toggles a character as a favorite.
    2. The `Favorites` list updates immediately to reflect the changes.
    3. Favorites are saved to `localStorage` for persistence between sessions.

### ***Partially optimized for mobile devices
