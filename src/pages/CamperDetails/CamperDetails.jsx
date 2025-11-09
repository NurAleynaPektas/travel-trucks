import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCamperById,
  clearCurrent,
  selectCurrentCamper,
  selectCampersLoading,
} from "../../store/campersSlice";
import Loader from "../../components/Loader/Loader";
import BookingForm from "../../components/BookingForm/BookingForm";
import Reviews from "../../components/Reviews/Reviews";
import s from "./CamperDetails.module.css";

export default function CamperDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const camper = useSelector(selectCurrentCamper);
  const isLoading = useSelector(selectCampersLoading);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    dispatch(fetchCamperById(id));

    return () => {
      dispatch(clearCurrent());
    };
  }, [dispatch, id]);

  if (isLoading && !camper) {
    return <Loader />;
  }

  if (!camper && !isLoading) {
    return <p className={s.notFound}>Camper not found.</p>;
  }

  const {
    name,
    price,
    rating,
    reviews = [],
    location,
    gallery,
    description,
    adults,
    engine,
    transmission,
    details = {}, 
    form,
    length,
    width,
    height,
    tank,
    consumption,
    AC,
    kitchen,
    bathroom,
    TV,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
  } = camper;

  const mainImage =
    (Array.isArray(gallery) &&
      gallery.length > 0 &&
      (gallery[0]?.original || gallery[0]?.thumb)) ||
    "https://picsum.photos/600/360?campers";

  let galleryImages = [];

  if (Array.isArray(gallery) && gallery.length > 0) {
    galleryImages = gallery
      .map((item) => item?.original || item?.thumb)
      .filter(Boolean);
  }

  if (!galleryImages.length) {
    galleryImages = [mainImage];
  }

  const formattedPrice =
    typeof price === "number" ? price.toFixed(2) : Number(price).toFixed(2);
  const featureTags = [
    adults && `${adults} adults`,
    transmission,
    engine,
    (details.AC ?? AC) && "AC",
    (details.kitchen ?? kitchen) && "Kitchen",
    (details.bathroom ?? bathroom) && "Bathroom",
    (details.TV ?? TV) && "TV",
    (details.radio ?? radio) && "Radio",
    (details.refrigerator ?? refrigerator) && "Refrigerator",
    (details.microwave ?? microwave) && "Microwave",
    (details.gas ?? gas) && "Gas",
    (details.water ?? water) && "Water",
  ].filter(Boolean);

  const vehicleDetails = [
    { label: "Form", value: form },
    { label: "Length", value: length },
    { label: "Width", value: width },
    { label: "Height", value: height },
    { label: "Tank", value: tank },
    { label: "Consumption", value: consumption },
  ].filter((row) => row.value);

  return (
    <section className={s.wrap}>
      {isLoading && <Loader />}

      <h1 className={s.title}>{name}</h1>

      <div className={s.metaRow}>
        <div className={s.rating}>
          <span className={s.star}>★</span>
          <span>{rating}</span>
          <button type="button" className={s.reviewsBtn}>
            ({reviews.length} reviews)
          </button>
        </div>

        <div className={s.location}>
          <span className={s.locationIcon}>📍</span>
          <span>{location}</span>
        </div>
      </div>

      <div className={s.price}>€ {formattedPrice}</div>

      {/* GALLERY */}
      <div className={s.gallery}>
        {galleryImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`${name} ${index + 1}`}
            className={s.photo}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://picsum.photos/600/360?campers";
            }}
          />
        ))}
      </div>

      <div className={s.layout}>
        <div className={s.main}>
          <p className={s.description}>{description}</p>

          <div className={s.tabs}>
            <button
              type="button"
              className={`${s.tabBtn} ${
                activeTab === "features" ? s.tabBtnActive : ""
              }`}
              onClick={() => setActiveTab("features")}
            >
              Features
            </button>
            <button
              type="button"
              className={`${s.tabBtn} ${
                activeTab === "reviews" ? s.tabBtnActive : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          <div className={s.tabContent}>
            {activeTab === "features" && (
              <div className={s.featuresWrap}>
                <ul className={s.featureTags}>
                  {featureTags.map((tag) => (
                    <li key={tag} className={s.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className={s.detailsBlock}>
                  <h3 className={s.detailsTitle}>Vehicle details</h3>
                  <ul className={s.detailsList}>
                    {vehicleDetails.map((row) => (
                      <li key={row.label} className={s.detailsRow}>
                        <span>{row.label}</span>
                        <span>{row.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "reviews" && <Reviews reviews={reviews} />}
          </div>
        </div>

        <aside className={s.bookingAside}>
          <BookingForm camperName={name} />
        </aside>
      </div>
    </section>
  );
}
