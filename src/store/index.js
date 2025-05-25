import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#EFBD47",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fulDecal: "./threejs.png",
});

export default state;
