import Banner from "../../components/Banner/Banner";
import Feature from "../../components/Feature/Feature";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <Feature
            img="./img/icon-chat.png"
            title="You are our #1 priority"
            text="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
          />
          <Feature
            img="./img/icon-money.png"
            title="More savings means higher rates"
            text="The more you save with us, the higher your interest rate will be!"
          />
          <Feature
            img="./img/icon-security.png"
            title="Security you can trust"
            text="We use top of the line encryption to make sure your data and money is always safe."
          />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
