import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.logo}>TravelTrucks</div>

        <nav className={s.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.active}` : s.link
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.active}` : s.link
            }
          >
            Catalog
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
