module ScarsBootstrapTheme
  module Rails
    class Engine < ::Rails::Engine
      initializer "scars-bootstrap-theme.assets.precompile" do |app|
        app.config.assets.precompile += Dir[__dir__ + '/../../../app/assets/images/*']
      end
    end
  end
end
