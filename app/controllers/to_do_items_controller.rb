class ToDoItemsController < ApplicationController
  def create
    @todo_item = ToDoItem.new(todo_item_params)
    if @todo_item.save
      respond_to do |format|
        format.json { render json: @todo_item, status: :created }
      end
    else
      respond_to do |format|
        format.json { render json: @todo_item.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def todo_item_params
    params.require(:to_do_item).permit(:content)
  end
end
