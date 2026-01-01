import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page2.css";

export default function Page2({ playMusic }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShow(true);

    // 💖 Floating hearts
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.innerText = Math.random() > 0.5 ? "💖" : "💗";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 4 + Math.random() * 4 + "s";
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 8000);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const startMagic = () => {
    playMusic();          // 🎵 start music
    navigate("/page3");   // ➡ next page
  };

  return (
    <div className={`page ${show ? "show" : ""}`}>
      <div className="card2">
      <img src={"/hulkenberg.gif"} alt="cute" className="hero-img" />


        <h1>Ready for something special? 💖</h1>
        <p>Tap the button and feel the magic ✨</p>

        <button className="love-btn" onClick={startMagic}>
          Continue 💕
        </button>
      </div>
    </div>
  );
}
