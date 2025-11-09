import Header from "../Header/Header";
import s from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={s.app}>
      <Header />
      <main className={s.main}>{children}</main>
    </div>
  );
}
