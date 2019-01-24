import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  canvas = React.createRef();

  state = {
    cols: 11,
    rows: 11,
    noise: 5,
    d: 50
  };

  componentDidMount() {
    this.draw();
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: parseInt(value) }, () => {
      this.draw();

      console.info(this.state);
    });
  };

  draw = () => {
    const { cols, rows, noise, d } = this.state;

    // Shortcut the canvas, and get a 2d context on it
    const c = this.canvas.current;
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
    const h = d / 2; // I'm going to confusingly call this H, and never use W. You're welcome.

    // Loop through each row
    for (let row = 0; row < rows; row++) {
      // Move down a step
      ctx.translate(0, d);

      // Loop through each col in the row
      for (let col = 0; col < cols; col++) {
        // Calc variance and rotation
        const variance = (Math.random() * (noise * row) * Math.PI) / 180;
        const thisRotation = (Math.random() < 0.5 ? -variance : variance) / 4;

        // Move to the right
        ctx.translate(d, 0);

        // Rotate, stroke, and revert rotation
        ctx.rotate(thisRotation);
        ctx.strokeRect(-h, -h, d, d);
        ctx.rotate(-thisRotation);
      }

      // Carriage return back to the start of the row
      ctx.translate(-d * cols, 0);
    }

    // Go back to the top of the canvas
    ctx.translate(-d * rows, 0);

    ctx.restore();
  };

  render() {
    const { cols, rows, noise, d } = this.state;

    return (
      <div className="App">
        <div>
          Cols
          <input
            type="number"
            name="cols"
            defaultValue={cols}
            onChange={this.handleChange}
          />
          Rows
          <input
            type="number"
            name="rows"
            defaultValue={rows}
            onChange={this.handleChange}
          />
          Noise
          <input
            type="number"
            name="noise"
            defaultValue={noise}
            onChange={this.handleChange}
          />
          Size
          <input
            type="number"
            name="d"
            defaultValue={d}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <canvas ref={this.canvas} width="600" height="600" x="0" y="0" />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
