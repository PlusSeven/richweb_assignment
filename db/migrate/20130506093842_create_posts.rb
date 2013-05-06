class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :text
      t.string :status
      t.integer :user_id
      t.integer :topic_id
      t.integer :vote
      t.integer :last_user_id

      t.timestamps
    end
  end
end
