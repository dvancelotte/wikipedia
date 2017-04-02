 $(document).ready(function() {
     
     function changeH1(h1){
         
         if(parseInt(h1)==0){
             $("#matrix").html("Matrix Viewer");
             $("#matrix").attr("class","matrixFonte");
             $("#random").html("I can only show you the door.You're the one that has to walk through it.");
         }
         else{
             $("#matrix").html("Wikipedia Viewer");
             $("#matrix").attr("class","");
             $("#random").html("Random Wikipedia article");
         }
     }
     
     function efectMatrix(change,count){
         
        changeH1(change);
        if(count < 3){
            
            if(parseInt(change) == 0){
                setTimeout(function() {efectMatrix(1,count+1);}, 100);    
            }
            else{
                setTimeout(function() {efectMatrix(0,count+1);}, 100);    
            }   
        }
         else{      
            if(parseInt(change)==0){
                setTimeout(function() {efectMatrix(0,0);}, 5000); 
            }
             else{
                 setTimeout(function() {efectMatrix(1,0);}, 5000);  
             }
        }
         
         
        } 
     
     setTimeout(function() {efectMatrix(0,0);}, 1000);
    
    /*/w/ */ 
     
    $('#search').on('keydown', function(e) {
        
        if (e.which == 13) {
             var search = document.getElementById('search').value;
        
            
             $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+search+"&callback=?", function(json) {
                 
                 document.body.style.background = "white";
                 
                 console.log(json);
                
                         
                 var container = document.getElementById("contanier-search");
                 
                 container.innerHTML ="";
                 try{
                     $.each(json.query.pages, function (data) {
                         link = "https://en.wikipedia.org/wiki/"+json.query.pages[data].title;
                         container.innerHTML += '<a href="'+link+'" target="_blank" style="display:block"> <div class="contanier" id="contanier"> <div class="row" id="list-search"> <div col="col-sm-12" id="list"><h2>'+json.query.pages[data].title+'</h2><p>'+json.query.pages[data].extract+'</p> </div> </div><div></a>';

                    }); 
                 }
                 catch(err){
                     container.innerHTML = '<div class="row text-center"><div col="col-sm-12"><p class="error">Search not found</p></div></div>'
                 }
                 
            
                 
                 $("#contanier-search").hide();
                 $("#contanier-search").slideDown("slow");
    
                
             });
            
          
        
        }
        
    });
        
     
  });