import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import Page4 from "./pages/page4/Page4";

import Page1 from "./pages/page1/Page1";
import Page2 from "./pages/page2/Page2";
import Page3 from "./pages/page3/Page3";
import Page5 from "./pages/page5/Page5";
// import Page4 from "./pages/page4/Page4";
export default function App() {
  const audioRef = useRef(new Audio("/music1.mp3"));
  const audioRef1 = useRef(new Audio("/music2.mp3"));

  const playMusic = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.volume = 0.6;
      audio.play();
    }
  };
  const playMusic1 = () => {
    const audio = audioRef1.current;
    if (audio.paused) {
      audio.volume = 0.6;
      audio.play();
    }
  };

  return (
    <BrowserRouter >
      <Routes>
        {/* ✅ THIS IS IMPORTANT */}
        <Route index element={<Page1 />} />
        

        <Route path="page2" element={<Page2 playMusic={playMusic} />} />
        <Route path="page3" element={<Page3  />} />
        <Route path="page5" element={<Page5 playMusic={playMusic1}  />} />
     
         <Route path="page4" element={<Page4 />} />

      </Routes>
    </BrowserRouter>
  );
}
