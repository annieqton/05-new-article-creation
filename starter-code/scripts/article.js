'use strict';

var articles = [];

function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.prototype.toHtml = function() {
  var template = Handlebars.compile($('#article-template').text());  //eslint-disable-line

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  // REVIEW: Here's where the marked library is used
  this.body = marked(this.body);     //eslint-disable-line

  return template(this);
};

if (typeof rawData !== 'undefined') {
  rawData.sort(function(a,b) {    //eslint-disable-line
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(ele) {    //eslint-disable-line
    articles.push(new Article(ele));
  })
}

articles.forEach(function(a){
  $('#articles').append(a.toHtml())
});
