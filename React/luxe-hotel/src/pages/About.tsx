import ContactForm from "../components/ContactForm";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import HotelInformation from "../components/HotelInformation";
import ImageGrid from "../components/ImageGrid";

function About() {
  return (
    <div className="container-fluid">
      <Heading title="About Us" />
      <p className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni,
        reiciendis! Quia incidunt harum eum, at sequi magni ex, obcaecati
        eveniet quo natus voluptatum expedita aliquam odit culpa? Dicta,
        inventore earum!
      </p>

      <HotelInformation />

      {/* Hotel Images */}
      <ImageGrid />

      {/* Testimonials */}
      {/* <Testimonials /> */}

      {/* Team Members */}
      {/* <TeamMembers /> */}

      {/* FAQ */}
      <FAQ />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
