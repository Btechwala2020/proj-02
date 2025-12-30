import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef } from "react";

import Page1 from "./pages/page1/Page1";
import Page2 from "./pages/page2/Page2";
import Page3 from "./pages/page3/Page3";

export default function App() {
  const audioRef = useRef(new Audio("/music.mp3"));

  const playMusic = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.volume = 0.6;
      audio.play();
    }
  };

  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Page1 />} />
        <Route path="/page2" element={<Page2 playMusic={playMusic} />} /> 
        <Route path="/page3" element={<Page3 />} />


      </Routes>
    </BrowserRouter>
  );
}
