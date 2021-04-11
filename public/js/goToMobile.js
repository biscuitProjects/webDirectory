const widthInnerWidth = window.innerWidth

if(widthInnerWidth < 701 && window.location.pathname == '/'){
     if(window.location.pathname != '/mob/'){
          window.location.pathname = '/mob/'
     }
}

if(widthInnerWidth > 700 && window.location.pathname == '/mob/'){
     window.location.pathname = '/'
}