$(function() {

  var $articleList = $('.articleList');
  $('.loadingImage').hide();


  /*New York Times API requires an authentication key and the URL for
  each topic is different, so a string for the URL is created based on
  option selected in drop-down menu. */
  
  $('select').change('click', function () {
    $articleList.empty();

    $('.loadingImage').show();
    $('.panel').removeClass('panel').addClass('panel-resize');
    $('.logo').removeClass('logo').addClass('logo-resize');

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
        var url = value.url;
        var image = value.multimedia[4].url;
        var title = value.title;
        var caption = value.abstract;

        resultData += '<li> <a href=';
        resultData += url;
        resultData += '> <img src=';
        resultData += image;
        resultData += ' alt="'
        resultData += title;
        resultData += '" width=100% height=100%> </a> <p class="caption">';
        resultData += caption;
        resultData += '</p> </li>';
      });
      // var unloadImage = $('.loading').hide();

      $('.articleList').append(resultData);

    }).fail(function() {
      console.log('This did not work')
    })
     .always(function() {
     $('.loadingImage').hide();
      })
  });
});
