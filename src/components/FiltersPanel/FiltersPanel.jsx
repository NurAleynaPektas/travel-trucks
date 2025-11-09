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

    
      <div className={s.block}>
        <div className={s.label}>Vehicle type</div>
        <div className={s.types}>
          <button
            type="button"
            className={`${s.typeBtn} ${
              filters.vehicleType === "panelTruck" ? s.typeBtnActive : ""
            }`}
            onClick={() => handleVehicleTypeClick("panelTruck")}
          >
            Van
          </button>
          <button
            type="button"
            className={`${s.typeBtn} ${
              filters.vehicleType === "fullyIntegrated" ? s.typeBtnActive : ""
            }`}
            onClick={() => handleVehicleTypeClick("fullyIntegrated")}
          >
            Fully Integrated
          </button>
          <button
            type="button"
            className={`${s.typeBtn} ${
              filters.vehicleType === "alcove" ? s.typeBtnActive : ""
            }`}
            onClick={() => handleVehicleTypeClick("alcove")}
          >
            Alcove
          </button>
        </div>
      </div>

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
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      
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
