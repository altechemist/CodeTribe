import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Heading from "../components/Heading";

function Contact() {
  return (
    <><div className="container-fluid">
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
      
      </div>
    </div><Footer /></>
  );
}

export default Contact;
