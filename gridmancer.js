// vim:set sw=4 et:

///////////////////////////////////////////////////////////////////////////////
// Our interface to the world.
// environment.rows and environment.cols specify the dimensions of the grid.
// environment.croak displays a string in the log (i.e. console.log).
// environment.add_rect(y1, x1, y2, x2) adds a rectangle
// from (y1, x1) (inclusive) to (y2, x2) (exclusive).
// environment.display_edges([e1, e2, ...], color) renders
// a list of edges with the given color (for debugging).

var environment = {};

var codeCombatGrid = [
[1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
[1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
[0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
[0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
[0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
[0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,1,1,1,1,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
[1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
[1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
[0,1,1,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0],
[0,0,1,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0],
[0,0,1,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0],
[0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0],
[1,1,1,1,0,0,0,0,0,1,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

function init_standalone() {
    //var grid = [
    //[0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],
    //[0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],
    //[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    //[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    //[1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
    //[1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
    //[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    //[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    //[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    //[0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
    //[0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1],
    //[0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0],
    //[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0]];

    //var grid = [
    //[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    //[1,1,1,1,0,0,0,0,0,1,0,0,0,1,0,0,1,1,1,0],
    //[0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0],
    //[0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0],
    //[0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,0],
    //[0,0,1,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,0],
    //[0,0,1,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,0],
    //[0,1,1,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,0],
    //[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    //[1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,0],
    //[1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,0],
    //[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0],
    //[0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,1,1,1,1,0],
    //[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0],
    //[0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0],
    //[0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,0],
    //[0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],
    //[1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0],
    //[1,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0],
    //[1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]];

    var grid = codeCombatGrid;


    var rows = environment.rows = grid.length, cols = environment.cols = grid[0].length;
    environment.occupied_yx = function occupied_yx(y, x) {
        if (y < 0 || x < 0 || y >= rows || x >= cols) return true;
        return !grid[y][x];
    };
    environment.croak = function croak(s) {
        console.log(s);
    };
    environment.add_rect = function add_rect(y1, x1, y2, x2) {
        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.top = y1 * 20 + 'px';
        div.style.left = x1 * 20 + 'px';
        div.style.height = (y2-y1) * 20 + 'px';
        div.style.width = (x2-x1) * 20 + 'px';
        div.style.backgroundColor = 'hsla('+(360*Math.random())+',100%,50%,0.2)';
        document.documentElement.appendChild(div);
    };

    environment.display_edges = function display_edges(edges, color) {
        for (var i = 0, l = edges.length; i < l; ++i) {
            var e = edges[i];
            var hor = e.u.r == e.v.r;
            var div = document.createElement('div');
            div.style.position = 'absolute';
            if (hor)
                div.style.borderTop = '1px solid '+color;
            else
                div.style.borderLeft = '1px solid '+color;
            div.style.left = e.u.c * 20 + 'px';
            div.style.top = e.u.r * 20 + 'px';
            if (hor) {
                div.style.width = (e.v.c - e.u.c) * 20 + 'px';
                div.style.height = '10px';
            } else {
                div.style.height = (e.v.r - e.u.r) * 20 + 'px';
                div.style.width = '10px';
            }
            document.documentElement.appendChild(div);
        }
    };

    environment.drawEdge = function (e) {
        var u = e.u, v = e.v;
        var x = u.c * 20, y = u.r * 20;
        var w = (v.c - u.c) * 20 + 1, h = (v.r - u.r) * 20 + 1;
        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.top = y+'px';
        div.style.left = x+'px';
        div.style.width = w+'px';
        div.style.height = h+'px';
        div.style.backgroundColor = 'purple';
    };
}

// When embedded in CodeCombat.
function init_embedded() {

    var grid = this['getNavGrid']()['grid'];
    var tileSize = 4;

    var rows = environment.rows = (grid.length / tileSize)|0;
    var cols = environment.cols = (grid[0].length / tileSize)|0;

    environment.occupied_yx = function occupied_yx(y, x) {
        if (y < 0 || x < 0 || y >= rows || x >= cols) return true;
        return grid[tileSize*y][tileSize*x].length > 0;
    };

    environment.add_rect = (function (self, addRect) {
        return function add_rect(y1, x1, y2, x2) {
            var w = x2 - x1;
            var h = y2 - y1;
            addRect.call(self, tileSize * (x1 + w / 2), tileSize * (y1 + h / 2), tileSize * w, tileSize * h);
        };
    })(this, this['addRect']);

    environment.drawEdge = (function (self, addRect) {
        return function drawEdge(e) {
            var u = e.u;
            var v = e.v;
            var x = u.c * tileSize;
            var y = u.r * tileSize;
            var w = (v.c - u.c) * tileSize;
            var h = (v.r - u.r) * tileSize;
            addRect.call(self, x + w/2, y + h/2, w + 2, h + 2);
        };
    })(this, this['addRect']);

    environment.croak = (function (self, say) {
        return function croak(s) {
            say.call(self, s);
        };
    })(this, this['say']);

    environment.display_edges = function display_edges(edges, color) {
        // noop
    };

    if (rows != codeCombatGrid.length || cols != codeCombatGrid[0].length) {
        environment.croak("dims: "+rows+"x"+cols+" != "+codeCombatGrid.length+"x"+codeCombatGrid[0].length);
    } else {
        for (var r = 0; r < rows; ++r) {
            for (var c = 0; c < cols; ++c) {
                if (!codeCombatGrid[r][c] !== environment.occupied_yx(r, c)) {
                    environment.croak("cell: "+r+","+c);
                }
            }
        }
    }

}

///////////////////////////////////////////////////////////////////////////////
// Test if we are in CodeCombat.
var standalone = !this['getNavGrid'];
if (standalone) {
    init_standalone();
} else {
    init_embedded.call(this);
}

function occupied(v) {
    return environment.occupied_yx(v.r, v.c);
}

function new_Array(n) {
    var a = [];
    for (var i = 0; i < n; ++i) {
        a.push(null);
    }
    return a;
}

///////////////////////////////////////////////////////////////////////////////
// Cardinal directions.
var UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;
function left_of(d) { return (d+3)%4; }
function right_of(d) { return (d+1)%4; }

///////////////////////////////////////////////////////////////////////////////
// A Vertex is an immutable point on the two dimensional grid.

function Vertex(r, c) {
    this.r = r|0;
    this.c = c|0;
}

Vertex.prototype.equals = function Vertex_equals(other) {
    return this.r == other.r && this.c == other.c;
};

// Move the point by a unit vector in the given direction.
Vertex.prototype.add = function Vertex_add(dir) {
    var r = this.r, c = this.c;
    if (dir == UP) --r;
    else if (dir == RIGHT) ++c;
    else if (dir == DOWN) ++r;
    else if (dir == LEFT) --c;
    return new Vertex(r, c);
};

// Imagine standing in the corner just northwest of `this`,
// heading in direction `dir`. What cell is to our left?
Vertex.prototype.left_of_vector = function (dir) {
    var r = this.r, c = this.c;
    if (dir == UP) { --r; --c; }
    else if (dir == RIGHT) { --r; }
    else if (dir == DOWN) { }
    else if (dir == LEFT) { --c; }
    return new Vertex(r, c);
};

Vertex.prototype.right_of_vector = function (dir) {
    return this.left_of_vector(right_of(dir));
};

///////////////////////////////////////////////////////////////////////////////
// An Edge is an immutable pair of Vertex instances.
function Edge(u, v) {
    this.u = u;
    this.v = v;
}

///////////////////////////////////////////////////////////////////////////////
// A CellSet is a mutable map from the two dimensional grid to objects.
// Points outside the rectangle [0, rows] x [0, cols] map to null.
// Points inside the rectangle can be changed using set((r, c), v).

function CellSet() {
    var rows = environment.rows, cols = environment.cols;
    this.a = new_Array(rows+1);
    for (var i = 0; i <= rows; ++i) {
        this.a[i] = new_Array(cols+1);
        for (var j = 0; j <= cols; ++j) this.a[i][j] = null;
    }
}

CellSet.prototype.get = function CellSet_get(v) {
    var rows = environment.rows, cols = environment.cols;
    if (v.r < 0 || v.r > rows || v.c < 0 || v.c > cols) return null;
    return this.a[v.r][v.c];
};

CellSet.prototype.set = function CellSet_set(v, o) {
    if (!this.a[v.r])
        console.log(v);
    this.a[v.r][v.c] = o;
};

///////////////////////////////////////////////////////////////////////////////
// A BipartiteGraph is a bipartite graph over left vertices l1, l2, ..., lL
// and right vertices r1, r2, ..., rR.
// Edges are added with add_edge(l, r).
// Vertices and edges can be marked or unmarked;
// the marks are used by max_matching and max_independent_set
// and their semantics change during execution.
// Right after max_matching has been called,
// only edges in the maximum matching and their adjacent vertices are marked.
// Right after max_independent_set has been called,
// only vertices in the max independent set are marked.

function BipartiteGraph(L, R) {
    this.L = L;
    this.R = R;
    this.edgeSetsL = new_Array(L);
    this.edgeSetsR = new_Array(R);
    this.marks = new_Array(L*R);
    this.marksL = new_Array(L);
    this.marksR = new_Array(R);
    var i;
    for (i = 0; i < L; ++i) {
        this.edgeSetsL[i] = [];
    }
    for (i = 0; i < R; ++i) {
        this.edgeSetsR[i] = [];
    }
}

BipartiteGraph.prototype.add_edge = function (l, r) {
    this.edgeSetsL[l].push(r);
    this.edgeSetsR[r].push(l);
};

BipartiteGraph.prototype.set_mark = function (l, r, o) {
    this.marks[l*this.R + r] = o;
};

BipartiteGraph.prototype.get_mark = function (l, r) {
    return this.marks[l*this.R + r];
};

function RecursionStack(range) {
    this.range = range;
    this.stack = [];
    this.indexes = new_Array(range);
    for (var i = 0, l = range; i < l; ++i) {
        this.indexes[i] = -1;
    }
}

RecursionStack.prototype.push = function (v) {
    this.indexes[v] = this.stack.length;
    this.stack.push(v);
};

RecursionStack.prototype.pop = function () {
    var v = this.stack[this.stack.length-1];
    this.indexes[v] = -1;
    this.stack.pop();
};

RecursionStack.prototype.indexOf = function (v) {
    return this.indexes[v];
};

function DepthFirstSearch() {
    environment.croak("Init DepthFirstSearch");
    // Explicit recursion stack to avoid cycles.
    this.seenL = null;
    this.seenR = null;
}

DepthFirstSearch.prototype.augment = function () {
    environment.croak("augment()");
    for (var l = 0; l < this.graph.L; ++l) {
        if (this.graph.marksL[l]) continue;

        this.seenL = new RecursionStack(this.graph.L);
        this.seenR = new RecursionStack(this.graph.R);

        environment.croak("Visit "+l);
        if (this.visit(l)) {
            this.graph.marksL[l] = true;
            return true;
        }
    }
    return false;
};

DepthFirstSearch.prototype.visit = function (l) {
    environment.croak("Visiting "+l);
    if (this.seenL.indexOf(l) != -1) return false;
    this.seenL.push(l);
    for (var i = 0; i < this.graph.edgeSetsL[l].length; ++i) {
        var r = this.graph.edgeSetsL[l][i];
        if (this.seenR.indexOf(r) != -1) continue;
        this.seenR.push(r);
        if (!this.graph.marksR[r]) {
            this.graph.marksR[r] = true;
            this.graph.set_mark(l, r, true);
            return true;
        }
        for (var j = 0; j < this.graph.edgeSetsR[r].length; ++j) {
            var ll = this.graph.edgeSetsR[r][j];
            environment.croak("Recursive visit "+ll);
            if (this.graph.get_mark(ll, r) && this.visit(ll)) {
                this.graph.set_mark(l, r, true);
                this.graph.set_mark(ll, r, false);
                return true;
            }
        }
        this.seenR.pop();
    }
    this.seenL.pop();
    return false;
};

BipartiteGraph.prototype.max_matching = function () {
    // The classic augmenting path algorithm.
    var marks = 0;
    for (var i = 0; i < this.L; ++i) { if (this.marksL[i]) ++marks; }
    var dfs = new DepthFirstSearch();
    dfs.graph = this;
    environment.croak("marks: "+marks);
    var paths = 0;
    while (dfs.augment()) {++paths;}
    environment.croak("max_matching: "+paths+" augmenting paths");
};

BipartiteGraph.prototype.max_independent_set = function () {
    var remaining = this.L + this.R;
    var resultL = [], resultR = [];
    var evenL = [], evenR = [];

    var i, j, l, r;

    for (l = 0; l < this.L; ++l) {
        if (!this.marksL[l]) {
            evenL.push(l);
            resultL.push(l);
            --remaining;
        }
    }
    for (r = 0; r < this.R; ++r) {
        if (!this.marksR[r]) {
            evenR.push(r);
            resultR.push(r);
            --remaining;
        }
    }
    // From this point onwards:
    // A node is marked if and only if it has not been visited.
    while (remaining > 0) {
        var oddL = [], oddR = [];
        for (i = 0; i < evenL.length; ++i) {
            l = evenL[i];
            for (j = 0; j < this.edgeSetsL[l].length; ++j) {
                r = this.edgeSetsL[l][j];
                if (this.get_mark(l, r)) continue;
                if (this.marksR[r]) {
                    oddR.push(r);
                    this.marksR[r] = false;
                    --remaining;
                }
            }
        }
        for (i = 0; i < evenR.length; ++i) {
            r = evenR[i];
            for (j = 0; j < this.edgeSetsR[r].length; ++j) {
                l = this.edgeSetsR[r][j];
                if (this.get_mark(l, r)) continue;
                if (this.marksL[l]) {
                    oddL.push(l);
                    this.marksL[l] = false;
                    --remaining;
                }
            }
        }
        if (oddL.length + oddR.length === 0) {
            for (l = 0; l < this.L; ++l) {
                if (this.marksL[l]) {
                    oddL.push(l);
                    this.marksL[l] = false;
                    --remaining;
                    break;
                }
            }
        }
        if (oddL.length + oddR.length === 0) {
            for (r = 0; r < this.R; ++r) {
                if (this.marksR[r]) {
                    oddR.push(r);
                    this.marksR[r] = false;
                    --remaining;
                    break;
                }
            }
        }
        if (oddL.length + oddR.length === 0) {
            environment.croak("ERROR: no odds?");
            break;
        }
        evenL = [];
        evenR = [];
        for (i = 0; i < oddL.length; ++i) {
            l = oddL[i];
            for (j = 0; j < this.edgeSetsL[l].length; ++j) {
                r = this.edgeSetsL[l][j];
                if (this.get_mark(l, r)) {
                    evenR.push(r);
                    this.marksR[r] = false;
                    --remaining;
                    resultR.push(r);
                }
            }
        }
        for (i = 0; i < oddR.length; ++i) {
            r = oddR[i];
            for (j = 0; j < this.edgeSetsR[r].length; ++j) {
                l = this.edgeSetsR[r][j];
                if (this.get_mark(l, r)) {
                    evenL.push(l);
                    this.marksL[l] = false;
                    --remaining;
                    resultL.push(l);
                }
            }
        }
    }
    if (remaining < 0) {
        environment.croak("ERROR: remaining < 0");
    }
    for (l = 0; l < this.L; ++l) {
        this.marksL[l] = false;
    }
    for (r = 0; r < this.R; ++r) {
        this.marksR[r] = false;
    }
    for (i = 0; i < resultL.length; ++i) {
        this.marksL[resultL[i]] = true;
    }
    for (i = 0; i < resultR.length; ++i) {
        this.marksR[resultR[i]] = true;
    }
};


///////////////////////////////////////////////////////////////////////////////

// Sweep through the grid to discover horizontal edges in yx-increasing order.
function get_horizontal_edges() {
    var rows = environment.rows, cols = environment.cols;
    var horizontalEdges = [];

    for (var r = 0; r <= rows; ++r) {
        var c0 = null;
        for (var c = 0; c <= cols; ++c) {
            var has_edge = (occupied(new Vertex(r, c)) != occupied(new Vertex(r-1, c)));
            if (has_edge && c0 === null) {
                c0 = c;
            } else if (!has_edge && c0 !== null) {
                horizontalEdges.push(new Edge(new Vertex(r, c0), new Vertex(r, c)));
                c0 = null;
            }
        }
        if (c0 !== null) {
            horizontalEdges.push(new Edge(new Vertex(r, c0), new Vertex(r, cols)));
            c0 = null;
        }
    }

    return horizontalEdges;
}
var horizontalEdges = get_horizontal_edges();
environment.display_edges(horizontalEdges, 'blue');
//environment.croak('Detected '+horizontalEdges.length+' horizontal edges');

// Sweep through the grid to discover vertical edges in xy-increasing order.
function get_vertical_edges() {
    var rows = environment.rows, cols = environment.cols;
    var verticalEdges = [];

    for (var c = 0; c <= cols; ++c) {
        var r0 = null;
        for (var r = 0; r <= rows; ++r) {
            var has_edge = (occupied(new Vertex(r, c)) != occupied(new Vertex(r, c-1)));
            if (has_edge && r0 === null) {
                r0 = r;
            } else if (!has_edge && r0 !== null) {
                verticalEdges.push(new Edge(new Vertex(r0, c), new Vertex(r, c)));
                r0 = null;
            }
        }
        if (r0 !== null) {
            verticalEdges.push(new Edge(new Vertex(r0, c), new Vertex(rows, c)));
            r0 = null;
        }
    }

    return verticalEdges;
}

var verticalEdges = get_vertical_edges();
environment.display_edges(verticalEdges, 'black');
//environment.croak('Detected '+verticalEdges.length+' vertical edges');

// Given a set of edges, produce a CellSet mapping edge endpoints to the edges
// and other points to null.
function edge_set_of_edges(edges) {
    var edgeSet = new CellSet();
    for (var i = 0, l = edges.length; i < l; ++i) {
        var e = edges[i];
        edgeSet.set(e.u, e);
        edgeSet.set(e.v, e);
    }
    return edgeSet;
}

// Like edge_set_of_edges, but mapping to edge indices instead of edges.
function edge_index_set_of_edges(edges) {
    var edgeSet = new CellSet();
    for (var i = 0, l = edges.length; i < l; ++i) {
        var e = edges[i];
        edgeSet.set(e.u, i);
        edgeSet.set(e.v, i);
    }
    return edgeSet;
}

// Checking that every vertical edge meets exactly one horizontal edge in each
// endpoint (and vice versa), produce the corners of the edges.
function get_corners(verticalEdges, horizontalEdges) {
    var horizontalEdgeSet = edge_set_of_edges(horizontalEdges);

    var corners = [];

    for (var i = 0, l = verticalEdges.length; i < l; ++i) {
        var e = verticalEdges[i];
        var eu = horizontalEdgeSet.get(e.u);
        var ev = horizontalEdgeSet.get(e.v);
        if (eu === null) {
            environment.croak('eu is null?');
        } else {
            corners.push(e.u);
        }
        if (ev === null) {
            environment.croak('ev is null?');
        } else {
            corners.push(e.v);
        }
    }

    return corners;
}

var corners = get_corners(verticalEdges, horizontalEdges);
environment.croak('Detected '+corners.length+' corners');

// A point has four neighbors.
// A point is a corner iff it is a concave or convex corner.
// A corner is concave iff it has three unoccupied neighbors.
// A corner is convex iff it has three occupied neighbors.
function is_corner_concave(v) {
    var c_occupied = 0, c_free = 0;
    for (var dir = 0; dir < 4; ++dir) {
        if (occupied(v.left_of_vector(dir))) ++c_occupied;
        else ++c_free;
    }
    if (c_occupied == 1 && c_free == 3) {
        return true;
    } else if (c_occupied == 3 && c_free == 1) {
        // convex corner
        return false;
    } else {
        environment.croak("Invalid corner at "+v.r+','+v.c+': '+c_occupied+'/'+c_free);
        return false;
    }
}

var concaveCorners = [];
(function () {
for (var i = 0, l = corners.length; i < l; ++i) {
    if (is_corner_concave(corners[i])) {
        concaveCorners.push(corners[i]);
    }
}
})();
environment.croak('Detected '+concaveCorners.length+' concave corners');

// Given a list of concave corners, produce all effective chords
// (according to the definition of the paper) in the given direction.
function get_chords(concaveCorners, dir) {
    var chords = [];
    for (var i = 0, l = concaveCorners.length; i < l; ++i) {
        var c = concaveCorners[i];
        var v = c;
        while (!occupied(v.left_of_vector(dir)) && !occupied(v.right_of_vector(dir))) {
            v = v.add(dir);
        }
        if (!v.equals(c) && occupied(v.left_of_vector(dir)) != occupied(v.right_of_vector(dir)))
            chords.push(new Edge(c, v));
    }
    return chords;
}

var horizontalChords = get_chords(concaveCorners, RIGHT);
var verticalChords = get_chords(concaveCorners, DOWN);
//var horizontalChordSet = edge_index_set_of_edges(horizontalChords);
environment.croak('Detected '+horizontalChords.length+' + '+verticalChords.length+' effective chords');
/*
(function () {
for (var i = 0, l = horizontalChords.length; i < l; ++i) {
    environment.drawEdge(horizontalChords[i]);
}
})();
(function () {
for (var i = 0, l = verticalEdges.length; i < l; ++i) {
    environment.drawEdge(verticalEdges[i]);
}
})();
*/

// Compute the intersection graph of the chords.
// Since parallel chords do not intersect, the intersection graph is bipartite.
var intersectionGraph = new BipartiteGraph(horizontalChords.length, verticalChords.length);
(function () {
var edges = 0;
for (var i = 0; i < horizontalChords.length; ++i) {
    for (var j = 0; j < verticalChords.length; ++j) {
        var h = horizontalChords[i];
        var v = verticalChords[j];
        if (v.u.r <= h.u.r && h.u.r <= v.v.r &&
            h.u.c <= v.u.c && v.u.c <= h.v.c) {
            intersectionGraph.add_edge(i, j);
            ++edges;
        }
    }
}
environment.croak("Added "+edges+" edges");
})();
intersectionGraph.max_matching();
intersectionGraph.max_independent_set();

// Extract the non-intersecting set of dividers picked by the M.I.S algorithm.
var horizontalDividers = [];
var verticalDividers = [];
(function () {
for (var l = 0; l < intersectionGraph.L; ++l) {
    if (intersectionGraph.marksL[l]) horizontalDividers.push(horizontalChords[l]);
}
for (var r = 0; r < intersectionGraph.R; ++r) {
    if (intersectionGraph.marksR[r]) verticalDividers.push(verticalChords[r]);
}
})();

var dividers = [];
dividers.push.apply(dividers, horizontalDividers);
dividers.push.apply(dividers, verticalDividers);

environment.croak(dividers.length+' '+(horizontalDividers.length+verticalDividers.length)+' dividers');

// Map divider points to true (used to check for intersections).
var dividerSpace = new CellSet();

(function () {
for (var i = 0, l = dividers.length; i < l; ++i) {
    var e = dividers[i];
    for (var r = e.u.r; r <= e.v.r; ++r) {
        for (var c = e.u.c; c <= e.v.c; ++c) {
            dividerSpace.set(new Vertex(r, c), true);
        }
    }
}
})();

// Keep going in a direction until we hit a wall or a divider.
function extend_edge(v, dir) {
    while (!occupied(v.left_of_vector(dir)) && !occupied(v.right_of_vector(dir)) && !dividerSpace.get(v))
        v = v.add(dir);
    return v;
}

var dividerSet = edge_set_of_edges(dividers);

// Add a divider for each concave corner
// that is not the endpoint of an existing divider.
(function () {
for (var i = 0, l = corners.length; i < l; ++i) {
    if (is_corner_concave(corners[i]) && dividerSet.get(corners[i]) === null) {
        var u = extend_edge(corners[i], LEFT);
        var v = extend_edge(corners[i], RIGHT);
        var e = new Edge(u, v);
        horizontalDividers.push(e);
        dividers.push(e);
        dividerSet.set(u, e);
        dividerSet.set(v, e);
    }
}
})();
environment.display_edges(horizontalDividers, 'red');
environment.display_edges(verticalDividers, 'green');

// Given a set of edges that may only intersect in their endpoints,
// map each point on an edge except the second endpoint to the edge.
function edge_space_of_edges(edges) {
    var edgeSpace = new CellSet();
    for (var i = 0, l = edges.length; i < l; ++i) {
        var e = edges[i];
        var r1 = e.u.r == e.v.r ? e.u.r + 1 : e.v.r;
        var c1 = e.u.c == e.v.c ? e.u.c + 1 : e.v.c;
        for (var r = e.u.r; r < r1; ++r) {
            for (var c = e.u.c; c < c1; ++c) {
                edgeSpace.set(new Vertex(r, c), e);
            }
        }
    }
    return edgeSpace;
}

var verticals = [];
verticals.push.apply(verticals, verticalEdges);
verticals.push.apply(verticals, verticalDividers);
var verticalEdgeSpace = edge_space_of_edges(verticals);

var horizontals = [];
horizontals.push.apply(horizontals, horizontalEdges);
horizontals.push.apply(horizontals, horizontalDividers);
var horizontalEdgeSpace = edge_space_of_edges(horizontals);

// Check if a point is a corner of a certain orientation.
function is_corner(v, cwdir) {
    var space = v.right_of_vector(cwdir);
    return (!occupied(space) &&
        verticalEdgeSpace.get(new Vertex(space.r, v.c)) !== null &&
        horizontalEdgeSpace.get(new Vertex(v.r, space.c)) !== null);
}

function is_upper_left_corner(v) { return is_corner(v, RIGHT); }
function is_upper_right_corner(v) { return is_corner(v, DOWN); }
function is_lower_left_corner(v) { return is_corner(v, UP); }
function is_lower_right_corner(v) { return is_corner(v, LEFT); }

function vertex_right_of(v) {
    return v.add(RIGHT);
}

function vertex_below(v) {
    return v.add(DOWN);
}

// Identify all upper left corners of rectangles
// and add the appropriate rectangle.
(function () {
var rectangles = 0;
for (var i = 0, l = horizontals.length; i < l; ++i) {
    var v = horizontals[i].u;
    if (!is_upper_left_corner(v)) continue;
    var upperLeft = v;
    var upperRight = vertex_right_of(v);
    while (!is_upper_right_corner(upperRight)) upperRight = vertex_right_of(upperRight);
    var lowerLeft = vertex_below(upperLeft);
    while (!is_lower_left_corner(lowerLeft)) lowerLeft = vertex_below(lowerLeft);
    var lowerRight = vertex_right_of(lowerLeft);
    while (!is_lower_right_corner(lowerRight)) lowerRight = vertex_right_of(lowerRight);
    environment.add_rect(upperLeft.r, upperLeft.c, lowerRight.r, lowerRight.c);
    ++rectangles;
}
environment.croak("Covered with "+rectangles+" rectangle(s)");
})();
