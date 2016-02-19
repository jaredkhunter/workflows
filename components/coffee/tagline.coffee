$ = require 'jquery'

do fill = (item = 'The most creative minds in Art Planet') ->
  $('.tagline').append "#{item}"
fill