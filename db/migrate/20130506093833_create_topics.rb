class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :subject
      t.text :description
      t.string :status
      t.integer :user_id
      t.integer :forum_id
      t.integer :vote

      t.timestamps
    end
  end
end
