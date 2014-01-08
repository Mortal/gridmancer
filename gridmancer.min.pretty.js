var d, g, h, l, ba, m, n = [[1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 
1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 
1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
function ca() {
  var a = d = n.length, b = g = n[0].length;
  h = function(c, e) {
    return 0 > c || 0 > e || c >= a || e >= b ? !0 : !n[c][e];
  };
  l = function(a) {
    console.log(a);
  };
  ba = function(a, b, f, q) {
    var k = document.createElement("div");
    k.style.position = "absolute";
    k.style.top = 20 * a + "px";
    k.style.left = 20 * b + "px";
    k.style.height = 20 * (f - a) + "px";
    k.style.width = 20 * (q - b) + "px";
    k.style.backgroundColor = "hsla(" + 360 * Math.random() + ",100%,50%,0.2)";
    document.documentElement.appendChild(k);
  };
  m = function(a, b) {
    for (var f = 0, q = a.length;f < q;++f) {
      var k = a[f], J = k.c.a == k.f.a, r = document.createElement("div");
      r.style.position = "absolute";
      J ? r.style.borderTop = "1px solid " + b : r.style.borderLeft = "1px solid " + b;
      r.style.left = 20 * k.c.b + "px";
      r.style.top = 20 * k.c.a + "px";
      J ? (r.style.width = 20 * (k.f.b - k.c.b) + "px", r.style.height = "10px") : (r.style.height = 20 * (k.f.a - k.c.a) + "px", r.style.width = "10px");
      document.documentElement.appendChild(r);
    }
  };
}
function da() {
  var a = this.getNavGrid().grid, b = d = a.length / 4 | 0, c = g = a[0].length / 4 | 0;
  h = function(e, f) {
    return 0 > e || 0 > f || e >= b || f >= c ? !0 : 0 < a[4 * e][4 * f].length;
  };
  ba = function(a, b) {
    return function(c, e, f, aa) {
      aa -= e;
      f -= c;
      b.call(a, 4 * (e + aa / 2), 4 * (c + f / 2), 4 * aa, 4 * f);
    };
  }(this, this.addRect);
  l = function() {
    return function() {
    };
  }(this, this.say);
  m = function() {
  };
  if (b != n.length || c != n[0].length) {
    l("dims: " + b + "x" + c + " != " + n.length + "x" + n[0].length);
  } else {
    for (var e = 0;e < b;++e) {
      for (var f = 0;f < c;++f) {
        !n[e][f] !== h(e, f) && l("cell: " + e + "," + f);
      }
    }
  }
}
this.getNavGrid ? da.call(this) : ca();
function p(a) {
  return h(a.a, a.b);
}
function s(a) {
  for (var b = [], c = 0;c < a;++c) {
    b.push(null);
  }
  return b;
}
function t(a, b) {
  this.a = a | 0;
  this.b = b | 0;
}
t.prototype.add = function(a) {
  var b = this.a, c = this.b;
  0 == a ? --b : 1 == a ? ++c : 2 == a ? ++b : 3 == a && --c;
  return new t(b, c);
};
function u(a, b) {
  var c = a.a, e = a.b;
  0 == b ? (--c, --e) : 1 == b ? --c : 2 != b && 3 == b && --e;
  return new t(c, e);
}
function v(a, b) {
  this.c = a;
  this.f = b;
}
function w() {
  var a = d, b = g;
  this.l = s(a + 1);
  for (var c = 0;c <= a;++c) {
    this.l[c] = s(b + 1);
    for (var e = 0;e <= b;++e) {
      this.l[c][e] = null;
    }
  }
}
w.prototype.get = function(a) {
  var b = d, c = g;
  return 0 > a.a || a.a > b || 0 > a.b || a.b > c ? null : this.l[a.a][a.b];
};
w.prototype.set = function(a, b) {
  this.l[a.a] || console.log(a);
  this.l[a.a][a.b] = b;
};
function x(a) {
  this.stack = [];
  this.m = s(a);
  for (var b = 0;b < a;++b) {
    this.m[b] = -1;
  }
}
x.prototype.push = function(a) {
  this.m[a] = this.stack.length;
  this.stack.push(a);
};
x.prototype.pop = function() {
  this.m[this.stack[this.stack.length - 1]] = -1;
  this.stack.pop();
};
x.prototype.indexOf = function(a) {
  return this.m[a];
};
function ea() {
  var a = fa;
  l("augment()");
  for (var b = 0;b < a.d.i;++b) {
    if (!a.d.g[b] && (a.n = new x(a.d.i), a.o = new x(a.d.e), l("Visit " + b), ga(a, b))) {
      return a.d.g[b] = !0;
    }
  }
  return!1;
}
function ga(a, b) {
  l("Visiting " + b);
  if (-1 != a.n.indexOf(b)) {
    return!1;
  }
  a.n.push(b);
  for (var c = 0;c < a.d.j[b].length;++c) {
    var e = a.d.j[b][c];
    if (-1 == a.o.indexOf(e)) {
      a.o.push(e);
      if (!a.d.h[e]) {
        a.d.h[e] = !0;
        var f = a.d;
        return f.marks[b * f.e + e] = !0;
      }
      for (var q = 0;q < a.d.k[e].length;++q) {
        f = a.d.k[e][q];
        l("Recursive visit " + f);
        var k = a.d;
        if (k.marks[f * k.e + e] && ga(a, f)) {
          return c = a.d, c.marks[b * c.e + e] = !0, c = a.d, c.marks[f * c.e + e] = !1, !0;
        }
      }
      a.o.pop();
    }
  }
  a.n.pop();
  return!1;
}
for (var ha = d, ia = g, y = [], z = 0;z <= ha;++z) {
  for (var A = null, B = 0;B <= ia;++B) {
    var ja = p(new t(z, B)) != p(new t(z - 1, B));
    ja && null === A ? A = B : ja || null === A || (y.push(new v(new t(z, A), new t(z, B))), A = null);
  }
  null !== A && y.push(new v(new t(z, A), new t(z, ia)));
}
m(y, "blue");
for (var ka = d, la = g, C = [], D = 0;D <= la;++D) {
  for (var E = null, F = 0;F <= ka;++F) {
    var ma = p(new t(F, D)) != p(new t(F, D - 1));
    ma && null === E ? E = F : ma || null === E || (C.push(new v(new t(E, D), new t(F, D))), E = null);
  }
  null !== E && C.push(new v(new t(E, D), new t(ka, D)));
}
m(C, "black");
function na(a) {
  for (var b = new w, c = 0, e = a.length;c < e;++c) {
    var f = a[c];
    b.set(f.c, f);
    b.set(f.f, f);
  }
  return b;
}
for (var oa = na(y), G = [], pa = 0, qa = C.length;pa < qa;++pa) {
  var ra = C[pa], sa = oa.get(ra.c), ta = oa.get(ra.f);
  null === sa ? l("eu is null?") : G.push(ra.c);
  null === ta ? l("ev is null?") : G.push(ra.f);
}
l("Detected " + G.length + " corners");
function ua(a) {
  for (var b = 0, c = 0, e = 0;4 > e;++e) {
    p(u(a, e)) ? ++b : ++c;
  }
  if (1 == b && 3 == c) {
    return!0;
  }
  3 == b && 1 == c || l("Invalid corner at " + a.a + "," + a.b + ": " + b + "/" + c);
  return!1;
}
for (var va = [], wa = 0, xa = G.length;wa < xa;++wa) {
  ua(G[wa]) && va.push(G[wa]);
}
l("Detected " + va.length + " concave corners");
function ya(a) {
  for (var b = va, c = [], e = 0, f = b.length;e < f;++e) {
    for (var q = b[e], k = q;!p(u(k, a)) && !p(u(k, (a + 1) % 4));) {
      k = k.add(a);
    }
    k.a == q.a && k.b == q.b || p(u(k, a)) == p(u(k, (a + 1) % 4)) || c.push(new v(q, k));
  }
  return c;
}
var H = ya(1), I = ya(2);
l("Detected " + H.length + " + " + I.length + " effective chords");
for (var K = new function() {
  var a = H.length, b = I.length;
  this.i = a;
  this.e = b;
  this.j = s(a);
  this.k = s(b);
  this.marks = s(a * b);
  this.g = s(a);
  this.h = s(b);
  var c;
  for (c = 0;c < a;++c) {
    this.j[c] = [];
  }
  for (c = 0;c < b;++c) {
    this.k[c] = [];
  }
}, za = 0, Aa = 0;Aa < H.length;++Aa) {
  for (var Ba = 0;Ba < I.length;++Ba) {
    var Ca = H[Aa], Da = I[Ba];
    if (Da.c.a <= Ca.c.a && Ca.c.a <= Da.f.a && Ca.c.b <= Da.c.b && Da.c.b <= Ca.f.b) {
      var Ea = Aa, Fa = Ba, Ga = K;
      Ga.j[Ea].push(Fa);
      Ga.k[Fa].push(Ea);
      ++za;
    }
  }
}
l("Added " + za + " edges");
for (var Ha = 0, Ia = 0;Ia < K.i;++Ia) {
  K.g[Ia] && ++Ha;
}
var fa = new function() {
  l("Init DepthFirstSearch");
  this.o = this.n = null;
};
fa.d = K;
l("marks: " + Ha);
for (var Ja = 0;ea();) {
  ++Ja;
}
l("max_matching: " + Ja + " augmenting paths");
var L = K.i + K.e, Ka = [], La = [], M = [], N = [], O, P, Q, R;
for (Q = 0;Q < K.i;++Q) {
  K.g[Q] || (M.push(Q), Ka.push(Q), --L);
}
for (R = 0;R < K.e;++R) {
  K.h[R] || (N.push(R), La.push(R), --L);
}
for (;0 < L;) {
  var S = [], T = [];
  for (O = 0;O < M.length;++O) {
    for (Q = M[O], P = 0;P < K.j[Q].length;++P) {
      R = K.j[Q][P], !K.marks[Q * K.e + R] && K.h[R] && (T.push(R), K.h[R] = !1, --L);
    }
  }
  for (O = 0;O < N.length;++O) {
    for (R = N[O], P = 0;P < K.k[R].length;++P) {
      Q = K.k[R][P], !K.marks[Q * K.e + R] && K.g[Q] && (S.push(Q), K.g[Q] = !1, --L);
    }
  }
  if (0 === S.length + T.length) {
    for (Q = 0;Q < K.i;++Q) {
      if (K.g[Q]) {
        S.push(Q);
        K.g[Q] = !1;
        --L;
        break;
      }
    }
  }
  if (0 === S.length + T.length) {
    for (R = 0;R < K.e;++R) {
      if (K.h[R]) {
        T.push(R);
        K.h[R] = !1;
        --L;
        break;
      }
    }
  }
  if (0 === S.length + T.length) {
    l("ERROR: no odds?");
    break;
  }
  M = [];
  N = [];
  for (O = 0;O < S.length;++O) {
    for (Q = S[O], P = 0;P < K.j[Q].length;++P) {
      R = K.j[Q][P], K.marks[Q * K.e + R] && (N.push(R), K.h[R] = !1, --L, La.push(R));
    }
  }
  for (O = 0;O < T.length;++O) {
    for (R = T[O], P = 0;P < K.k[R].length;++P) {
      Q = K.k[R][P], K.marks[Q * K.e + R] && (M.push(Q), K.g[Q] = !1, --L, Ka.push(Q));
    }
  }
}
0 > L && l("ERROR: remaining < 0");
for (Q = 0;Q < K.i;++Q) {
  K.g[Q] = !1;
}
for (R = 0;R < K.e;++R) {
  K.h[R] = !1;
}
for (O = 0;O < Ka.length;++O) {
  K.g[Ka[O]] = !0;
}
for (O = 0;O < La.length;++O) {
  K.h[La[O]] = !0;
}
for (var U = [], V = [], Ma = 0;Ma < K.i;++Ma) {
  K.g[Ma] && U.push(H[Ma]);
}
for (var Na = 0;Na < K.e;++Na) {
  K.h[Na] && V.push(I[Na]);
}
var W = [];
W.push.apply(W, U);
W.push.apply(W, V);
l(W.length + " " + (U.length + V.length) + " dividers");
for (var Oa = new w, Pa = 0, Qa = W.length;Pa < Qa;++Pa) {
  for (var Ra = W[Pa], Sa = Ra.c.a;Sa <= Ra.f.a;++Sa) {
    for (var Ta = Ra.c.b;Ta <= Ra.f.b;++Ta) {
      Oa.set(new t(Sa, Ta), !0);
    }
  }
}
function Ua(a) {
  for (var b = G[X];!p(u(b, a)) && !p(u(b, (a + 1) % 4)) && !Oa.get(b);) {
    b = b.add(a);
  }
  return b;
}
for (var Va = na(W), X = 0, Wa = G.length;X < Wa;++X) {
  if (ua(G[X]) && null === Va.get(G[X])) {
    var Xa = Ua(3), Ya = Ua(1), Za = new v(Xa, Ya);
    U.push(Za);
    W.push(Za);
    Va.set(Xa, Za);
    Va.set(Ya, Za);
  }
}
m(U, "red");
m(V, "green");
function $a(a) {
  for (var b = new w, c = 0, e = a.length;c < e;++c) {
    for (var f = a[c], q = f.c.a == f.f.a ? f.c.a + 1 : f.f.a, k = f.c.b == f.f.b ? f.c.b + 1 : f.f.b, J = f.c.a;J < q;++J) {
      for (var r = f.c.b;r < k;++r) {
        b.set(new t(J, r), f);
      }
    }
  }
  return b;
}
var Y = [];
Y.push.apply(Y, C);
Y.push.apply(Y, V);
var ab = $a(Y), Z = [];
Z.push.apply(Z, y);
Z.push.apply(Z, U);
var bb = $a(Z);
function cb(a, b) {
  var c = u(a, (b + 1) % 4);
  return!p(c) && null !== ab.get(new t(c.a, a.b)) && null !== bb.get(new t(a.a, c.b));
}
for (var db = 0, eb = 0, fb = Z.length;eb < fb;++eb) {
  var gb = Z[eb].c;
  if (cb(gb, 1)) {
    for (var hb = gb, ib = gb.add(1);!cb(ib, 2);) {
      ib = ib.add(1);
    }
    for (var jb = hb.add(2);!cb(jb, 0);) {
      jb = jb.add(2);
    }
    for (var $ = jb.add(1);!cb($, 3);) {
      $ = $.add(1);
    }
    ba(hb.a, hb.b, $.a, $.b);
    ++db;
  }
}
l("Covered with " + db + " rectangle(s)");
