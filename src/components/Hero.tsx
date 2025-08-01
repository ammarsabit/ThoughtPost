import heroImage from "../assets/hero.png";

const Hero = () => {
  return (
    <section
      className="position-relative hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-content">
        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: "900",
            fontSize: "2vw",
          }}
        >
          Featured
        </h2>
        <h1
          style={{
            fontFamily: "Irish Grover, cursive",
            fontWeight: "400",
            fontSize: "3vw",
          }}
        >
          Breaking into Offensive Security:
          <br />
          Advice from Shadow Collective's Lead, Nyra
        </h1>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: "900",
            fontSize: "1.5vw",
          }}
        >
          Let's get one thing straight: you don't need a Computer Science degree{" "}
          <br />
          to break into pentesting. We caught up with Nyra, a lead red teamer at
          <br />
          Shadow Collective, to talk about hacking culture, bug bounty myths,
          <br />
          and how anyone can break into this evolving cybersecurity field.
        </p>
      </div>
    </section>
  );
};

export default Hero;
