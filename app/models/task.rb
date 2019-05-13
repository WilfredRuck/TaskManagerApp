class Task < ApplicationRecord
  validates :name, presence: true;
  validates :completed, inclusion: { in: [ true, false ] }

  belongs_to :project

  after_initialize :set_boolean

  def set_boolean
    self.completed || self.completed = false
  end

end
