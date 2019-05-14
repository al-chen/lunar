import React from 'react';
import { stripHexcode } from 'emojibase';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import Lunar from '@airbnb/lunar';
import lightTheme from '@airbnb/lunar/lib/themes/light';
import darkTheme from '@airbnb/lunar/lib/themes/dark';
import { withProps } from './addons/props';
import createTheme from './helpers/createTheme';

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

const theme = localStorage.getItem('storybook.theme') || 'light';
const rtl = localStorage.getItem('storybook.rtl') === 'true';

Lunar.initialize({
  name: 'Lunar',
  emojiCDN: (hexcode, large) =>
    `https://cdn.jsdelivr.net/emojione/assets/4.5/png/${large ? 64 : 32}/${stripHexcode(
      hexcode,
    ).toLowerCase()}.png`,
  logger: console.log,
  rtl,
  theme,
});

addDecorator(withA11y);
addDecorator(withProps);
addDecorator(story => (
  <div style={{ padding: 20, fontSize: 15, fontFamily: Lunar.settings.fontFamily }}>{story()}</div>
));

addParameters({
  options: {
    name: 'Lunar',
    theme: createTheme(theme, themes[theme](), Lunar.settings.fontFamily),
  },
  backgrounds: [{ name: 'White', value: '#fff' }, { name: 'Black', value: '#000' }],
});

configure(() => {
  const glob = require.context('../packages', true, /\.story\.tsx?$/);

  glob.keys().forEach(filename => glob(filename));
}, module);
