import { useDispatch, useSelector } from "react-redux";
import {
  selectFilters,
  setLocation,
  setVehicleType,
  toggleEquipment,
  resetFilters,
} from "../../store/filtersSlice";
import { fetchCampers } from "../../store/campersSlice";
import s from "./FiltersPanel.module.css";

const EQUIPMENT_OPTIONS = [
  { key: "AC", label: "AC" },
  { key: "kitchen", label: "Kitchen" },
  { key: "bathroom", label: "Bathroom" },
  { key: "TV", label: "TV" },
  { key: "radio", label: "Radio" },
  { key: "refrigerator", label: "Refrigerator" },
  { key: "microwave", label: "Microwave" },
  { key: "gas", label: "Gas" },
  { key: "water", label: "Water" },
];

const VEHICLE_TYPES = [
  { value: "panelTruck", label: "Van", iconKey: "van" },
  { value: "fullyIntegrated", label: "Fully Integrated", iconKey: "fully" },
  { value: "alcove", label: "Alcove", iconKey: "alcove" },
];

/* 🔹 BÜTÜN İKONLAR BURADA – dışarıdan SVG dosyası gerekmiyor */
const ICONS = {
  AC: (
    <svg viewBox="0 0 24 24" className={s.iconSvg}>
      <path
        d="M4 9c1 0 2-.5 3-1s2-.9 3-.9 2 .4 3 .9 2 1 3 1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4 15c1 0 2-.5 3-1s2-.9 3-.9 2 .4 3 .9 2 1 3 1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  ),
  kitchen: (
    <svg viewBox="0 0 24 24" className={s.iconSvg}>
      <rect
        x="6"
        y="5"
        width="12"
        height="10"
        rx="1.5"
        ry="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 9h6M9 12h3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 19h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  bathroom: (
    <svg viewBox="0 0 24 24" className={s.iconSvg}>
      <rect
        x="5"
        y="10"
        width="14"
        height="6"
        rx="3"
        ry="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8 10V7a2 2 0 0 1 4 0v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M7 17v1.5M17 17v1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  TV: (
    <svg viewBox="0 0 24 24" className={s.iconSvg}>
      <rect
        x="4"
        y="6"
        width="16"
        height="10"
        rx="1.5"
        ry="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M10 18l-2 3M14 18l2 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  radio: (
    <svg viewBox="0 0 24 24" className={s.iconSvg}>
      <rect
        x="4"
        y="8"
        width="16"
        height="9"
        rx="1.5"
        ry="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8 11h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle
        cx="17"
        cy="12.5"
        r="1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M6 7l10-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  refrigerator: (
    <svg viewBox="0 0 24 24" className={s.iconSvg}>
      <rect
        x="8"
        y="4"
        width="8"
        height="16"
        rx="1.5"
        ry="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M8 11h8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9.5 8v2M9.5 13v2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  microwave: (
    <svg viewBox="0 0 24 24" className={s.iconSvg}>
      <rect
        x="4"
        y="7"
        width="16"
        height="10"
        rx="1.5"
        ry="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="7"
        y="9"
        width="7"
        height="6"
        rx="0.8"
        ry="0.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="17" cy="10" r="0.8" fill="currentColor" />
      <circle cx="17" cy="13" r="0.8" fill="currentColor" />
    </svg>
  ),
  gas: (
    <svg viewBox="0 0 24 24" className={s.iconSvg}>
      <path
        d="M10 5c-1.5 2-3 3.5-3 6a5 5 0 0 0 10 0c0-2.5-1.5-4-3-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  water: (
    <svg viewBox="0 0 24 24" className={s.iconSvg}>
      <path
        d="M12 4s-4 4.5-4 8a4 4 0 0 0 8 0c0-3.5-4-8-4-8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  van: (
    <svg viewBox="0 0 24 24" className={s.iconSvg}>
      <rect
        x="4"
        y="9"
        width="14"
        height="7"
        rx="1.5"
        ry="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M10 9V7h5l3 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="8"
        cy="17"
        r="1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="16"
        cy="17"
        r="1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  ),
  fully: (
    <svg viewBox="0 0 24 24" className={s.iconSvg}>
      <rect
        x="5"
        y="8"
        width="14"
        height="7"
        rx="1.5"
        ry="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="7"
        y="6"
        width="7"
        height="3"
        rx="1"
        ry="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle
        cx="9"
        cy="17"
        r="1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="17"
        cy="17"
        r="1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  ),
  alcove: (
    <svg viewBox="0 0 24 24" className={s.iconSvg}>
      <path
        d="M6 10h11l2 2v4H5v-5a1 1 0 0 1 1-1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 8h5l2 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="8"
        cy="17"
        r="1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="17"
        cy="17"
        r="1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  ),
};

export default function FiltersPanel() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handleLocationChange = (e) => {
    dispatch(setLocation(e.target.value));
  };

  const handleVehicleTypeClick = (value) => {
    if (filters.vehicleType === value) {
      dispatch(setVehicleType(null));
    } else {
      dispatch(setVehicleType(value));
    }
  };

  const handleEquipmentToggle = (key) => {
    dispatch(toggleEquipment(key));
  };

  const handleSearch = () => {
    dispatch(fetchCampers({ page: 1, limit: 4 }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(fetchCampers({ page: 1, limit: 4 }));
  };

  return (
    <div className={s.panel}>
      {/* Location */}
      <div className={s.block}>
        <label className={s.label}>Location</label>
        <input
          type="text"
          value={filters.location}
          onChange={handleLocationChange}
          placeholder="City, Country"
          className={s.input}
        />
      </div>

      {/* Vehicle type */}
      <div className={s.block}>
        <div className={s.label}>Vehicle type</div>
        <div className={s.types}>
          {VEHICLE_TYPES.map((type) => {
            const active = filters.vehicleType === type.value;
            return (
              <button
                key={type.value}
                type="button"
                className={`${s.typeBtn} ${active ? s.typeBtnActive : ""}`}
                onClick={() => handleVehicleTypeClick(type.value)}
              >
                <span className={s.iconWrap}>{ICONS[type.iconKey]}</span>
                <span className={s.typeLabel}>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vehicle equipment */}
      <div className={s.block}>
        <div className={s.label}>Vehicle equipment</div>
        <div className={s.equipmentGrid}>
          {EQUIPMENT_OPTIONS.map((item) => {
            const active = filters.equipment.includes(item.key);
            return (
              <button
                key={item.key}
                type="button"
                className={`${s.equipBtn} ${active ? s.equipBtnActive : ""}`}
                onClick={() => handleEquipmentToggle(item.key)}
              >
                <span className={s.iconWrap}>{ICONS[item.key]}</span>
                <span className={s.equipLabel}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className={s.actions}>
        <button type="button" className={s.searchBtn} onClick={handleSearch}>
          Search
        </button>
        <button type="button" className={s.resetBtn} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
