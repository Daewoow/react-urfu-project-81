import { type TagAttributes } from './Tag.js';

export type Entity = Record<string, unknown>;

export type InputOptions = {
  as?: string;
  label?: string;
  labelHtml?: TagAttributes;
  [name: string]: string | number | boolean | TagAttributes | undefined;
};

export type FormElement = {
  name: string;
  attributes: TagAttributes;
  body?: string;
};

const capitalize = (value: string): string =>
  `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

const toTagAttributes = (options: InputOptions): TagAttributes =>
  Object.fromEntries(
    Object.entries(options).filter(([, value]) => value !== undefined),
  ) as TagAttributes;

class FormBuilder {
  private readonly elements: FormElement[] = [];

  constructor(private readonly entity: Entity) {}

  input(name: string, options: InputOptions = {}): void {
    if (!Object.hasOwn(this.entity, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as, label, labelHtml, ...customAttributes } = options;

    this.elements.push({
      name: 'label',
      attributes: { for: name, ...(labelHtml ?? {}) },
      body: label ?? capitalize(name),
    });

    const attributes = toTagAttributes(customAttributes);
    const value = String(this.entity[name]);

    if (as === 'textarea') {
      this.elements.push({
        name: 'textarea',
        attributes: { cols: 20, rows: 40, name, ...attributes },
        body: value,
      });
      return;
    }

    this.elements.push({
      name: 'input',
      attributes: { name, type: 'text', value, ...attributes },
    });
  }

  submit(value = 'Save'): void {
    this.elements.push({
      name: 'input',
      attributes: { type: 'submit', value },
    });
  }

  getElements(): readonly FormElement[] {
    return this.elements;
  }
}

export default FormBuilder;
