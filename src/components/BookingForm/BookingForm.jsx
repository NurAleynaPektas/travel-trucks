import { useState } from "react";
import s from "./BookingForm.module.css";

export default function BookingForm({ camperName }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    comment: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.date) {
      return;
    }

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);

    setForm({
      name: "",
      email: "",
      date: "",
      comment: "",
    });
  };

  return (
    <div>
      <h2 className={s.title}>Book your trip</h2>
      <p className={s.subtitle}>
        We will contact you to confirm your reservation for {camperName}.
      </p>

      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className={s.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className={s.input}
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <textarea
          className={s.textarea}
          name="comment"
          placeholder="Comment"
          value={form.comment}
          onChange={handleChange}
          rows={4}
        />

        <button type="submit" className={s.submitBtn}>
          Send
        </button>

        {success && (
          <div className={s.success}>
            Reservation request sent successfully!
          </div>
        )}
      </form>
    </div>
  );
}
