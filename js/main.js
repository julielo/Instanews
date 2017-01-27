$(function() {

  var $apiList = $('.apiList');
  $apiList.empty();

  $('select').change('click', function () {
      // console.log(this.value);

      var url = 'https://api.nytimes.com/svc/topstories/v2/';
      url += this.value;
      url += '.json';
      url += '?' + $.param({'api-key': 'd4c685c39c7d41bba145a35a29acd516'});

      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(data) {
        var resultData = ''

        $.each(data.results, function(key, value) {
        // console.log(value.title);
         resultData += '<li>';
         resultData += value.title;
         resultData += '</li>';

       });

      $apiList.append(resultData);

    }).fail(function(err) {
  throw err;
    });
  })
});
