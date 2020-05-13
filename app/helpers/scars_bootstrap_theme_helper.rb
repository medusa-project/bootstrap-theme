module ScarsBootstrapThemeHelper

  ##
  # @return [String]
  #
  def uofi_favicon_tags
    html =
        "<link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"#{image_url('favicon-16x16.png')}\">
        <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"#{image_url('favicon-32x32.png')}\">
        <link rel=\"icon\" type=\"image/png\" sizes=\"96x96\" href=\"#{image_url('favicon-96x96.png')}\">
        <link rel=\"icon\" type=\"image/png\" sizes=\"192x192\" href=\"#{image_url('favicon-192x192.png')}\">
        <link rel=\"apple-touch-icon\" sizes=\"120x120\" href=\"#{image_url('apple-icon-120x120.png')}\">
        <link rel=\"apple-touch-icon\" sizes=\"152x152\" href=\"#{image_url('apple-icon-152x152.png')}\">
        <link rel=\"apple-touch-icon\" sizes=\"167x167\" href=\"#{image_url('apple-icon-167x167.png')}\">
        <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"#{image_url('apple-icon-180x180.png')}\">
        <meta name=\"msapplication-TileColor\" content=\"#13294b\"/>
        <meta name=\"msapplication-TileImage\" content=\"#{image_url('ms-icon-310x310.png')}\">
        <meta name=\"msapplication-config\" content=\"none\"/>
        <meta name=\"theme-color\" content=\"#ffffff\"/>"
    raw(html)
  end

end
