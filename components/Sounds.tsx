let zzfx = (..._: any) => {};

if (process.browser) {
  zzfx = require("zzfx").zzfx;
}

export const sfxAtlas = {
  boot: [1.47, , 57, 0.01, 0.14, 0.27, , 1.94, , -3.5, 19, 0.06, 0.13, , , , 0.07, 0.99, 0.09, 0.1],
  powerup: [1.1, 0.01, 657, 0.01, 0.07, 0.4, 1, 0.6, , , 150, , 0.08, , , , , 0.56, 0.01, 0.3],
};

export const playSfx = (args: any) => {
  zzfx(...args);
};
