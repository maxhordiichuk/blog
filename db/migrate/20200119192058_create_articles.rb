class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      t.references :story, null: false, foreign_key: true
      t.text :name, index: true
      t.text :text, index: true
      t.tsvector :tsv, index: { using: :gin }
      t.integer :kind, index: true

      t.timestamps index: true
    end

    reversible do |dir|
      dir.up do
        execute <<~SQL
          CREATE TRIGGER tsv_tsvector_update BEFORE INSERT OR UPDATE
          ON articles FOR EACH ROW EXECUTE PROCEDURE
          tsvector_update_trigger(tsv, 'pg_catalog.english', name, text);
        SQL
        now = Time.current.to_s(:db)
        update("UPDATE articles SET updated_at = '#{now}'")
      end

      dir.down do
        execute <<~SQL
          DROP TRIGGER tsv_tsvector_update
          ON articles
        SQL
      end
    end
  end
end
