require 'test_helper'

class TopicsControllerTest < ActionController::TestCase
  setup do
    @topic = topics(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:topics)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create topic" do
    assert_difference('Topic.count') do
      post :create, topic: { description: @topic.description, forum_id: @topic.forum_id, status: @topic.status, subject: @topic.subject, user_id: @topic.user_id, vote: @topic.vote }
    end

    assert_redirected_to topic_path(assigns(:topic))
  end

  test "should show topic" do
    get :show, id: @topic
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @topic
    assert_response :success
  end

  test "should update topic" do
    put :update, id: @topic, topic: { description: @topic.description, forum_id: @topic.forum_id, status: @topic.status, subject: @topic.subject, user_id: @topic.user_id, vote: @topic.vote }
    assert_redirected_to topic_path(assigns(:topic))
  end

  test "should destroy topic" do
    assert_difference('Topic.count', -1) do
      delete :destroy, id: @topic
    end

    assert_redirected_to topics_path
  end
end