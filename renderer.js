const $ = require('jquery');

function searchToObject() {
  var pairs = window.location.search.substring(1).split("&"),
    obj = {},
    pair,
    i;

  for ( i in pairs ) {
    if ( pairs[i] === "" ) continue;

    pair = pairs[i].split("=");
    obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
  }

  return obj;
}

let obj = searchToObject();
$.ajaxSetup({
  headers : {
    'Authorization' : `token ${obj.access_token}`
  }
});

$.getJSON('https://api.github.com/user/repos', function (data) {
  data.forEach(function(e, i, a) {
    if (i == 0) console.log(e);
    const box = `
    <div class="ui raised very padded text container segment">
      <h2 class="ui header"><a href="#">${e.full_name}</a></h2>
      <a href="${e.html_url}/archive/${e.default_branch}.zip"><button class="download ui button">Download</button></a>
    </div>`;
    $('#repos').append(box);
  });
});

$('#search').keydown(function() {
  console.log($(this).val());
});
