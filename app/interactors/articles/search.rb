module Articles
  class Search
    include Interactor

    def call
      query = context.query

    end
  end
end
