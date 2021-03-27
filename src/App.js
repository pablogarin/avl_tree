import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import Button from './components/styled/Button';
import Form from './components/styled/Form';
import Input from './components/styled/Input';

class Tree {
  constructor() {
    this.root = null;
    this.height = 0;
  }

  add(node) {
    this.root = this._add(node, this.root);
    /*
    if (this.root) {
      this.root.add(node);
    } else {
      this.root = node;
    }
    this.height = this.getLevel(this.root);
    */
  }

  _add(node, parent) {
    if (parent) {
      parent.add(node)
      const balanceFactor = this.getLevel(parent.leftChild) - this.getLevel(parent.rightChild);
      if (Math.abs(balanceFactor) === 2) {
        if (balanceFactor < 2) {
          return this.rotateLeft(parent)
        } else if (balanceFactor > 1) {
          return this.rotateRight(parent)
        }
      }
      return parent;
    }
    return node;
  }

  rotateLeft(node) {
    const tmp = node.rightChild;
    node.rightChild = null
    node.leftChild = null;
    tmp.leftChild = node
    return tmp;
  }

  rotateRight(node) {
    return node;
  }

  draw(element, parent, level = 0) {
    const currNode = element ? element : this.root;
    currNode.draw(level, parent);
    if (currNode.leftChild) {
      this.draw(currNode.leftChild, currNode, level+1);
    }
    if (currNode.rightChild) {
      this.draw(currNode.rightChild, currNode, level+1);
    }
  }

  getLevel(root) {
    if (!root) {
      return 0;
    }
    return 1 + Math.max(this.getLevel(root.rightChild), this.getLevel(root.leftChild))
  }
}

class Node {
  constructor(value, drawFunction) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
    this.drawFunction = drawFunction;
  }

  draw(level, parent) {
    this.drawFunction(this, level, parent);
  }

  add(childNode) {
    if (childNode.value >= this.value) {
      if (this.rightChild) {
        this.rightChild.add(childNode);
      } else {
        this.rightChild = childNode;
      }
    } else {
      if (this.leftChild) {
        this.leftChild.add(childNode);
      } else {
        this.leftChild = childNode;
      }
    }
  }
}


const initCanvas = (canvas) => {
  canvas.width = 400;
  canvas.height = 400;
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
      setTree(new Tree());
    }
  }, [canvasRef]);

  const xFunction = (x) => {
    return Math.pow(2, x) + 1;
  }

  const drawTreeNode = (node, level, parent) => {
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

  const addNode = (e) => {
    e.preventDefault();
    if (valueRef.current) {
      const value = valueRef.current.value;
      valueRef.current.value = ''
      if (!value) return;
      const node = new Node(parseInt(value,10), drawTreeNode);
      tree.add(node);
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
