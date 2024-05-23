const gfmHighlight = [
  { from: 'Note', to: '[!NOTE]' },
  { from: 'Tip', to: '[!TIP]' },
  { from: 'Important', to: '[!IMPORTANT]' },
  { from: 'Warning', to: '[!WARNING]' },
  { from: 'Caution', to: '[!CAUTION]' },
];

function remarkGfmHighlight() {
  return async (tree) => {
    const { visit } = await import('unist-util-visit');
    visit(tree, 'blockquote', (node) => {
      visit(node.children[0], 'strong', (subnode) => {
        if (subnode.position.start.column !== 3) return;
        visit(subnode, 'text', (textnode) => {
          if (!['Note', 'Tip', 'Important', 'Warning', 'Caution'].includes(textnode.value)) return;
          for (const item of gfmHighlight) {
            if (item.from !== textnode.value) continue;
            subnode.type = 'text';
            subnode.value = item.to;
            return;
          }
        });
      });
    });
  };
}

function replaceNBSP(str) {
  return str.replaceAll(' ', ' ');
}

module.exports = {
  $schema: 'https://json.schemastore.org/remarkrc',
  plugins: [
    'remark-gfm',
    'remark-frontmatter',
    'remark-pangu',
    ['remark-textr', { plugins: [replaceNBSP] }],
    remarkGfmHighlight,
    // ----- Plugin -----------------------------------------------------------
    'remark-sort-definitions',
    ['remark-toc', { heading: 'TOC', maxDepth: 3 }],
    'remark-remove-unused-definitions',
    // ----- Presets -----------------------------------------------------------
    'remark-preset-lint-markdown-style-guide',
    'remark-preset-lint-recommended',
    'remark-preset-lint-consistent',
    // ----- Built-In ----------------------------------------------------------
    'remark-lint-checkbox-content-indent',
    'remark-lint-linebreak-style',
    'remark-lint-no-duplicate-headings-in-section',
    'remark-lint-no-empty-url',
    'remark-lint-no-heading-indent',
    'remark-lint-no-heading-like-paragraph',
    'remark-lint-no-paragraph-content-indent',
    'remark-lint-no-reference-like-url',
    'remark-lint-no-tabs',
    'remark-lint-no-unneeded-full-reference-image',
    'remark-lint-no-unneeded-full-reference-link',
    // ----- External ----------------------------------------------------------
    'remark-lint-no-empty-sections',
    'remark-lint-write-good',
    'remark-lint-frontmatter-schema',
    // ----- Overrides ---------------------------------------------------------
    ['remark-lint-list-item-indent', 'space'],
    ['remark-lint-list-item-spacing', { checkBlanks: true }],
    ['remark-lint-no-duplicate-headings', false],
    ['remark-lint-no-file-name-irregular-characters', '\\.a-zA-Z0-9-_'],
    ['remark-lint-no-file-name-mixed-case', false],
    ['remark-lint-no-literal-urls', false],
    ['remark-lint-no-shell-dollars', false],
    ['remark-lint-ordered-list-marker-value', false],
  ],
  settings: {
    bullet: '-',
    emphasis: '*',
    fences: true,
    listItemIndent: 1,
    rule: '-',
    strong: '*',
    tightDefinitions: true,
    maximumLineLength: 100,
  },
};
