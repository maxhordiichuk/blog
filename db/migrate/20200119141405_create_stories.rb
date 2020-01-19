class CreateStories < ActiveRecord::Migration[6.0]
  def change
    create_table :stories do |t|
      t.string :name, index: true
      t.integer :articles_count, index: true

      t.timestamps index: true
    end
  end
end
