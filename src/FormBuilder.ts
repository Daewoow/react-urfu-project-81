import Tag, { type TagAttributes } from './Tag.js';

export type Entity = Record<string, unknown>;

export type InputOptions = {
  as?: string;
  [name: string]: string | number | boolean | undefined;
};

const toTagAttributes = (options: InputOptions): TagAttributes =>
  Object.fromEntries(
    Object.entries(options).filter(([, value]) => value !== undefined),
  ) as TagAttributes;

class FormBuilder {
  private readonly fields: string[] = [];

  constructor(private readonly entity: Entity) {}

  input(name: string, options: InputOptions = {}): void {
    if (!Object.hasOwn(this.entity, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as, ...customAttributes } = options;
    const attributes = toTagAttributes(customAttributes);
    const value = String(this.entity[name]);

    if (as === 'textarea') {
      this.fields.push(
        new Tag(
          'textarea',
          { cols: 20, rows: 40, name, ...attributes },
          value,
        ).toString(),
      );
      return;
    }

    this.fields.push(
      new Tag('input', {
        name,
        type: 'text',
        value,
        ...attributes,
      }).toString(),
    );
  }

  toString(): string {
    return this.fields.join('');
  }
}

export default FormBuilder;
