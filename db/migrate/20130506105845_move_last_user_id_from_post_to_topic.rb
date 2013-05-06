class MoveLastUserIdFromPostToTopic < ActiveRecord::Migration
  def change
    add_column :topics, :last_user_id, :integer
  end

  def up
  	remove_column :posts, :last_user_id
  end

  def down
  end
end
