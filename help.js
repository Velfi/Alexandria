console.log("help.js loaded");

function help_toggler(x) {
  var info_div = ("#" + $(x).attr('id') + "_info");
  $('.command_info').attr('style','visibility:hidden');
  $('.commands ul li').removeClass('active')
  $(x).addClass('active');
  $(info_div).attr('style','visibility:visible');
}
