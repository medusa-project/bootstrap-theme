module ScarsBootstrapTheme
  module Rails
    class Engine < ::Rails::Engine
      initializer "scars-bootstrap-theme.assets.precompile" do |app|
        puts Dir[__dir__ + '/../../../app/assets/images/*']
        app.config.assets.precompile += Dir[__dir__ + '/../../../app/assets/images/*']
      end
    end
  end
end
