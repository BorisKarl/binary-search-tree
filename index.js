console.log("Moin!");


class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
} 

testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

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
        if(value === node.data) {
            if(node.right === null && node.left === null) {
                console.log(`Node with value ${value} removed from tree`);
                return null;
            }else if(node.left !== null && node.right === null){
                // verbinde den Knoten davor mit dem Knoten.left danach vor dem Löschen
            }else if( node.right !== null && node.left === null){
                // verbinde den Knoten davor mit dem Knoten.rigtht danach vor dem Löschen 
            }else if(node.left !== null && node.right !== null){

            }
            
        if(value < node.data){
            node.left = deleteNode(value, node.left);
        }else{
            node.right = deleteNode(value, node.right);
        }
        return node;
    }

    return {
        root,
        buildTree,
        insertNode,
        deleteNode
    }

}



const testTree = tree(testArray);

console.log(testTree.root);
console.log("root node: " + testTree.root.data);
console.log("root node: " + testTree.root.left);
testTree.insertNode(2, testTree.root);
testTree.insertNode(6, testTree.root);
// testTree.deleteNode(2, testTree.root);


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
prettyPrint(testTree.root);
