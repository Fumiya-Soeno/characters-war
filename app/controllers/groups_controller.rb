class GroupsController < ApplicationController

  def index
    # for num in 1..768 do
    #   @fields = Field.new
    #   @fields.id = num
    #   @fields.char_id = nil
    #   @fields.team_id = nil
    #   @fields.save
    # end

    # @elementFire = Element.new
    # @elementFire.id = 1
    # @elementFire.name = "火"
    # @elementFire.save

    # @elementWater = Element.new
    # @elementWater.id = 2
    # @elementWater.name = "水"
    # @elementWater.save

    # @elementWood = Element.new
    # @elementWood.id = 3
    # @elementWood.name = "木"
    # @elementWood.save

    # @elementLightness = Element.new
    # @elementLightness.id = 4
    # @elementLightness.name = "光"
    # @elementLightness.save

    # @elementDarkness = Element.new
    # @elementDarkness.id = 5
    # @elementDarkness.name = "闇"
    # @elementDarkness.save

    # @move1 = Movement.new
    # @move1.id = 1
    # @move1.name = "直線往復"
    # @move1.save

    # @move2 = Movement.new
    # @move2.id = 2
    # @move2.name = "追尾"
    # @move2.save

    # @move3 = Movement.new
    # @move3.id = 3
    # @move3.name = "散策"
    # @move3.save
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを更新しました'
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end

end