class PagesController < ApplicationController
  def home
  end

  def projects
    redirect_to("http://blog.victorpontis.com/projects")
  end
end
