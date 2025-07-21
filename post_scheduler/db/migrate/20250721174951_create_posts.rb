class CreatePosts < ActiveRecord::Migration[8.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :post_text
      t.datetime :scheduled_date

      t.timestamps
    end
  end
end
