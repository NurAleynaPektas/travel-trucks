import s from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={s.backdrop}>
      <div className={s.spinner} />
    </div>
  );
}
