###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
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

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Methods defined in the helpers block are available in templates
helpers do
  def who(n)
    all =  {
      "Louis Bélanger" => "nm0126802",
      "Jean-Phillipe Pearson" => "nm1203798",
      "Julie Casault"   => "nm0143078",
      "Annick Chartier" => ["nm0153562", 'Montréal'],
      "Colleen Quinton" => ["nm0704272", 'Montréal'],
      "Nicole Lapierre" => "nm0487546",
      "Nathalie Tissier" => ["nm0864398", "France"],
      "Eva Coudouloux" => ["nm0183286", 'Toronto'],
      "Monica Huppert" => ["nm0403284", 'Vancouver'],
    }
    id, where = all.fetch(n)
    r = link_to(n, "http://www.imdb.com/name/#{id}/")
    r << ' ' << content_tag(:span, "(#{where})", class: 'where') if where
    r
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

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
