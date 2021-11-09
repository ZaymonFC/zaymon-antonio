let zzfx = (..._: any) => {};

if (process.browser) {
  zzfx = require("zzfx").zzfx;
}

export const sfxAtlas = {
  boot: [1.47, , 57, 0.01, 0.14, 0.27, , 1.94, , -3.5, 19, 0.06, 0.13, , , , 0.07, 0.99, 0.09, 0.1],
};

export const playSfx = (args: any) => {
  zzfx(...args);
};
