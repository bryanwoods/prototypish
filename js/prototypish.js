var defaultPageId       = 'first-page'
var contentLoadSelector = '#content .container'
var headerLoadSelector  = '#header .container'
var footerLoadSelector  = '#footer .container'
$(function(){
  pageId = $.query.get('page')
  $body = $('body')
  
  if (pageId == '')
  {
    pageId = defaultPageId
  }
  
  var pageClasses = pageId.split("-")
  
  for (index in pageClasses)
  {
    $body.addClass(pageClasses[index]);
  }
  
  $body.attr('id',pageId).load('shared/layout.html', function(){
    $('head').load('shared/head.html')
    $(headerLoadSelector).load('shared/header.html')
    $(footerLoadSelector).load('shared/footer.html')
    
    try {
      $(contentLoadSelector).load("content/" + pageId + '.html', function(){ appendApplicationJs() })
    } catch(e) {
      $(contentLoadSelector).append("<h1>This page has not yet been created</h1><p>You need to create a file <code>content/" + pageId + ".html</code> in order to create this page.")
      appendApplicationJs()
    }
  })
})

function appendApplicationJs(){
  $('body').append('<script src="js/application.js" type="text/javascript" charset="utf-8"></script>')
}