import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import "./page3.css";

gsap.registerPlugin(TextPlugin);

export default function Page3() {
  const textRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.innerText = Math.random() > 0.5 ? "💖" : "💗";
  
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = 16 + Math.random() * 24 + "px";
      heart.style.animationDuration = 4 + Math.random() * 4 + "s";
  
      document.body.appendChild(heart);
  
      setTimeout(() => {
        heart.remove();
      }, 8000);
    }, 400); // ❤️ speed (lower = more hot)
  
    return () => clearInterval(interval);
  }, []);
  

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const tl = gsap.timeline({ repeat: -1 });

    tl
      // -------- LINE 1 --------
      .set(el, { opacity: 0, y: 20, text: "" })
      .to({}, { duration: 6 })
      .to(el, {
        opacity: 1,
        y: 0,
        text: "Maein hoon teri sajni saajan hai tu mera",
        duration: 4.7,
        ease: "none", // typewriter smooth
      })
      .to({}, { duration: .5 })
      .to(el, { opacity: 0, duration: 0.6 })

      // -------- LINE 2 --------
      .set(el, { opacity: 0, y: 20, text: "" })
      .to(el, {
        opacity: 1,
        y: 0,
        text: "Tu baandh ke aaya mere pyar ka sehra",
        duration:5.7 ,
        ease: "none",
      })
      .to({}, { duration: 1.5 })
      .to(el, { opacity: 0, duration: 0.6 })

      // -------- LINE 3 --------
      .set(el, { opacity: 0, y: 20, text: "" })
      .to({}, { duration: 4 })
      .to(el, {
        opacity: 1,
        y: 0,
        text: "Chehre se ab tere hat ti nahin ankhiyaan"

,
        duration: 5.5,
        ease: "none",
      })
      .to({}, { duration: .2 })
      .to(el, { opacity: 0, duration: 0.6 })
      .set(el, { opacity: 0, y: 20, text: "" })
      .to(el, {
        opacity: 1,
        y: 0,
        text: "Tera naam le lekar chhede mujhe sakhiyaan",
        duration:5.2,
        ease: "none",
      })
      .to({}, { duration: .5 })
      .to(el, { opacity: 0, duration: 0.6 })
      .set(el, { opacity: 0, y: 20, text: "" })
      .to(el, {
        opacity: 1,
        y: 0,
        text: "Sakhiyon se ab mujhko peechha chhudana hai",
        duration:4,
        ease: "none",
      })
      .to({}, { duration: 1.5 })
      .to(el, { opacity: 0, duration: 0.6 })
      .set(el, { opacity: 0, y: 20, text: "" })
      .to(el, {
        opacity: 1,
        y: 0,
        text: "Sakhiyon se ab mujhko peechha chhudana hai",
        duration:4,
        ease: "none",
      })
      .to({}, { duration: 1.5 })
      .to(el, { opacity: 0, duration: 0.5 })
      .set(el, { opacity: 0, y: 20, text: "" })
      .to(el, {
        opacity: 1,
        y: 0,
        text: "Palbhar ki judaai phir laut aana hai",
        duration:4,
        ease: "none",
      })
      .to({}, { duration: .5 })
      .to(el, { opacity: 0, duration: 0 })
      .set(el, { opacity: 0, y: 20, text: "" })
      .to(el, {
        opacity: 1,
        y: 0,
        text: "Saathiya, sang rahega tera pyar",
        duration:9,
        ease: "none",
      })
      .to({}, { duration: .5 })
      .to(el, { opacity: 0, duration: 0 })
      .set(el, { opacity: 0, y: 20, text: "" })
      .to(el, {
        opacity: 1,
        y: 0,
        text: "Saathiya, rang layega intezaar",
        duration:9,
        ease: "none",
      })
      .to({}, { duration: 1.5 })
      .to(el, { opacity: 0, duration: 0.6 })
      

    return () => tl.kill();
  }, []);

  return (
    <div className="page">
      <div className="mobile-box">
        
        {/* 💕 CARD TITLE */}
        <div className="card-title">
        Only For You 💘
        </div>
  
        <img src={`${import.meta.env.BASE_URL}babu.gif`} alt="cute" className="hero-img" />

  
        <h1 ref={textRef} className="text"></h1>
      </div>
    </div>
  );
  
  
  
}
