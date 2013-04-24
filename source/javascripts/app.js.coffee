#= require jquery.cycle.lite
#= require jquery.vivified
#= require jquery.touchwipe
# From:http://www.netcu.de/jquery-touchwipe-iphone-ipad-library

class Gallery extends $.Vivified
  @vivify()

  initialize: ->
    @gallery = @find('.gallery').cycle
      fx: 'scrollLeft'
    @click => @gallery.cycle('toggle')
    @gallery.touchwipe
      wipeLeft: => @gallery.cycle('next')
      wipeRight: => @gallery.cycle('prev', 'scrollRight')
      preventDefaultEvents: true

    # @nav = @find('.nav').on 'click', (evt) => @goto($(evt.target))
    # @indices = $(link).data('index')
    $(document).on 'keydown', (e) =>
      switch e.keyCode
        when left_arrow then @gallery.cycle('prev', 'scrollRight')
        when right_arrow then @gallery.cycle('next')
        when spacebar then @gallery.cycle('toggle')
  # goto: ($link) ->
  #   @gallery.goto($link.data('index'))

  # refresh: ->
  #   @gallery.current

$ ->
  new Gallery('.portfolio')

left_arrow = 37
right_arrow = 39
spacebar = 32
