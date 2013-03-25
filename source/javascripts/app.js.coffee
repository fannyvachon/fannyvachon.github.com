class Gallery extends $.Vivified
  @vivify()

  initialize: ->
    @gallery = @find('.gallery').cycle
      fx: 'scrollLeft'
    @click => @gallery.cycle('toggle')
    # @nav = @find('.nav').on 'click', (evt) => @goto($(evt.target))
    # @indices = $(link).data('index')

  # goto: ($link) ->
  #   @gallery.goto($link.data('index'))

  # refresh: ->
  #   @gallery.current

$ ->
  new Gallery('.portfolio')
