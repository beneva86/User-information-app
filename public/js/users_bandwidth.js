$(document).ready(function() {
   let timeOfTheRequest = Date.now();
  console.log(timeOfTheRequest)
  init();
});

 



function init() {

  let isOpened = false;
  let matchCount = 0;


  $(".searchbar input").on("input", function() {  // ha input erkezik az input mezobe

    var criteria = $(this).val(); // a criteria var legyen a begepelt input
    if (criteria !== "") {    // ha az input mezo nem ures
      $.get('/search', {input:criteria}, function(users) { // a /users route-n erkezo JSON file olvasasa
        $(".matches").empty();  // a div.matches legyen ures

        $.each(users, function() {  
          var fullname = this.firstname + " " + this.lastname;  // var fullname legyen a teljes nev
          // console.log(fullname)
          if (fullname.toLowerCase().indexOf(criteria.toLowerCase()) > -1) {  // ha a begepelt szoveg barhol is tartalmazza a begepelt szoveget
            $('.matches').html('<div>' + fullname + '</div>');  // akkor a div.matchesben jelenleg meg az a fullname,ami tartalmazza a begepelt szoveget
           if timeOfTheRequest
            matchCount++; // ez az .each function miatt kell,hogy megismetelje a vizsgalatot (iteration)
          }
        });
        if (matchCount > 0 && !isOpened) {
            $(".matches").addClass('open');
            isOpened = true;  
        }
        matchCount = 0;
      });
    } else {
      isOpened = false; 
      $(".matches").removeClass('open'); // ha az input mezo ujra ures lesz, akkor a div zarodjon be
      // $(".matches").empty(); // ez miert kell? miert mondjuk,hogy legyen ures, ha elotte azt mondjuk,hogy zarodjon be a div?
    }
  });

  $('body').on('click', '.matches > div', function() {
    $('.username ').val($(this).text()).focus();
    $(".matches").removeClass('open');
  });

};
