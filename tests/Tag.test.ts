import { describe, expect, it } from 'vitest';

import Tag from '../src/Tag.js';

describe('Tag', () => {
  it.each([
    ['br', {}, '<br>'],
    ['img', { src: 'path/to/image' }, '<img src="path/to/image">'],
    [
      'input',
      { type: 'submit', value: 'Save' },
      '<input type="submit" value="Save">',
    ],
  ])('renders the void <%s> tag', (name, attributes, expected) => {
    expect(new Tag(name, attributes).toString()).toBe(expected);
  });

  it.each([
    ['label', {}, 'Email', '<label>Email</label>'],
    [
      'label',
      { for: 'email' },
      'Email',
      '<label for="email">Email</label>',
    ],
    ['div', {}, '', '<div></div>'],
  ])('renders the paired <%s> tag', (name, attributes, body, expected) => {
    expect(new Tag(name, attributes, body).toString()).toBe(expected);
  });
});
