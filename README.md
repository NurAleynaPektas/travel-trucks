
# TravelTrucks 

**TravelTrucks** is a camper rental catalog built with **React**, **React Router** and **Redux Toolkit**.  
Users can browse campers, filter them by different criteria, mark favorites and open a detailed page with reviews and a booking form.

Routes:

- `/` – Home (hero section with CTA)
- `/catalog` – Catalog with filters + campers list
- `/catalog/:id` – Camper details page

---

## Main Features

### Home Page
- Full-width hero with background image (`Picture.png`)
- Short headline & subtitle
- **“View Now”** button that navigates to `/catalog`

### Catalog Page
- Two-column layout:
  - **Left:** Filters panel
  - **Right:** Camper cards list
- Pagination with **“Load more”** button
- Global loader while fetching campers

### Filters Panel
- **Location** input (`City, Country`)
- **Vehicle equipment** multi-select:
  - AC, Kitchen, Bathroom, TV, Radio, Refrigerator, Microwave, Gas, Water
- **Vehicle type**:
  - Van, Fully Integrated, Alcove
- **Search** button → dispatches `fetchCampers({ page: 1, limit: 4 })`
- **Reset** button → clears filters + reloads initial campers

### Camper Cards
- Camper image (with fallback image)
- Name and formatted price (`€8000.00`)
- **Favorite** heart button (toggled via Redux)
- Rating with star icon
- Location with pin icon
- Short description (auto-truncated)
- Tag chips with icons:
  - `adults`, `transmission`, `engine`
- **“Show more”** link to `/catalog/:id` (opens in new tab)

### Camper Details Page (`/catalog/:id`)
- Full camper information (based on selected camper)
- Components:
  - `BookingForm` – simple booking request form
  - `Reviews` – camper reviews section
- Uses **React Router params** to read camper `id`

### Favorites
- `favoritesSlice` stores favorite camper IDs
- Heart icon on each card toggles the camper in/out of favorites

## 🛠 Tech Stack

- **React** (Vite)
- **React Router v6**
- **Redux Toolkit**
  - `campersSlice` – campers list, loading, pagination, hasMore
  - `filtersSlice` – location, vehicleType, equipment
  - `favoritesSlice` – favorite camper IDs
- **Async thunks** for API calls (`fetchCampers`)
- **CSS Modules** for scoped styling
- **Inline SVG icons** for:
  - Filters chips
  - Camper cards (star, location, adults, transmission, engine, heart)

---

## 📂 Project Structure

```bash
src/
  components/
    BookingForm/
      BookingForm.jsx
      BookingForm.module.css
    CamperCard/
      CamperCard.jsx
      CamperCard.module.css
    FiltersPanel/
      FiltersPanel.jsx
      FiltersPanel.module.css
    Header/
      Header.jsx
      Header.module.css
    Layout/
      Layout.jsx
      Layout.module.css
    Loader/
      Loader.jsx
      Loader.module.css
    Reviews/
      Reviews.jsx
      Reviews.module.css

  pages/
    Home/
      Home.jsx
      Home.module.css
    Catalog/
      Catalog.jsx
      Catalog.module.css
    CamperDetails/
      CamperDetails.jsx
      CamperDetails.module.css

  services/
    campersApi.js        # API helper for fetching campers

  store/
    campersSlice.js
    favoritesSlice.js
    filtersSlice.js
    store.js             # configureStore

  styles/
    globals.css
    App.css

  App.jsx                # Routes configuration
  main.jsx               # ReactDOM root
