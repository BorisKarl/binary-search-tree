console.log("Binary search tree");


class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
} 

const tree = (array) => {
    let root = null;
    const sortedArray = array.sort((a, b) => a - b);
    const cleanArray = [...new Set(sortedArray)];
    let end = cleanArray.length - 1;
    let start = 0;

    const buildTree = (cleanArray, start, end) => { 
        if (start > end) return null;
        const mid = parseInt((start + end) / 2);
        let node = new Node(cleanArray[mid]);
        node.left = buildTree(cleanArray, start, mid - 1);
        node.right = buildTree(cleanArray, mid + 1, end);
        return node;
    }

    root = buildTree(cleanArray, start, end);

    const insertNode = (data, node) => {
        if(node === null) return new Node(data);
        if(data < node.data){
            node.left = insertNode(data, node.left);
        }else{
            node.right = insertNode(data, node.right);
        }
        return node;
    }

    const deleteNode = (value, node) => {
        if(node === null) return null;

        if(value < node.data){
            node.left = deleteNode(value, node.left);
              return node;
        } else if (value > node.data) {
            node.right = deleteNode(value, node.right);
            return node;
        }
      
        if(value === node.data) {
            if(node.right === null && node.left === null) {
                console.log(`Node with value ${value} removed from tree`);
                return null;
            } else if (node.left !== null && node.right === null){
                let tmp = node.left;
                node = null;
                console.log(`Node with value ${value} removed from tree`);
                return tmp;
            } else if ( node.right !== null && node.left === null){
                let tmp = node.right;
                delete node;
                console.log(`Node with value ${value} removed from tree`);
                return tmp;
            } else if (node.left !== null && node.right !== null) {
                let parent = node;
                let successor = node.right;
                while(successor.left !== null){
                    parent = successor;
                    successor = successor.left;
                }
                if (parent !== node) {
                    parent.left = successor.right;
                } else {
                    parent.right = successor.right;
                }

                node.data = successor.data;
                successor = null;
                return node;
            }
        }
    }


        const findNode = (key, node) => {
            if (node === null) return;

            if (node.data === key) {
                return node;
            } else if (key < node. data) {
                return findNode(key, node.left);
            } else if (key > node.data) {
                return findNode(key, node.right);
            } else {
                return null;
            }
            
        }

        const levelOrder = (root, callback) => {
            if (root === null) return;
            let queue = [];
            let result = [];
            queue.push(root);
            while (queue.length > 0) {
              let current = queue[0];
              //result.push(current.data);
              result.push(callback ? callback(current.data) : current.data);
              if (current.left !== null) queue.push(current.left);
              if (current.right !== null) queue.push(current.right);
              queue.shift();
            }
            
            if(!callback){
                return result;
            }
        }

            const preOrder = (node, callback, result = []) => {
                if (node === null) return;
                if (callback) {
                     callback(node.data);
                } else {
                     result.push(node.data);
               }

                if (node.left !== null) preOrder(node.left, callback, result);
                if (node.right !== null) preOrder(node.right, callback, result);
                
                if(!callback) {
                    return result;
                }
               
            }

            const postOrder = (node, callback, result = []) => {
                if (node === null) return;
                if (node.left !== null) preOrder(node.left, callback, result);
                if (node.right !== null) preOrder(node.right, callback, result);
                 if (callback) {
                   callback(node.data);
                 } else {
                   result.push(node.data);
                 }


                 if (!callback) {
                   return result;
                 }
            }


            const inOrder = (node, callback, result = []) => {
              if (node === null) return;
              if (node.left !== null) inOrder(node.left, callback, result);
               if (callback) {
                 callback(node.data);
               } else {
                 result.push(node.data);
               }
              if (node.right !== null) inOrder(node.right, callback, result);

              if (!callback) {
                return result;
              }
            }


            const height = (node) => {
                if (node === null) return 0;
                return 1 + Math.max(height(node.left), height(node.right));
            }

            const depth = (target, node, count = 0) => {
                if (node === null) {
                    console.log(`No node with value ${target}`); 
                    return;
                }
                if(target === node.data) {
                    console.log(`${target} has depth of ${count}`);
                    return;
                }

                if(target < node.data) {
                    count++;
                    depth(target, node.left, count);
                }
                if (target > node.data) {
                    count++
                    depth(target, node.right, count)
                } 
            
        }

        const isBalanced = (node) => {
            if (node === null) return 0;
            
            let leftH = height(node.left);
            let rightH = height(node.right);
            const ratio = leftH - rightH;
            if (ratio < -1 || ratio > 1) {
              console.log(`Tree is unbalanced, ratio ${ratio}`);
              return ratio;
            } else {
              console.log(`Tree is balanced, ratio ${ratio}`);
            }
     
        }

    const rebalanceTree = (node) => {
        let array = inOrder(node);
        let end = array.length - 1;
        let start = 0;
        let balancedtree = buildTree(array, start, end);
        return balancedtree;
    }



    return {
        root,
        buildTree,
        insertNode,
        deleteNode,
        findNode,
        levelOrder,
        preOrder,
        postOrder,
        inOrder,
        height,
        depth,
        isBalanced,
        rebalanceTree

    }

}




// Callback function
const alertNode = (node) => {
    alert(node);
}

// Prettyprint from TOP
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const randomArray = () => {
    let a = [];
    for (let i = 0; i < 100; i++) {
        a.push(Math.floor(Math.random() * 100));
    }
    return a;
}
// Driver script
// build tree
console.log("Building tree with random array of 100 key between 0 and 100...");
const testTree = tree(randomArray());
prettyPrint(testTree.root);
console.log("Insert nodes 2 and 6");
testTree.insertNode(2, testTree.root);
testTree.insertNode(6, testTree.root);
prettyPrint(testTree.root);
console.log("Delete node 6");
testTree.deleteNode(6, testTree.root);
prettyPrint(testTree.root);
const result = testTree.findNode(5, testTree.root);
console.log("testTree.findNode(5, testTree.root): " + JSON.stringify(result));
console.log("LevelOrder: ");
console.log(testTree.levelOrder(testTree.root));

console.log("PreOrder Traversal: ");
console.log(testTree.preOrder(testTree.root));
console.log("PostOrder Traversal: ");
console.log(testTree.postOrder(testTree.root));
console.log("InOrder Traversal: ");
console.log(testTree.inOrder(testTree.root));
console.log("Height function: ");
console.log(testTree.height(testTree.root));
console.log("Depth function: ");
testTree.depth(1, testTree.root);
testTree.depth(2, testTree.root);
testTree.depth(324, testTree.root);
testTree.depth(2222, testTree.root);
testTree.isBalanced(testTree.root);
console.log(testTree.isBalanced(testTree.root));
const newTree = testTree.rebalanceTree(testTree.root);
console.log(newTree);
prettyPrint(newTree);

const deBalance = () => {
    for (let i = 0; i < 10; i++){
         testTree.insertNode((Math.floor(Math.random() * 1000)), testTree.root);
    }
}
deBalance();
console.log("Debalance tree...");
prettyPrint(testTree.root);
testTree.isBalanced(testTree.root);
const rebalancedTreeTree = testTree.rebalanceTree(testTree.root);
console.log("Rebalance tree...");
prettyPrint(rebalancedTreeTree);
testTree.isBalanced(rebalancedTreeTree);


//  key !== Number.isInteger(key)
/*
testTree.insertNode(2, testTree.root);


    // rekursiver Ansatz, geht aber erst links in die Tiefe, dann rechts...
  if (root.left !== null) {
                levelOrder(root.left, queue);
                levelOrder(root.right, queue);

            } else if (root.right !== null) {
                levelOrder(root.right, queue);
                levelOrder(root.left, queue);
            }

while (queue.length > 0) {
                let currentNode = queue[0];
                console.log(currentNode);
                if(currentNode.left !== null) queue.push(currentNode.left);
                if(currentNode.right !== null) queue.push(currentNode.right);
                queue.shift();
            }

*/
