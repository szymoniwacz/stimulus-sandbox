class ToDoItem < ApplicationRecord
  validates :title, presence: true
end
