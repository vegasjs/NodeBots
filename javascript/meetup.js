$(function() {

  /*
    This is a URL signed with an API key. Changing any parameters will cause it
    to break. More info: http://www.meetup.com/meetup_api/auth/#keysign
  */
  var signedUrl = "https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=NodeBots-Vegas&page=200&fields=&order=time&status=upcoming&desc=false&sig_id=7287936&sig=79371534ffaa9208f0cacbadbd0d67a30b7a884b";

  var meetupTemplate = document.getElementById("next-meetup-template").innerHTML;

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /*
    This is not mustache, but we should look into using a better templating system
    if there is need to do more of this or if we need advance features.
  */
  function notMustache( template, data ) {
    var templateCopy = template + "";
    $.each(data, function(name,value) {
      templateCopy = templateCopy.split("{{ " + name + " }}").join(value);
    });
    return templateCopy;
  }
  $.getJSON(signedUrl + "&callback=?", function(data) {
    if (data && data.results) {
        var meetup = null;
        for (var i=0;i<data.results.length;i++) {
          if ( data.results[i].name.match(/NodeBots/i) ) {
            meetup = data.results[i];
            break;
          }
        }
        if ( meetup ) {
          var date = new Date(meetup.time);
          var data = {
            month: months[ date.getMonth() ],
            day: date.getDate(),
            url: meetup.event_url,
            count: meetup.yes_rsvp_count,
            member: meetup.yes_rsvp_count == 1 ? 'NodeBotter' : 'NodeBotters',
            name: meetup.name
          };
          $('#next-meetup').html( notMustache( meetupTemplate, data ) ).slideDown();
        }
    }
  });


});
