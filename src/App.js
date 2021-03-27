import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import Tree from './classes/Tree';
import Button from './components/styled/Button';
import Form from './components/styled/Form';
import Input from './components/styled/Input';

const initCanvas = (canvas) => {
  canvas.width = 400;
  canvas.height = 400;
}

const xFunction = (x) => {
  return Math.pow(2, x) + 1;
}

const drawTreeNode = (canvas) => (node, level, parent) => {
  const context = canvas.getContext('2d');
  const radius = 10;
  const levelCount = xFunction(level)
  const rowGap = 400/levelCount;
  let x = rowGap;
  if (parent) {
    if (node === parent.leftChild) {
      x = Math.floor(parent.x/rowGap)*rowGap;
    }
    if (node === parent.rightChild) {
      x = Math.ceil(parent.x/rowGap)*rowGap;
    }
  }
  node.x = x;
  const y = level*40+30;
  node.y = y;
  const start = 0;
  const end = 2 * Math.PI;
  // Circle
  context.beginPath();
  context.arc(x, y, radius, start, end);
  context.strokeStyle = "#FA8";
  context.fillStyle = "#fff";
  context.fill();
  context.stroke();
  // Text
  context.font = "12px Arial";
  context.textAlign = "center";
  context.fillStyle = "#333";
  context.fillText(node.value, x, y+4);
  if (parent) {
    // context.globalCompositeOperation='destination-over'
    context.beginPath();
    context.moveTo(parent.x,parent.y+10);
    context.lineTo(x, y-10);
    context.strokeStyle = "#3333";
    context.stroke();
  }
}

const cleanScreen = (canvas) => {
  const context = canvas.getContext('2d');
  context.beginPath();
  context.rect(0,0,400,400);
  context.fillStyle = "#fff";
  context.fill();
}

function App() {
  const canvasRef = useRef(null);
  const valueRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [tree, setTree] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      setCanvas(canvas);
      initCanvas(canvas);
      setTree(new Tree(drawTreeNode(canvas)));
    }
  }, [canvasRef]);

  const addNode = (e) => {
    e.preventDefault();
    if (valueRef.current) {
      const value = valueRef.current.value;
      valueRef.current.value = ''
      if (!value) return;
      if (isNaN(value)) return;
      const intValue = parseInt(value,10);
      tree.add(intValue);
      cleanScreen(canvas)
      tree.draw();
    }
  }

  return (
    <div className="App">
      <canvas ref={canvasRef} />
      <Form onSubmit={addNode}>
        <Input ref={valueRef} />
        <Button type="submit">Add!</Button>
      </Form>
    </div>
  );
}

export default App;
