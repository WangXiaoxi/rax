const { getDomObject, innerHTML } = require('sfc-shared-utils');

module.exports = function parse(html) {
  const dom = getDomObject(html);
  const importLinks = [];
  const styleSheetLinks = [];
  let template = '',
    script = '',
    styles = '';

  dom.forEach(node => {
    const { name, children, attribs } = node;
    switch (name) {
      case 'link':
        let rel = attribs.rel.toLowerCase();
        if (rel === 'import') {
          importLinks.push(attribs.href);
        }
        if (rel === 'stylesheet') {
          styleSheetLinks.push(attribs.href);
        }
        break;
      case 'template':
        template = innerHTML(children);
        break;
      case 'style':
        styles += innerHTML(children);
        break;
      case 'script':
        script = innerHTML(children);
        break;
      default:
        break;
    }
  });

  return {
    template: {
      type: 'template',
      content: template,
      lang: ''
    },
    script: {
      type: 'script',
      content: script,
      lang: ''
    },
    // allow multiple style tag
    // combine all css string
    styles: {
      type: 'style',
      content: styles
    },
    importLinks: importLinks,
    styleSheetLinks: styleSheetLinks
  };
};
