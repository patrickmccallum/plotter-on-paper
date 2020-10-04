import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const App = () => {
  const canvasRef = useRef(null);
  const [cols, setCols] = useState(11);
  const [rows, setRows] = useState(11);
  const [noise, setNoise] = useState(5);
  const [size, setSize] = useState(50);

  useEffect(() => {
    draw();
  }, [cols, rows, noise, size]);

  const draw = () => {
    // Shortcut the canvas, and get a 2d context on it
    const c = canvasRef.current;
    const ctx = c.getContext("2d");

    // Set our stroke style
    ctx.strokeStyle = "#F7F7F7";
    ctx.fillStyle = "green";

    // Clear canvas and reset transform matrix
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Save default transforms (doens't fucking work anyway)
    ctx.save();

    // Calc the size of each square
    const w = ctx.canvas.width;
    const h = size / 2; // I'm going to confusingly call this H, and never use W. You're welcome.

    // Loop through each row
    for (let row = 0; row < rows; row++) {
      // Move down a step
      ctx.translate(0, size);

      // Loop through each col in the row
      for (let col = 0; col < cols; col++) {
        // Calc variance and rotation
        const variance = (Math.random() * (noise * row) * Math.PI) / 180;
        const thisRotation = (Math.random() < 0.5 ? -variance : variance) / 4;

        // Move to the right
        ctx.translate(size, 0);

        // Rotate, stroke, and revert rotation
        ctx.rotate(thisRotation);
        ctx.strokeRect(-h, -h, size, size);
        ctx.rotate(-thisRotation);
      }

      // Carriage return back to the start of the row
      ctx.translate(-size * cols, 0);
    }

    // Go back to the top of the canvas
    ctx.translate(-size * rows, 0);

    ctx.restore();
  };

  return (
    <div className="App">
      <div>
        Cols
        <input
          type="number"
          name="cols"
          defaultValue={cols}
          onChange={(event) => setCols(parseInt(event.target.value, 10))}
        />
        Rows
        <input
          type="number"
          name="rows"
          defaultValue={rows}
          onChange={(event) => setRows(parseInt(event.target.value, 10))}
        />
        Noise
        <input
          type="number"
          name="noise"
          defaultValue={noise}
          onChange={(event) => setNoise(parseInt(event.target.value, 10))}
        />
        Size
        <input
          type="number"
          name="size"
          defaultValue={size}
          onChange={(event) => setSize(parseInt(event.target.value, 10))}
        />
      </div>
      <div>
        <canvas ref={canvasRef} width="600" height="600" x="0" y="0" />
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
