$(".matches").hide();
$(document).ready(function() {

  let list = [];

$.get('/search', function(response) {
  list = response.list  
//  console.log(list)   // it works
});

  $(".username").keyup(function() {  
      let matchedUsers = "";    
      let input = $(".username").val().toLowerCase(); 
      // console.log(input)   // it works
      if (input != "") {

          const fullname = list.filter(function (element) {
             return element.toLowerCase().includes(input);
        });
        // console.log(fullname)  // it is an array with the matched usernames        
            for(i=0; i<fullname.length; i++){
              matchedUsers += `<li class="listItem" name="${matchedUsers[i]}">${fullname[i]}</li>`
            }

            $('.listofmatches').html(`${matchedUsers}`);
        } 

        $('.listItem').on('click', function() {
           $('.username').val($(this).text()).focus();
           $('.matches').addClass('close');
      })
  });
});  

