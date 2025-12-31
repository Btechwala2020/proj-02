import "./page1.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Page1() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShow(true), 200);

    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.innerText = Math.random() > 0.5 ? "💖" : "💗";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 4 + Math.random() * 4 + "s";
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 8000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`page ${show ? "show" : ""}`}>
      <div className="stars"></div>

      <div className="card1">
      <img src={`${import.meta.env.BASE_URL}bubu.gif`} alt="cute" className="hero-img" />


        <h1 className="page1h1">I have a little secret 💕</h1>

        <p className="page1p">
          Only you deserve this.
          <br />
          Because you mean everything to me ✨
        </p>

        <button className="love-btnpage1" onClick={() => navigate("/page2")}>
          Open 💖
        </button>
      </div>
    </div>
  );
}
