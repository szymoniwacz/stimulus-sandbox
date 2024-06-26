import { Controller } from "@hotwired/stimulus"
import { csrfToken } from "@rails/ujs"

export default class extends Controller {
  static targets = ["items", "input"]

  addNewItem() {
    const content = this.inputTarget.value.trim();
    if (content !== "") {
      fetch("/to_do_items", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken()
        },
        body: JSON.stringify({ to_do_item: { content: content } })
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
    newItem.textContent = data.content;
    this.itemsTarget.appendChild(newItem);
  }
}
