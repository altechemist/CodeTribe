import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

function Contact() {
  return (
    <>
      <div className="container-fluid">
        <div className="col">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
