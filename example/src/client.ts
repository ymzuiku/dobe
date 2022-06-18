import { api_hello } from "./api";

const state = {
  name: "",
  age: 0,
};

const box = document.createElement("div");
box.style.display = "flex";
box.style.flexDirection = "flex-col";

const inputName = document.createElement("input");
inputName.oninput = (e: { currentTarget: any }) => {
  state.name = e.currentTarget.value;
};
const inputAge = document.createElement("input");

inputAge.oninput = (e: { currentTarget: any }) => {
  let age = Number(e.currentTarget.value);
  if (isNaN(age)) {
    age = e.currentTarget.value;
  }
  state.age = age;
};
const button = document.createElement("button");
button.textContent = "fetch";
button.onclick = () => {
  api_hello(state).then((res) => {
    console.log("res", res);
  });
};

box.append(inputName, inputAge, button);
document.body.append(box);
