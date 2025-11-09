import { useNavigate } from "react-router-dom";
import s from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/catalog");
  };

  return (
    <section className={s.hero}>
      <div className={s.content}>
        <h1 className={s.title}>Campers of your dreams</h1>
        <p className={s.subtitle}>
          You can find everything you want in our catalog.
        </p>
        <button className={s.btn} onClick={handleClick}>
          View Now
        </button>
      </div>
    </section>
  );
}
