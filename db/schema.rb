# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_01_19_192058) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_trgm"
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.bigint "story_id", null: false
    t.text "name"
    t.text "text"
    t.tsvector "tsv"
    t.integer "kind"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["created_at"], name: "index_articles_on_created_at"
    t.index ["kind"], name: "index_articles_on_kind"
    t.index ["name"], name: "index_articles_on_name"
    t.index ["story_id"], name: "index_articles_on_story_id"
    t.index ["text"], name: "index_articles_on_text"
    t.index ["tsv"], name: "index_articles_on_tsv", using: :gin
    t.index ["updated_at"], name: "index_articles_on_updated_at"
  end

  create_table "stories", force: :cascade do |t|
    t.string "name"
    t.integer "articles_count"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["articles_count"], name: "index_stories_on_articles_count"
    t.index ["created_at"], name: "index_stories_on_created_at"
    t.index ["name"], name: "index_stories_on_name"
    t.index ["updated_at"], name: "index_stories_on_updated_at"
  end

  add_foreign_key "articles", "stories"
end
