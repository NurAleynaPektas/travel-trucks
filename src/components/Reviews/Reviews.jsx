import s from "./Reviews.module.css";

export default function Reviews({ reviews = [] }) {
  if (!reviews.length) {
    return <p className={s.empty}>No reviews yet.</p>;
  }

  return (
    <div className={s.wrap}>
      {reviews.map((review, index) => (
        <div key={index} className={s.review}>
          <div className={s.avatar}>
            {review.reviewer_name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className={s.body}>
            <div className={s.header}>
              <div className={s.name}>{review.reviewer_name}</div>
              <div className={s.stars}>
                {Array.from({ length: 5 }).map((_, i) => {
                  const value = review.reviewer_rating ?? review.rating ?? 0;
                  const filled = i < Math.round(value);
                  return (
                    <span
                      key={i}
                      className={filled ? s.starFilled : s.starEmpty}
                    >
                      ★
                    </span>
                  );
                })}
              </div>
            </div>
            <p className={s.comment}>{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
