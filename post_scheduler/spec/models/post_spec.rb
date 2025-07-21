require 'rails_helper'

RSpec.describe Post, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:post_text) }
    it { should validate_presence_of(:scheduled_date) }
  end

  describe 'instance methods' do
    
  end

  describe 'class methods' do
    
  end
end
