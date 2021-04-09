const widthInnerWidth = window.innerWidth
console.log(widthInnerWidth)

if(widthInnerWidth < 1000 && window.location.pathname == '/'){
     if(window.location.pathname != '/mob/'){
          window.location.pathname = '/mob/'
     }
}

if(widthInnerWidth > 1000 && window.location.pathname == '/mob/'){
     window.location.pathname = '/'
}