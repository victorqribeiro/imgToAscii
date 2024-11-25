import ImgToAscii from './src/ImgToAscii.js';

(async () => {
  const ascii = new ImgToAscii('./img/elefante.png', 0.5, 1);
  console.log(await ascii.display());
})();
