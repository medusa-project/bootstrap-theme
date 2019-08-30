# SCARS Bootstrap Theme

This theme was forked from [Bootswatch](https://bootswatch.com) (Copyright
2014-2018 Thomas Park) with major modifications. Essentially it is a base
Bootstrap stylesheet overlaid with custom styles, along with a Gruntfile that
concatenates and minifies the overlaid styles into a single custom Bootstrap
stylesheet that can be swapped with the stock Bootstrap one.

## Usage

There are a few different ways to integrate this theme into your project.

### Via Pre-compiled Asset

Run `grunt`. Then, replace the default Bootstrap stylesheet with
`docs/theme/bootstrap.min.css` (which grunt generates from the source code in
`src`). You must still include Bootstrap's JavaScript file to have functional
dropdowns, modals, etc.

### Via Ruby Gem

Add the following to your Gemfile and run `bundle install`:

```ruby
gem 'scars-bootstrap-theme', github: 'medusa-project/scars-bootstrap-theme'
```

Ruby on Rails users can add the following to an initializer (e.g.
`config/initializers/scars-bootstrap-theme.rb`):

```ruby
Rails.application.config.assets.paths += Gem.loaded_specs['scars-bootstrap-theme'].load_paths
```

And then be able to import themes via Sass like so:

```scss
@import "scars-bootstrap-theme/variables";
@import "~bootstrap/scss/bootstrap";
@import "scars-bootstrap-theme/theme";
```

### Via Sass Imports

If you're using [Sass](https://sass-lang.com/) (SCSS) in your project, you can
import the `_variables.scss` and `_theme.scss` files for a given theme.
This method allows you to override theme variables.

```scss
// Your variable overrides go here, e.g.:
// $h1-font-size: 3rem;

@import "~scars-bootstrap-theme/scars-bootstrap-theme/variables";
@import "~bootstrap/scss/bootstrap";
@import "~scars-bootstrap-theme/scars-bootstrap-theme/src/theme";
```

## Development

Run `grunt`. This will start a development web server and open the sample page
in your default web browser. The server will watch for any changes to the SASS
files, and automatically build a theme and reload it on change.

Or, run `grunt server` for just the server, and `grunt watch` for just the
watcher.

The theme consists of two SASS files:

* `_variables.scss`, which is included by default in Bootstrap, allows you to
  customize the settings.
* `_theme.scss` contains more extensive structural changes.

1. Install Node.js and Grunt. You can install `grunt-cli` as described on the
   [Grunt Getting Started](https://gruntjs.com/getting-started) page.
2. Clone it
3. Install dependencies: `npm install`
4. In `/src/scars-bootstrap-theme`, modify `_variables.scss` and `_theme.scss`.
5. Type `grunt swatch` to build the theme CSS.


