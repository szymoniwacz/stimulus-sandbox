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

  toggleChecked(event) {
    const itemId = event.target.dataset.id;
    const checked = event.target.checked;
    fetch(`/to_do_items/${itemId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": this.getCSRFToken(),
        "Accept": "application/json"
      },
      body: JSON.stringify({ to_do_item: { checked: checked } })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        this.toggleLabelStyle(event.target);
      }
    })
    .catch(error => console.log('Error updating item:', error));
  }

  toggleLabelStyle(checkbox) {
    const label = this.element.querySelector(`label[for='${checkbox.id}']`);
    if (checkbox.checked) {
      label.classList.add('checked-item');
    } else {
      label.classList.remove('checked-item');
    }
  }
  getCSRFToken() {
    return document.querySelector("[name='csrf-token']").getAttribute("content");
  }
}
