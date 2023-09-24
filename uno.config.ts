// uno.config.ts
import { defineConfig } from 'unocss';
import { presetIcons, presetUno, presetWebFonts } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetWebFonts({
      fonts: {
        sans: {
          name: 'Inter',
          weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          italic: true,
          provider: 'google',
        },
      },
    }),
  ],
  shortcuts: [
    {
      col: 'flex flex-col',
      row: 'flex flex-row',

      'col-center': 'col justify-center items-center',
      'row-center': 'row justify-center items-center',
    },
  ],
});
