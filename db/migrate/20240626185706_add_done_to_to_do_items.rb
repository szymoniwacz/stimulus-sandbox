class AddDoneToToDoItems < ActiveRecord::Migration[7.1]
  def change
    add_column :to_do_items, :checked, :boolean
  end
end
