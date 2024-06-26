class ToDoItemsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: ToDoItem.all
  end

  def create
    @todo_item = ToDoItem.new(todo_item_params)
    if @todo_item.save
      render json: @todo_item, status: :created
    else
      render json: @todo_item.errors, status: :unprocessable_entity
    end
  end

  private

  def todo_item_params
    params.require(:to_do_item).permit(:title)
  end
end
