class HomeController < ApplicationController
  def index
    @todo_items = ToDoItem.all
  end
end
