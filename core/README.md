# Backend

## Language(s)

There are 5 _How to Design Programs_ Student Languages (*SLs):

1. Beginning Student (BSL) ([`spec`](https://docs.racket-lang.org/htdp-langs/beginner.html))
2. Beginning Student with List Abbreviations (BSL+) ([`spec`](https://docs.racket-lang.org/htdp-langs/beginner-abbr.html))
3. Intermediate Student (ISL) ([`spec`](https://docs.racket-lang.org/htdp-langs/intermediate.html))
4. Intermediate Student with Lambda (ISL+) ([`spec`](https://docs.racket-lang.org/htdp-langs/intermediate-lam.html))
5. Advanced Student (ASL) ([`spec`](https://docs.racket-lang.org/htdp-langs/advanced.html))

BSL and BSL+ is a first order, purely functional language (doesn’t even have a let). ISL and ISL+ adds lambda which makes functions higher order and first class. ASL adds mutation and imperative I/O. Initially the parser is built to BSL's spec, then it is iterated over for other student languages.

## Parser

[PEG](https://en.wikipedia.org/wiki/Parsing_expression_grammar) parser for a subset of Scheme/Racket known as 
student languages. The parser can be experimented with on [https://pegjs.org/online](pegjs.org).

### Limitations

The parser does not support:
- _all_ kinds of Racket/Scheme numbers (number grammar - [Racket](https://docs.racket-lang.org/reference/reader.html?q=reading%20number#%28part._parse-number%29), [R6RS](http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-7.html#node_sec_4.2.8))
- _all_ kinds of strings (strings grammar - [Racket](https://docs.racket-lang.org/reference/reader.html?q=reading%20strings#%28part._parse-string%29), [R6RS](http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-7.html#node_sec_4.2.7))
- [Template Variables](https://docs.racket-lang.org/htdp-langs/beginner.html#%28part._beginner._.Template._.Variables%29)


## Structure

- `parser/parser.pegjs` The parser specification
- `parser/dist/parser.js` The generated parser
- `parser/ast.ts`: Abstract syntax tree specification.
- `parser/tests/([0-9]+)-in.rkt`: files with valid Racket programs
- `parser/tests/([0-9]+)-ast-out.json`: files with valid AST for corresponding programs
- `parser/xparser`: Executable that takes in a program from STDIN and prints the AST to STDOUT
- `parser/tests/run-tests`: Adds new lines optionally to output files, compresses json, then 
   compares with the output of xparser.
- `parser/Makefile` compiles the parser from its specification

# Tools

- [Peg.js Language](https://marketplace.visualstudio.com/items?itemName=SirTobi.pegjs-language): Syntax highlighting
  and Errors for for PEGJS in VSCode
- [jj](https://github.com/tidwall/jj): Compressing JSON. 
