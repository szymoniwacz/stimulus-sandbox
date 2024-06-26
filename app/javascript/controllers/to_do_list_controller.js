import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["items", "input"]

  connect() {
    console.log("ToDoList controller connected")
  }

  addNewItem() {
    const itemContent = this.inputTarget.value;
    if (itemContent.trim() !== "") {
      const newItem = document.createElement("li");
      newItem.textContent = itemContent;
      this.itemsTarget.appendChild(newItem);
      this.inputTarget.value = ""; // clear the input after adding
    }
  }
}
