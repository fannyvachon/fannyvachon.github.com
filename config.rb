###
# Compass
###

# Susy grids in Compass
# First: gem install compass-susy-plugin
# require 'susy'

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Haml
###

# CodeRay syntax highlighting in Haml
# First: gem install haml-coderay
# require 'haml-coderay'

# CoffeeScript filters in Haml
# First: gem install coffee-filter
# require 'coffee-filter'

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

###
# Page command
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  def who(n)
    all =  {
      "Louis Bélanger" => "nm0126802",
      "Jean-Phillipe Pearson" => "nm1203798",
      "Julie Casault"   => "nm0143078",
      "Annick Chartier" => "nm0153562",
      "Colleen Quinton" => "nm0704272",
      "Nicole Lapierre" => "nm0487546",
    }
    link_to n, "http://www.imdb.com/name/#{all.fetch(n)}/"
  end

  def data
    @data ||= YAML.load_file('config.yaml')
    @data
  end

  def images
    @images ||= data[:gallery]
  end

  def movie(m)
    m = m[:movie] if m.is_a?(Hash)
    return '' unless m
    @movies ||= data[:movies]
    link_to m, "www.imdb.com/title/#{@movies.fetch(m)}/"
  end
end

# Change the CSS directory
# set :css_dir, "alternative_css_directory"

# Change the JS directory
# set :js_dir, "alternative_js_directory"

# Change the images directory
# set :images_dir, "alternative_image_directory"

# Build-specific configuration
configure :build do
  set :build_dir, "."
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript
  activate :asset_hash, exts: %w[.js .css]
  # Enable cache buster
  activate :cache_buster

  # Use relative URLs
  # activate :relative_assets

  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher

  # Or use a different image path
  # set :http_path, "/Content/images/"
end
