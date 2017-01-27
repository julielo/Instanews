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
      var $dataSet = data.results.filter(function (item) {
      return item.multimedia.length;
      }).splice(0, 12);

      $.each($dataSet, function(key, value) {
        resultData += '<li>';
        resultData += '<a href=';
        resultData += value.url;
        resultData += '>';
        resultData += '<img src=';
        resultData += value.multimedia[4].url;
        resultData += ' alt='
        resultData += value.title;
        resultData += '>';
        resultData += '</a>';
        resultData += '</li>';
      });

      $('.apiList').append(resultData);

    }).fail(function() {
      console.log('This did not work')
    });
  })
});
