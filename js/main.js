$(function() {

  var $articleList = $('.articleList');

  /*New York Times API requires an authentication key and the URL for
  each topic is different, so a string for the URL is created based on
  option selected in drop-down menu. */
  $('select').change('click', function () {
    $articleList.empty();

    var url = 'https://api.nytimes.com/svc/topstories/v2/';
    url += this.value;
    url += '.json';
    url += '?' + $.param({'api-key': 'd4c685c39c7d41bba145a35a29acd516'});

    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(data) {
      var resultData = ''

      /*Filter and Splice methods used on array to filter the first 12 articles
      that only have images */
      var $dataSet = data.results.filter(function (item) {
      return item.multimedia.length;
      }).splice(0, 12);

      /*Loop iterates over array to create a list of images with links to article,
      alt tags, and captions */
      $.each($dataSet, function(key, value) {
        resultData += '<li> <a href=';
        resultData += value.url;
        resultData += '> <img src=';
        resultData += value.multimedia[4].url;
        resultData += ' alt="'
        resultData += value.title;
        resultData += '" width=100% height=100%> </a> <p class="caption">';
        resultData += value.abstract;
        resultData += '</p> </li>';
      });

      $('.articleList').append(resultData);

    }).fail(function() {
      console.log('This did not work')
    });
  })
});
