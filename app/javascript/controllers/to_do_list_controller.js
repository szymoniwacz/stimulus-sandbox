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
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = data.checked;
    checkbox.id = `checked_${data.id}`;
    checkbox.setAttribute("data-action", "change->to-do-list#toggleChecked");
    checkbox.setAttribute("data-id", data.id);

    const label = document.createElement("label");
    label.setAttribute("for", checkbox.id);
    label.textContent = data.title;
    label.classList.add("item-label");

    // Add the checkbox to the list item
    li.appendChild(checkbox);
    li.appendChild(label);

    // Add classes for checked items
    if (data.checked) {
      label.classList.add('checked-item');
    }

    // Append the list item to the list
    this.itemsTarget.appendChild(li);
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
