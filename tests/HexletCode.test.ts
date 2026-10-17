import { describe, expect, it } from 'vitest';

import HexletCode from '../src/index.js';

const template = { name: 'rob', job: 'hexlet', gender: 'm' };

describe('HexletCode.formFor', () => {
  it('generates an empty form with default attributes', () => {
    const form = HexletCode.formFor(template, {}, () => {});

    expect(form).toBe('<form action="#" method="post"></form>');
  });

  it('uses the specified URL as the form action', () => {
    const form = HexletCode.formFor(template, { url: '/users' }, () => {});

    expect(form).toBe('<form action="/users" method="post"></form>');
  });
});
