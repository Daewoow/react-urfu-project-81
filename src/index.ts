import Tag from './Tag.js';
import FormBuilder, {
  type Entity,
  type InputOptions,
} from './FormBuilder.js';

export type { Entity, InputOptions };

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

  return new Tag('form', {
    action: options.url ?? '#',
    method: options.method ?? 'post',
  }, builder.toString()).toString();
};

const HexletCode = { formFor };

export default HexletCode;
