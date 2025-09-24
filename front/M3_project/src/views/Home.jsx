import { useNavigate } from "react-router-dom";
import Text from "../components/Text";
import Service from "../components/Service";
import About from "../components/About";
import { texts } from "../helpers/texts";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  const pageContent = texts;
  const navigateTo = useNavigate();

  const navigateToRegister = () => {
    navigateTo("/register");
  };

  return (
    <div className="home">
      <section id="section-home" className="main">
        <div className="main-content">
          <h1>{pageContent.main.title}</h1>
          <Text content={pageContent.main.subtitle} type="paragraph" />
          <button className="appointment-button" onClick={navigateToRegister}>
            {pageContent.main.buttonText}
          </button>
        </div>
      </section>

      <section id="section-about" className="section">
        <About content={pageContent.about} />
      </section>

      <section id="section-services" className="section">
        <Text content={pageContent.services.title} type="title" />
        <div className="services-grid">
          {pageContent.services.items.map((service, index) => (
            <Service
              key={index}
              icon={service.icon}
              title={service.title}
              buttonText={service.buttonText}
            />
          ))}
        </div>
        <button className="more-services-button">
          {pageContent.services.moreServicesButton}
        </button>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
