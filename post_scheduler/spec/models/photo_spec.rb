require 'rails_helper'

RSpec.describe Photo, type: :model do
  describe 'validations' do
    it { should belong_to(:post) }
  end
end
