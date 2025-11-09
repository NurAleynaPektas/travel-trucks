import { useDispatch, useSelector } from "react-redux";
import {
  selectFilters,
  setLocation,
  setVehicleType,
  toggleEquipment,
  resetFilters,
} from "../../store/filtersSlice";
import { fetchCampers } from "../../store/campersSlice";
import { ICONS } from "../../assets/icons";
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
            const Icon = ICONS[type.iconKey];

            return (
              <button
                key={type.value}
                type="button"
                className={`${s.typeBtn} ${active ? s.typeBtnActive : ""}`}
                onClick={() => handleVehicleTypeClick(type.value)}
              >
                <span className={s.iconWrap}>
                  <Icon className={s.iconSvg} />
                </span>
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
            const EqIcon = ICONS[item.key];

            return (
              <button
                key={item.key}
                type="button"
                className={`${s.equipBtn} ${active ? s.equipBtnActive : ""}`}
                onClick={() => handleEquipmentToggle(item.key)}
              >
                <span className={s.iconWrap}>
                  <EqIcon className={s.iconSvg} />
                </span>
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
