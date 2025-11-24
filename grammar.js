// tiny Tree-sitter grammar that recognizes Markdown links of the form
//    [name](destination)
// Fields produced: `text` (link label) and `destination` (link target)

module.exports = grammar({
  name: 'mdlink',

  // disable default extras (whitespace/comments) so matching is simple
  extras: $ => [],

  rules: {
    // the entry point: a sequence of inline pieces (links or plain text)
    source_file: $ => repeat($._inline),

    _inline: $ => choice(
      $.link,
      // any plain text that isn't brackets/parentheses or newline
      /[^\[\]\(\)\n]+/
    ),

    // A simple link: [label](destination)
    // label: everything up to a closing ']' (excluding newlines)
    // destination: everything up to a closing ')' (excluding newlines)
    link: $ => seq(
      '[',
      field('text', /[^\]\n]+/),
      ']',
      '(',
      field('destination', /[^)\n]+/),
      ')'
    ),
  }
});
