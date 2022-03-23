export default async function(context){
  if(context.route.name=='index' || context.route.name=='cases' || context.route.name=='about' || context.route.name=='login' || context.route.name=='register' || context.route.name=='gallery' || context.route.name=='contacts' || context.route.name=='status' || context.route.name=='book'){
      return
  }
  if(localStorage.getItem('account_type')==undefined){

      if(context.route.name=='index'){
        
          return
     }
     window.location.href='/login'
  }
  else if(context.route.name=='admin'){
      window.location.href='/admin/book'   
  }

}