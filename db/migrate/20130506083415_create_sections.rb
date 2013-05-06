class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.string :name
      t.text :description
      t.text :code
      t.string :course_name

      t.timestamps
    end
  end
end
