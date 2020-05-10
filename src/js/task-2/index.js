import { handleBoxDraw, handleBoxDestroy } from "./vue";

const input = document.querySelector(".js-input");
const createBtn = document.querySelector("button[data-action=create]");
const destroyBtn = document.querySelector("button[data-action=destroy]");

const createBoxes = () => {
  const amount = input.value || 1;

  handleBoxDraw({ amount });
};

const destroyBoxes = () => {
  handleBoxDestroy();
};

createBtn.addEventListener("click", createBoxes);
destroyBtn.addEventListener("click", destroyBoxes);
