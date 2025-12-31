import { useNavigate } from "react-router-dom";
import "./page5.css"

export default function Page5({ playMusic }) {
  const navigate = useNavigate();

  const startMagic1 = () => {
    playMusic();        // 🎵 music2.mp3
    navigate("/page4"); // ➡ Page4
  };

  return (
    <div className="page-wrapper">
      <div className="card-box">
        <h1 className="title">Just For You 💜</h1>
        <p className="subtitle">Tap to feel the vibe</p>

        <button className="play-btn" onClick={startMagic1}>
          ▶ Start
        </button>
      </div>
    </div>
  );
}
