//The graph to draw

//an array of points.
var vertices = [];
var adjmatrix;
var colormatrix;
var isdrawn;
var pathdrawn;
var end;

function setup() {
    var canvas = createCanvas(windowWidth * 5/6, windowHeight * 5/6);
    canvas.parent('sketch-holder');
}

function draw() {
    background(0);

    if(isdrawn == true) {

        drawEdges();
        drawVertices();
        
        textSize(12);
        strokeWeight(1);
        noStroke();
        fill(140, 140, 190);
        text('Origin', vertices[0].x - 14, vertices[0].y - 4);
        text('End', vertices[end].x - 14, vertices[end].y - 4);

    }
    if(isdrawn == false) {
        textSize(22);
        fill(100, 100, 100);
        text('Invalid vertex or edge count', width/3, height/2);
    }
    
    if(pathdrawn) {
        for(var i = 0; i < daPath.length - 1; i++) {
            stroke(255);
            strokeWeight(2);
            
            line(vertices[daPath[i]].x, vertices[daPath[i]].y, vertices[daPath[i+1]].x, vertices[daPath[i+1]].y);
        }
    }
    
}

//returns true is a graph was created,
//false if not because of bad input from the dom.
function createGraph() {
    console.log("Creating graph");
    var verticesCount = select('#inputVerticesNumber').value();
    var edgesCount = select('#inputEdgesNumber').value();
    console.log(verticesCount);
    if(edgesCount - verticesCount < 0) {
        isdrawn= false;
        return false;
    }
    
    do {
        vertices = [];
        for (var i=0; i < verticesCount; i++) {
            createVertex();
        }

        adjmatrix = createAdjacencyMatrix();
        colormatrix = createAdjacencyMatrix();

        for(var i=0; i < edgesCount; i++) {
            createEdge(adjmatrix);
        }
    } while (!checkConnected(adjmatrix));
    
    isdrawn = true;
    pathdrawn = false;
    end = Math.floor(map(random(), 0, 1, 1, vertices.length));
    return true;
}

function createShortestPath() {
    console.log("Creating shortest path");
    d = djikstrasAlgo(adjmatrix, 0, end);
    daPath = createPath(d, end);
    
    pathdrawn = true;

}

function createVertex() {
    var xpos = map(random(), 0, 1, 10, width - 20);
    var ypos = map(random(), 0, 1, 10, height - 10);
    vertices.push({x: xpos,
                   y: ypos});
}

function drawVertices() {
    for (var i = 0; i < vertices.length; i++) {
        strokeWeight(2);
        stroke(250, 20, 20);
        point(vertices[i].x, vertices[i].y);
    }

}

function createAdjacencyMatrix() {
    var adj = [];
    for(var i = 0; i < vertices.length; i++) {
        adj.push([]);
        for(var j = 0; j < vertices.length; j++) {
            adj[i].push(0);
        }
    }
    return adj;
}

function createEdge(adj) {
    var v1;
    var v2;
    
    do {
        v1 = Math.floor(map(random(), 0, 1, 0, vertices.length));
        v2 = Math.floor(map(random(), 0, 1, 0, vertices.length));
    } while ((adj[v1][v2] != 0) || v1 == v2);
    
    adj[v1][v2] = dist(vertices[v1].x, vertices[v1].y, vertices[v2].x, vertices[v2].y);
    adj[v2][v1] = dist(vertices[v1].x, vertices[v1].y, vertices[v2].x, vertices[v2].y);
    colormatrix[v1][v2] = color(20, map(random(), 0, 1, 20, 150),
                                map(random(), 0, 1, 50, 250));
    colormatrix[v2][v1] = color(20, map(random(), 0, 1, 20, 150),
                                map(random(), 0, 1, 50, 250));
}

function drawEdges() {
    strokeWeight(.5);
    for (var i=0; i < vertices.length; i++) {
        for(var j=0; j < vertices.length; j++) {
            if(adjmatrix[i][j] != 0) {
                stroke(colormatrix[i][j]);
                line(vertices[i].x, vertices[i].y, vertices[j].x, vertices[j].y);
                
                //draw the line weight (distance)
                textSize(8);
                noStroke();
                fill(200, 200, 10);
                //text(adjmatrix[i][j].toFixed(1), Math.abs((vertices[i].x + vertices[j].x) / 2),
                //     Math.abs(vertices[i].y + vertices[j].y) / 2);
            }
        }
    }
}

function hasOverlappingEdges() {
    return true;
}

function findSmallestDegreeVertext() {
    
}



