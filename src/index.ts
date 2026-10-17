import Tag from './Tag.js';

export type Entity = Record<string, unknown>;

export type FormOptions = {
  url?: string;
};

class FormBuilder {
  constructor(readonly entity: Entity) {}
}

export const formFor = (
  entity: Entity,
  options: FormOptions = {},
  callback: (builder: FormBuilder) => void = () => {},
): string => {
  const builder = new FormBuilder(entity);
  callback(builder);

  return new Tag('form', {
    action: options.url ?? '#',
    method: 'post',
  }).toString();
};

const HexletCode = { formFor };

export default HexletCode;
