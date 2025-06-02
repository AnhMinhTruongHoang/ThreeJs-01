import React, { useState } from "react";
import Home from "./pages/Home";
import Customized from "./pages/Customized";
import CanvasModel from "./canvas";
import CanvasModel2 from "./canvas/index2";
import CanvasModel3 from "./canvas/index3";

function App() {
  const [activeCanvas, setActiveCanvas] = useState("canvas1");

  return (
    <main className="app transition-all ease-in">
      <Home />

      {/* Dropdown to switch canvas */}
      <div className="dropdown-group mb-4">
        <label htmlFor="canvas-select" className="mr-2">
          Select Shirt:
        </label>
        <select
          id="canvas-select"
          value={activeCanvas}
          onChange={(e) => setActiveCanvas(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="canvas1">Shirt 1</option>
          <option value="canvas2">Shirt 2</option>
          <option value="canvas3">Shirt 3</option>
        </select>
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
