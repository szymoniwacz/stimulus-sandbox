class CreateToDoItems < ActiveRecord::Migration[7.1]
  def change
    create_table :to_do_items do |t|
      t.string :title

      t.timestamps
    end
  end
end
