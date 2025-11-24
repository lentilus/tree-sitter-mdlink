module.exports = grammar({
  name: 'mdlink',

  // allow whitespace/newlines as extras so blank lines don't produce ERRORs
  extras: $ => [/\s+/],

  rules: {
    source_file: $ => repeat($._inline),

    _inline: $ => choice(
      $.link,
      /[^\[\]\(\)\n]+/       // plain text
    ),

    // link node with labeled child nodes
    link: $ => seq(
      '[', field('text', $.label), ']',   // capture label as a `label` node
      '(', field('destination', $.destination), ')' // capture destination as `destination`
    ),

    // make label/destination explicit node types (token rules)
    label: $ => /[^\]\n]+/,
    destination: $ => /[^\)\n]+/,
  }
});
