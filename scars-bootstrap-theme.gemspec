require "json"
$package = JSON.parse(File.read(File.expand_path("package.json", __dir__)))

Gem::Specification.new do |spec|
  spec.name     = "scars-bootstrap-theme"
  spec.version  = $package["version"].tr("+", ".")
  spec.author   = $package["author"]
  spec.homepage = $package["homepage"]
  spec.summary  = $package["description"]
  spec.license  = $package["license"]

  spec.add_development_dependency "sassc"
  spec.add_runtime_dependency "rails"

  spec.require_paths = ["lib"]
end
