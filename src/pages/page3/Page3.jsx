import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useNavigate } from "react-router-dom";

import "./page3.css";

gsap.registerPlugin(TextPlugin);

export default function Page3() {
  const navigate = useNavigate();

  /* ❌ EXISTING — SAME */
  // const startMagic1 = () => {
  //   playMusic1();          // 🎵 start music
  //   navigate("/page4");   // ➡ next page
  // };

  const textRef = useRef(null);

  /* ✅ ADD 1: MUSIC WITH TIME (NO REMOVE) */
  useEffect(() => {
    const musicTimer = setTimeout(() => {
      if (typeof playMusic1 === "function") {
        playMusic1(); // 🎵 App.jsx wala playMusic1
      }
    }, 800); // ⏱️ 0.8 sec delay

    return () => clearTimeout(musicTimer);
  }, []);

  /* ❌ EXISTING — SAME */
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/page5"); // 👈 yaha page4 ka route
    }, 18050); // 18 seconds baad

    return () => clearTimeout(timer);
  }, []);

  /* ❌ EXISTING — SAME */
  useEffect(() => {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.innerText = Math.random() > 0.5 ? "💜" : "💗";

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = 16 + Math.random() * 24 + "px";
      heart.style.animationDuration = 4 + Math.random() * 4 + "s";

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 8000);
    }, 400); // ❤️ speed

    return () => clearInterval(interval);
  }, []);

  /* ❌ EXISTING — SAME (GSAP) */
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const tl = gsap.timeline({ repeat: -1 });

    tl
      .set(el, { opacity: 0, y: 20, text: "" })
      .to({}, { duration: 2.5 })
      .to(el, {
        opacity: 1,
        y: 0,
        text: "Dekhle yo mokka baar baar ni milega",
        duration: 3.7,
        ease: "none",
      })
      .to({}, { duration: 0.5 })
      .to(el, { opacity: 0, duration: 0 })

      .set(el, { opacity: 0, y: 20, text: "" })
      .to(el, {
        opacity: 1,
        y: 0,
        text: "Dekhle ha mere jaisa yaar ni milega",
        duration: 3.7,
        ease: "none",
      })
      .to(el, { opacity: 0, duration: 0 })

      .set(el, { opacity: 0, y: 20, text: "" })
      .to(el, {
        opacity: 1,
        y: 0,
        text: "Dekhle ha milya bhi toh pyaar ni milega",
        duration: 3.7,
        ease: "none",
      })
      .to(el, { opacity: 0, duration: 0 })

      .set(el, { opacity: 0, y: 20, text: "" })
      .to(el, {
        opacity: 1,
        y: 0,
        text: "Dekhle koye aisa dildaar ni milega Dekhla",
        duration: 4,
        ease: "none",
      })
      .to(el, { opacity: 0, duration: 0 });

    return () => tl.kill();
  }, []);

  return (
    <div className="page">
      <div className="mobile-box">
        <div className="card-title">
          Only For You 💘
        </div>

        <img
          src={`${import.meta.env.BASE_URL}babu.gif`}
          alt="cute"
          className="hero-img"
        />

        <h1 ref={textRef} className="text"></h1>
      </div>
    </div>
  );
}
