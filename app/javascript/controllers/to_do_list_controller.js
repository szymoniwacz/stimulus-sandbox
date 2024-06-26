import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["items", "input"]

  addNewItem() {
    const title = this.inputTarget.value.trim();
    if (title !== "") {
      fetch("/to_do_items", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": this.getCSRFToken()
        },
        body: JSON.stringify({ to_do_item: { title: title } })
      })
      .then(response => response.json())
      .then(data => {
        this.appendItem(data);
        this.inputTarget.value = ""; // clear the input after adding
      })
      .catch(error => console.log(error));
    }
  }

  appendItem(data) {
    const newItem = document.createElement("li");
    newItem.textContent = data.title;  // Change here to use 'title'
    this.itemsTarget.appendChild(newItem);
  }

  getCSRFToken() {
    return document.querySelector("[name='csrf-token']").getAttribute("content");
  }
}
