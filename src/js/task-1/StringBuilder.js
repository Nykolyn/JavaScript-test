export default class StringBuilder {
  constructor(value = "") {
    this.baseString = value;
  }

  append(str) {
    if (!str) throw new Error("No value was passed");

    this.baseString = [...this.baseString, ...str].join("");
    return this;
  }

  prepend(str) {
    if (!str) throw new Error("No value was passed");

    this.baseString = [...str, ...this.baseString].join("");
    return this;
  }

  pad(str) {
    if (!str) throw new Error("No value was passed");

    this.baseString = [...str, ...this.baseString, ...str].join("");
    return this;
  }
}
