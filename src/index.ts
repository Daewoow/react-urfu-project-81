import Tag from './Tag.js';
import FormBuilder, { type Entity } from './FormBuilder.js';

export type { Entity, InputOptions } from './FormBuilder.js';

export type FormOptions = {
  method?: string;
  url?: string;
};

export const formFor = (
  entity: Entity,
  options: FormOptions = {},
  callback: (builder: FormBuilder) => void = () => {},
): string => {
  const builder = new FormBuilder(entity);
  callback(builder);

  const body = builder
    .getElements()
    .map((element) =>
      new Tag(element.name, element.attributes, element.body).toString(),
    )
    .join('');

  return new Tag(
    'form',
    {
      method: options.method ?? 'post',
      action: options.url ?? '#',
    },
    body,
  ).toString();
};

const HexletCode = { formFor };

export default HexletCode;
