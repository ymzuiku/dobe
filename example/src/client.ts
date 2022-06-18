import { get_hello, post_hello } from "./api";

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
  state.age = e.currentTarget.value;
};
const button = document.createElement("button");
button.textContent = "fetch";
button.onclick = () => {
  console.log("__debug__", state);
  get_hello(state).then((res) => {
    console.log("get", res);
  });
  post_hello(state).then((res) => {
    console.log("post", res);
  });
};

box.append(inputName, inputAge, button);
document.body.append(box);
