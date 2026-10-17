import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import HexletCode from '../src/index.js';

const template = { name: 'rob', job: 'hexlet', gender: 'm' };
const readFixture = (name: string): string =>
  readFileSync(new URL(`./__fixtures__/${name}`, import.meta.url), 'utf-8').trim();

describe('HexletCode.formFor', () => {
  it('generates an empty form with default attributes', () => {
    const form = HexletCode.formFor(template, {}, () => {});

    expect(form).toBe('<form method="post" action="#"></form>');
  });

  it('uses the specified URL as the form action', () => {
    const form = HexletCode.formFor(template, { url: '/users' }, () => {});

    expect(form).toBe('<form method="post" action="/users"></form>');
  });

  it('generates input and textarea fields from the template', () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
    });

    expect(form).toBe(readFixture('form-with-fields.html'));
  });

  it('adds custom attributes to fields', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input('name', { class: 'user-input' });
      f.input('job');
    });

    expect(form).toBe(readFixture('form-with-custom-attributes.html'));
  });

  it('overrides default textarea attributes', () => {
    const form = HexletCode.formFor(template, { url: '#' }, (f) => {
      f.input('job', { as: 'textarea', rows: 50, cols: 50 });
    });

    expect(form).toBe(readFixture('form-with-overridden-textarea.html'));
  });

  it('adds a submit button with the default text', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
      f.submit();
    });

    expect(form).toBe(readFixture('form-with-submit.html'));
  });

  it('sets custom submit button text', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.submit('Wow');
    });

    expect(form).toBe(
      '<form method="post" action="#"><input type="submit" value="Wow"></form>',
    );
  });

  it('throws when the field does not exist in the template', () => {
    expect(() =>
      HexletCode.formFor(template, { url: '/users' }, (f) => {
        f.input('age');
      }),
    ).toThrow("Field 'age' does not exist in the template.");
  });
});
