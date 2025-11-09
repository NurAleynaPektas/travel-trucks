import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, selectFavorites } from "../../store/favoritesSlice";
import s from "./CamperCard.module.css";

export default function CamperCard({ camper }) {
  const {
    id,
    name,
    price,
    rating,
    location,
    description,
    gallery,
    adults,
    engine,
    transmission,
  } = camper;

  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(String(id));

  const mainImage = gallery?.[0] || "https://picsum.photos/400/250?campers";

  const formattedPrice =
    typeof price === "number" ? price.toFixed(2) : Number(price).toFixed(2);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(id));
  };

  return (
    <article className={s.card}>
      <div className={s.imageWrap}>
        <img
          src={mainImage}
          alt={name}
          className={s.image}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://picsum.photos/400/250?campers";
          }}
        />
      </div>

      <div className={s.content}>
        <div className={s.headerRow}>
          <h2 className={s.name}>{name}</h2>

          <div className={s.priceBlock}>
            <span className={s.price}>€ {formattedPrice}</span>
            <button
              type="button"
              className={s.favBtn}
              onClick={handleFavoriteClick}
              aria-pressed={isFavorite}
            >
              <span className={isFavorite ? s.heartFilled : s.heartOutline}>
                ♥
              </span>
            </button>
          </div>
        </div>

        <div className={s.metaRow}>
          <div className={s.rating}>
            <span className={s.star}>★</span>
            <span>{rating}</span>
          </div>
          <div className={s.location}>
            <span className={s.locationIcon}>📍</span>
            <span>{location}</span>
          </div>
        </div>

        {description && (
          <p className={s.description}>
            {description.length > 90
              ? description.slice(0, 90) + "..."
              : description}
          </p>
        )}

        <ul className={s.tags}>
          {adults && <li className={s.tag}>{adults} adults</li>}
          {transmission && <li className={s.tag}>{transmission}</li>}
          {engine && <li className={s.tag}>{engine}</li>}
        </ul>

        <div className={s.footer}>
          <Link
            to={`/catalog/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={s.moreBtn}
          >
            Show more
          </Link>
        </div>
      </div>
    </article>
  );
}
