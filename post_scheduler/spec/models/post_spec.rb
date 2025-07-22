require 'rails_helper'

RSpec.describe Post, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:post_text) }
    it { should validate_presence_of(:scheduled_date) }
  end

  describe 'scope' do
    describe '.all_with_photos' do
      it 'includes photos' do
        post = create(:post)
        photo = create(:photo, post: post)

        result = Post.all_with_photos
        expect(result).to include(post)
        expect(result.first.photos).to include(photo)
      end
    end
  end
end
