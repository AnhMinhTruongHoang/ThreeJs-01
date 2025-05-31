import React, { useState } from "react";
import Home from "./pages/Home";
import Customized from "./pages/Customized";
import CanvasModel from "./canvas";
import CanvasModel2 from "./canvas/index2";
import CanvasModel3 from "./canvas/index3";

function App() {
  const [activeCanvas, setActiveCanvas] = useState("canvas1"); // default canvas

  return (
    <main className="app transition-all ease-in">
      <Home />

      {/* Buttons to switch canvas */}
      <div className="button-group">
        <button onClick={() => setActiveCanvas("canvas1")}>
          Show Canvas 1
        </button>
        <button onClick={() => setActiveCanvas("canvas2")}>
          Show Canvas 2
        </button>
        <button onClick={() => setActiveCanvas("canvas3")}>
          Show Canvas 3
        </button>
      </div>

      {/* Conditional rendering of canvas */}
      {activeCanvas === "canvas1" && <CanvasModel />}
      {activeCanvas === "canvas2" && <CanvasModel2 />}
      {activeCanvas === "canvas3" && <CanvasModel3 />}

      <Customized />
    </main>
  );
}

export default App;
