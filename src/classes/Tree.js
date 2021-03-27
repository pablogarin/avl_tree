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

class Tree {
  constructor(nodeDrawFunction) {
    this.root = null;
    this.height = 0;
    this.nodeDrawFunction = nodeDrawFunction;
  }

  add(value) {
    const node = new Node(value, this.nodeDrawFunction)
    this.root = this._add(node, this.root);
  }

  _add(node, parent) {
    if (parent) {
      if (parent.value <= node.value) {
        if (parent.rightChild) {
          parent.rightChild = this._add(node, parent.rightChild);
        } else {
          parent.rightChild = node;
        }
      } else {
        if (parent.leftChild) {
          parent.leftChild = this._add(node, parent.leftChild);
        } else {
          parent.leftChild = node;
        }
      }
      return this.balance(parent);
    }
    return node;
  }

  getBalanceFactor(node) {
    return this.getLevel(node.rightChild) - this.getLevel(node.leftChild);
  }

  balance(node) {
    const balanceFactor = this.getBalanceFactor(node);
    if (Math.abs(balanceFactor) === 2) {
      if (balanceFactor === 2) {
        const subTreeFactor = this.getBalanceFactor(node.rightChild);
        if(subTreeFactor === -1) {
          return this.rotateLeftRight(node)
        } else {
          return this.rotateLeftLeft(node)
        }
      } else if (balanceFactor === -2) {
        const subTreeFactor = this.getBalanceFactor(node.leftChild);
        if(subTreeFactor === 1) {
          return this.rotateRightLeft(node)
        } else {
          return this.rotateRightRight(node)
        }
      }
    }
    return node;
  }

  rotateLeftLeft(node) {
    const newRoot = node.rightChild;
    node.rightChild = newRoot.leftChild;
    newRoot.leftChild = node
    return newRoot;
  }

  rotateLeftRight(node) {
    node.rightChild = this.rotateRightRight(node.rightChild)
    return this.rotateLeftLeft(node);
  }

  rotateRightRight(node) {
    const newRoot = node.leftChild;
    node.leftChild = newRoot.rightChild;
    newRoot.rightChild = node;
    return newRoot;
  }

  rotateRightLeft(node) {
    node.leftChild = this.rotateLeftLeft(node.leftChild)
    return this.rotateRightRight(node);
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

export default Tree;
