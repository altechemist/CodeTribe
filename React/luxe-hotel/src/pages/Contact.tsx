import ContactForm from "../components/ContactForm";
import Heading from "../components/Heading";

function Contact() {
  return (
    <div className="container-fluid">
      <Heading title="Contact Us" />

      <p className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni,
        reiciendis! Quia incidunt harum eum, at sequi magni ex, obcaecati
        eveniet quo natus voluptatum expedita aliquam odit culpa? Dicta,
        inventore earum!
      </p>

      <div className="d-flex">
        <div className="col">
          <ContactForm />
        </div>
        <div className="col">
        <Heading title="Our Location" />
          <div className="d-flex flex-column flex-row w-100 gap-2">
            <iframe
              className="img-fluid"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.3552250657453!2d24.75188324732576!3d-28.738809299999986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9b1a560fea20ef%3A0xd4b321df092b543!2sThe%20Big%20Hole%20Museum!5e0!3m2!1sen!2sza!4v1726297440242!5m2!1sen!2sza"
              height="450"
              style={{ border: "0" }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
