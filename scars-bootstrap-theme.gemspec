require "json"
$package = JSON.parse(File.read(File.expand_path("package.json", __dir__)))

Gem::Specification.new do |s|
  s.name        = "scars-bootstrap-theme"
  s.version     = $package["version"].tr("+", ".")
  s.author      = $package["author"]
  s.homepage    = $package["homepage"]
  s.summary     = $package["description"]
  s.license     = $package["license"]

  s.files = Dir[
    "{src}/*",
    "README.md",
    "package.json"]
  s.require_paths = ["lib/assets", "src"]
end
