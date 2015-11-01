require "slim"

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

# Proxy pages
data.portfolio.each do | key, project |
  proxy "/demos/#{key}.html", "/templates/demo-redirect.html",
    locals: {
      redirect_url: project.demo || project.href,
      has_demo:     project.demo.nil?,
      project:      project,
      project_key:  key
    }
end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
require "redcarpet/compat"
helpers do
  def markdownify(src)
    Markdown.new(src).to_html
  end
  def portfolio_gallery(portfolio_key)
    keys = Dir.glob("./source/images/portfolio/#{portfolio_key}/*.jpg")
    keys.map { |key|
      idx = key[/\d+(?=\.\s?)/].to_i
      {
        idx: idx,
        src: key[/images\/.+/],
        alt: key[/[A-Z].+(?=.jpg)/] || "Image " << idx.to_s
      }
    }.sort_by { |key| key[:idx]  }
  end
end

set :css_dir, 'stylesheets'
activate :autoprefixer

set :js_dir, 'javascripts'

set :images_dir, 'images'

activate :directory_indexes

# Ignore templates
ignore "/templates/*"

# Add bower activation
activate :bower

# Import jQuery
sprockets.import_asset 'jquery'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

# middleman-deploy configuration
activate :deploy do |deploy|
  # Automatically run `middleman build` during `middleman deploy`
  deploy.build_before = true
  # rsync, ftp, sftp, or git
  deploy.method = :rsync
  deploy.host   = '128.199.85.236'
  deploy.path   = '/home/alexcu/alexcu.me/public_html/'
  deploy.user   = 'alexcu'
end