export type TagAttributes = Record<string, string | number | boolean>;

const voidTags = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

class Tag {
  constructor(
    private readonly name: string,
    private readonly attributes: TagAttributes = {},
    private readonly body = '',
  ) {}

  toString(): string {
    const attributes = Object.entries(this.attributes)
      .map(([name, value]) => `${name}="${String(value)}"`)
      .join(' ');
    const openingTag = `<${this.name}${attributes === '' ? '' : ` ${attributes}`}>`;

    if (voidTags.has(this.name.toLowerCase())) {
      return openingTag;
    }

    return `${openingTag}${this.body}</${this.name}>`;
  }
}

export { Tag };
export default Tag;
