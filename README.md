Gridmancer is the following level on CodeCombat:
http://codecombat.com/play/level/gridmancer

CodeCombat advertises "Beat This Level, Get A Programming Job".

Well, I implemented the general solution to finding the minimum dissection of a
rectilinear region. It uses a sweep-line and computes the maximal independent
set in a bipartite graph as described in section 7.1 of the paper:

Hiroshi Imai, Takao Asano:
Efficient algorithms for geometric graph search problems (1986)
https://dl.acm.org/citation.cfm?id=14098
http://epubs.siam.org/doi/pdf/10.1137/0215033

The code in gridmancer.js does not work when input directly into CodeCombat.
However, after compiling with the Closure Compiler (advanced optimizations,
pretty printing enabled), the code runs without a problem.
