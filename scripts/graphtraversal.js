function checkConnected(adj) {
    var visited = []
    for(var i=0; i < adj.length; i++) {
        visited.push(false);
    }
    
    if(checkIsolatedVertices(adj)) {
        return false;
    }
    //HERE IS WHERE WE TRAVERSE THE GRAPH
    depthFirst(0, adj, visited);
    
    var count = 0;
    for (var i = 0; i < visited.length; i++) {
        if(visited[i]) {
            count++;
        }
    }
    
    if(adj.length==count) {
        //THE GRAPH IS CONNECTED
        console.log('the graph is connected');
        return true;
    }
    else {
        console.log('the graph is not connected');
        return false;
    }
}

function depthFirst(source, adj, visited) {
    visited[source] = true;
    
    var neighbors = getNeighbors(source, adj);
    
    for(var i = 0; i < neighbors.length; i++) {
        var neb = neighbors[i];
        if(visited[neb] == false) {
            depthFirst(neb, adj, visited)
        }
    }
}

function getNeighbors(vertex, adj) {
    var neb = [];
    for (var i = 0; i < adj.length; i++) {

        if (adj[vertex][i] != 0) {
            neb.push(i);
        }
    }
    return neb;
}

//returns true there are any isolated vertices in the graph
//speeds up checking
function checkIsolatedVertices(adj) {
    for(var i=0; i < vertices.length; i++) {
        var degree = 0;
        
        for(var j=0; j < vertices.length; j++) {
            if(adj[i][j] != 0) {
                degree++;
            }
        }
        if (degree == 0) {
            return true;
        }
    }
    return false;
}


//OKAY at this point we have a an array of distances, which contains an element
//corresponding to the distance to that vertex from vertex 0.
//What I need, is a way to traverse the graph using this shortest distances.
//I'm trying to do it with a variable itenerary, but it is just pushing that each
//time a node is visited.  We're close.
function djikstrasAlgo(adj, origin, end) {
    distances = [];
    unvisitedSet = [];
    itenerary = [0];
    shortestPathToEach = {0: 0};
    
    //Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes. Set the initial node as current
    for(var i = 0; i < adj.length; i++) {
        if(i == origin) distances[i] = 0;
        else distances[i] = 100000;
        unvisitedSet.push(i);
    }
    
    while(unvisitedSet.length > 0) {
        
        current = 0;
        min = 100000;
        //find vertex in unvisitedSet with minimum distances
        //distances[unvisitedSet[i]]
        for(var i = 0; i < unvisitedSet.length; i++) {
            if (distances[unvisitedSet[i]] < min) {
                current = unvisitedSet[i];
            }
        }

        unvisitedSet.splice(unvisitedSet.indexOf(current), 1);
        nebs = getNeighbors(current, adj);
        
        //removes already visited nodes from nebs.
        for(var i = 0; i < nebs.length; i++) {
            if(!unvisitedSet.includes(nebs[i])) {
                nebs.splice(i, 1);
            }
        }
        
        for(var i = 0; i < nebs.length; i++) {
            v = current;
            u = nebs[i];
            altpath = distances[v] + adj[current][u];
            
            if(altpath < distances[u]) {
                distances[u] = altpath;
                shortestPathToEach[u] = v;
            }
        }
    }
    
    
    return shortestPathToEach;
}

function createPath(shortestPathToEach, target) {
    daPath = [];
    original = target;
    
    while (target != 0) {
        
        console.log(shortestPathToEach[target])
        daPath.push(shortestPathToEach[target])
        target = shortestPathToEach[target]
        
    }
    
    daPath.reverse();
    daPath.push(original);
    return daPath;
}





//from https://jsfiddle.net/justin_c_rounds/Gd2S2/light/
/*function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };

    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));

        // it is worth noting that this should be the same as:
        //x = line2StartX + (b * (line2EndX - line2StartX));
        //y = line2StartX + (b * (line2EndY - line2StartY));
        
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
}*/