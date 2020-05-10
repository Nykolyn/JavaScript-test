import getRandomRBGColor from "../helpers/getRandomRGBColor";

const input = document.querySelector(".js-input");
const boxWrapper = document.getElementById("boxes");

const boxTemplate = ({ size = 30 }) =>
  `<div style="display:block;width:${size}px;height:${size}px;background-color:${getRandomRBGColor()}"/>`;

export const handleBoxDraw = ({ amount = 0 }) => {
  let size = 30;

  if (!amount || Number(amount) < 1) throw new Error("Invalid input value");

  boxWrapper.innerHTML = "";

  for (let i = 0; i < amount; i++) {
    boxWrapper.innerHTML += boxTemplate({ size });
    size += 10;
  }

  input.value = "";
};

export const handleBoxDestroy = () => {
  boxWrapper.innerHTML = "";
};
