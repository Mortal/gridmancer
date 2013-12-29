// vim:set sw=4 et:

var grid = this.getNavGrid().grid;
var tileSize = 4;

var rows = (grid.length / tileSize)|0;
var cols = (grid[0].length / tileSize)|0;

function occupied_yx(y, x) {
    if (y < 0 || x < 0 || y >= rows || x >= cols) return true;
    return grid[tileSize*y][tileSize*x].length > 0;
}

var add_rect = (function (self, addRect) {
    return function add_rect(y1, x1, y2, x2) {
        addRect.call(self, tileSize * x1 + tileSize / 2, tileSize * y1 + tileSize / 2, tileSize * (x2 - x1), tileSize * (y2 - y1));
    };
})(this, this.addRect);

var croak = (function (self, say) {
    return function croak(s) {
        say.call(self, s);
    };
})(this, this.say);

function display_edges(edges, color) {
    // noop
}

/*
var grid = [
[0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],
[0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
[1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
[0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1],
[0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0],
[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0]];

var rows = grid.length, cols = grid[0].length;
function occupied_yx(y, x) {
    if (y < 0 || x < 0 || y >= rows || x >= cols) return true;
    return !grid[y][x];
}
function croak(s) {
    console.log(s);
}
function add_rect(y1, x1, y2, x2) {
    var div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.top = y1 * 20 + 'px';
    div.style.left = x1 * 20 + 'px';
    div.style.height = (y2-y1) * 20 + 'px';
    div.style.width = (x2-x1) * 20 + 'px';
    div.style.backgroundColor = 'hsla('+(360*Math.random())+',100%,50%,0.2)';
    document.documentElement.appendChild(div);
}

function display_edges(edges, color) {
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
}
*/

var UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;
function left_of(d) { return (d+3)%4; }
function right_of(d) { return (d+1)%4; }

function Vertex(r, c) {
    this.r = r|0;
    this.c = c|0;
}

Vertex.prototype.equals = function Vertex_equals(other) {
    return this.r == other.r && this.c == other.c;
};

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

function Edge(u, v) {
    this.u = u;
    this.v = v;
}

function occupied(v) {
    return occupied_yx(v.r, v.c);
}

function new_Array(n) {
    var a = [];
    for (var i = 0; i < n; ++i) {
        a.push(null);
    }
    return a;
}

function CellSet() {
    this.a = new_Array(rows+1);
    for (var i = 0; i <= rows; ++i) {
        this.a[i] = new_Array(cols+1);
        for (var j = 0; j <= cols; ++j) this.a[i][j] = null;
    }
}

CellSet.prototype.get = function CellSet_get(v) {
    if (v.r < 0 || v.r > rows || v.c < 0 || v.c > cols) return null;
    return this.a[v.r][v.c];
};

CellSet.prototype.set = function CellSet_set(v, o) {
    if (!this.a[v.r])
        console.log(v);
    this.a[v.r][v.c] = o;
};

function BipartiteGraph(L, R) {
    this.L = L;
    this.R = R;
    this.edgeSetsL = new_Array(L);
    this.edgeSetsR = new_Array(R);
    this.marks = new_Array(L*R);
    this.marksL = new_Array(L);
    this.marksR = new_Array(R);
    for (var i = 0; i < L; ++i) {
        this.edgeSetsL[i] = [];
    }
    for (var i = 0; i < R; ++i) {
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

BipartiteGraph.prototype.max_matching = function () {
    function augment() {
        for (var l = 0; l < this.L; ++l) {
            if (this.marksL[l]) continue;
            var seenL = [];
            var seenR = [];
            function visit(l) {
                if (seenL.indexOf(l) != -1) return false;
                seenL.push(l);
                for (var i = 0; i < this.edgeSetsL[l].length; ++i) {
                    var r = this.edgeSetsL[l][i];
                    if (seenR.indexOf(r) != -1) continue;
                    seenR.push(r);
                    if (!this.marksR[r]) {
                        this.marksR[r] = true;
                        this.set_mark(l, r, true);
                        return true;
                    }
                    for (var j = 0; j < this.edgeSetsR[r].length; ++j) {
                        var ll = this.edgeSetsR[r][j];
                        if (this.get_mark(ll, r) && visit.call(this, ll)) {
                            this.set_mark(l, r, true);
                            this.set_mark(ll, r, false);
                            return true;
                        }
                    }
                    seenR.pop();
                }
                seenL.pop();
                return false;
            }
            if (visit.call(this, l)) {
                this.marksL[l] = true;
                return true;
            }
        }
    }
    while (augment.call(this)) {}
};

BipartiteGraph.prototype.max_independent_set = function () {
    var remaining = this.L + this.R;
    var resultL = [], resultR = [];
    var evenL = [], evenR = [];

    for (var l = 0; l < this.L; ++l) {
        if (!this.marksL[l]) {
            evenL.push(l);
            resultL.push(l);
            --remaining;
        }
    }
    for (var r = 0; r < this.R; ++r) {
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
        for (var i = 0; i < evenL.length; ++i) {
            var l = evenL[i];
            for (var j = 0; j < this.edgeSetsL[l].length; ++j) {
                var r = this.edgeSetsL[l][j];
                if (this.get_mark(l, r)) continue;
                if (this.marksR[r]) {
                    oddR.push(r);
                    this.marksR[r] = false;
                    --remaining;
                }
            }
        }
        for (var i = 0; i < evenR.length; ++i) {
            var r = evenR[i];
            for (var j = 0; j < this.edgeSetsR[r].length; ++j) {
                var l = this.edgeSetsR[r][j];
                if (this.get_mark(l, r)) continue;
                if (this.marksL[l]) {
                    oddL.push(l);
                    this.marksL[l] = false;
                    --remaining;
                }
            }
        }
        if (oddL.length + oddR.length == 0) {
            for (var l = 0; l < this.L; ++l) {
                if (this.marksL[l]) {
                    oddL.push(l);
                    this.marksL[l] = false;
                    --remaining;
                    break;
                }
            }
        }
        if (oddL.length + oddR.length == 0) {
            for (var r = 0; r < this.R; ++r) {
                if (this.marksR[r]) {
                    oddR.push(r);
                    this.marksR[r] = false;
                    --remaining;
                    break;
                }
            }
        }
        if (oddL.length + oddR.length == 0) {
            croak("ERROR: no odds?");
            break;
        }
        evenL = [];
        evenR = [];
        for (var i = 0; i < oddL.length; ++i) {
            var l = oddL[i];
            for (var j = 0; j < this.edgeSetsL[l].length; ++j) {
                var r = this.edgeSetsL[l][j];
                if (this.get_mark(l, r)) {
                    evenR.push(r);
                    this.marksR[r] = false;
                    --remaining;
                    resultR.push(r);
                }
            }
        }
        for (var i = 0; i < oddR.length; ++i) {
            var r = oddR[i];
            for (var j = 0; j < this.edgeSetsR[r].length; ++j) {
                var l = this.edgeSetsR[r][j];
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
        croak("ERROR: remaining < 0");
    }
    for (var l = 0; l < this.L; ++l) {
        this.marksL[l] = false;
    }
    for (var r = 0; r < this.R; ++r) {
        this.marksR[r] = false;
    }
    for (var i = 0; i < resultL.length; ++i) {
        this.marksL[resultL[i]] = true;
    }
    for (var i = 0; i < resultR.length; ++i) {
        this.marksR[resultR[i]] = true;
    }
};

var visited = new CellSet();

function get_horizontal_edges() {
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
display_edges(horizontalEdges, 'blue');

function get_vertical_edges() {
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
display_edges(verticalEdges, 'black');

function edge_set_of_edges(edges) {
    var edgeSet = new CellSet();
    for (var i = 0, l = edges.length; i < l; ++i) {
        var e = edges[i];
        edgeSet.set(e.u, e);
        edgeSet.set(e.v, e);
    }
    return edgeSet;
}

function edge_index_set_of_edges(edges) {
    var edgeSet = new CellSet();
    for (var i = 0, l = edges.length; i < l; ++i) {
        var e = edges[i];
        edgeSet.set(e.u, i);
        edgeSet.set(e.v, i);
    }
    return edgeSet;
}

function get_corners(verticalEdges, horizontalEdges) {
    var horizontalEdgeSet = edge_set_of_edges(horizontalEdges);

    var corners = [];

    for (var i = 0, l = verticalEdges.length; i < l; ++i) {
        var e = verticalEdges[i];
        var eu = horizontalEdgeSet.get(e.u);
        var ev = horizontalEdgeSet.get(e.v);
        if (eu === null) {
            croak('eu is null?');
        } else {
            corners.push(e.u);
        }
        if (ev === null) {
            croak('ev is null?');
        } else {
            corners.push(e.v);
        }
    }

    return corners;
}

var corners = get_corners(verticalEdges, horizontalEdges);

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
        croak("Invalid corner at "+v.r+','+v.c+': '+c_occupied+'/'+c_free);
        return false;
    }
}

var concaveCorners = [];
for (var i = 0, l = corners.length; i < l; ++i) {
    if (is_corner_concave(corners[i])) {
        concaveCorners.push(corners[i]);
    }
}

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
var graph = new BipartiteGraph(horizontalChords.length, verticalChords.length);
(function () {
for (var i = 0; i < horizontalChords.length; ++i) {
    for (var j = 0; j < verticalChords.length; ++j) {
        var h = horizontalChords[i];
        var v = verticalChords[j];
        if (v.u.r <= h.u.r && h.u.r <= v.v.r &&
            h.u.c <= v.u.c && v.u.c <= h.v.c)
            graph.add_edge(i, j);
    }
}
})();
graph.max_matching();
graph.max_independent_set();

var horizontalDividers = [];
var verticalDividers = [];
(function () {
for (var l = 0; l < graph.L; ++l) {
    if (graph.marksL[l]) horizontalDividers.push(horizontalChords[l]);
}
for (var r = 0; r < graph.R; ++r) {
    if (graph.marksR[r]) verticalDividers.push(verticalChords[r]);
}
})();

var dividers = [];
dividers.push.apply(dividers, horizontalDividers);
dividers.push.apply(dividers, verticalDividers);

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

function extend_edge(v, dir) {
    while (!occupied(v.left_of_vector(dir)) && !occupied(v.right_of_vector(dir)) && !dividerSpace.get(v))
        v = v.add(dir);
    return v;
}

var dividerSet = edge_set_of_edges(dividers);
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
display_edges(horizontalDividers, 'red');
display_edges(verticalDividers, 'green');

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
    add_rect(upperLeft.r, upperLeft.c, lowerRight.r, lowerRight.c);
}

/*
var rings = [];

function visit(v) {
    // Seek to a top-left corner
    while (!occupied(v.add(UP))) v = v.add(UP);
    while (!occupied(v.add(LEFT))) v = v.add(LEFT);
    var vertices = [v];
    var dir = RIGHT;
    do {
        // Invariant: !occupied(v)
        var turn_to = v.left_of_vector(dir);
        var ahead = v.right_of_vector(dir);
        if (!occupied(turn_to)) {
            vertices.push(v);
            dir = left_of(dir);
        } else if (occupied(ahead)) {
            vertices.push(v);
            dir = right_of(dir);
        }
        v = v.add(dir);
    } while (!v.equals(vertices[0]));
    rings.push(vertices);
}

for (var i = 0; i < rows; ++i) {
    for (var j = 0; j < cols; ++j) {
        var v = new Vertex(i, j);
        if (!occupied(v) && visited.get(v) == null) {
            visit(v);
        }
    }
}
*/

/*
for(var y = 0; y + tileSize < grid.length; y += tileSize) {
    for(var x = 0; x + tileSize < grid[0].length; x += tileSize) {
        var occupied = grid[y][x].length > 0;
        if(!occupied) {
            this.addRect(x + tileSize / 2, y + tileSize / 2, tileSize, tileSize);
            this.wait();  // Hover over the timeline to help debug!
        }
    }
}
*/
