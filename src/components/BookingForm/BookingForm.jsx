import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import s from "./BookingForm.module.css";

const BookingSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  date: Yup.date().required("Date is required"),
  comment: Yup.string().max(300, "Comment too long"),
});

export default function BookingForm({ camperName }) {
  const handleSubmit = (values, { resetForm }) => {
    console.log("Booking submitted:", values);

    toast.success(`Reservation for ${camperName} sent successfully!`, {
      theme: "colored",
    });


    

    resetForm();
  };

  return (
    <div>
      <h2 className={s.title}>Book your trip</h2>
      <p className={s.subtitle}>
        We will contact you to confirm your reservation for {camperName}.
      </p>

      <Formik
        initialValues={{ name: "", email: "", date: "", comment: "" }}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <div>
            <Field
              className={s.input}
              type="text"
              name="name"
              placeholder="Name"
            />
            <ErrorMessage name="name" component="div" className={s.error} />
          </div>

          <div>
            <Field
              className={s.input}
              type="email"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage name="email" component="div" className={s.error} />
          </div>

          <div>
            <Field className={s.input} type="date" name="date" />
            <ErrorMessage name="date" component="div" className={s.error} />
          </div>

          <div>
            <Field
              as="textarea"
              className={s.textarea}
              name="comment"
              placeholder="Comment"
              rows={4}
            />
            <ErrorMessage name="comment" component="div" className={s.error} />
          </div>

          <button type="submit" className={s.submitBtn}>
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
}
