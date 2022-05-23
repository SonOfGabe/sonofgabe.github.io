// jQuery(window).on('load', function() {
// 	"use strict";
    
    
//     // HIDE PRELOADER
//     $(".preloader").addClass("hide-preloader");   
    
//     // SHOW/ANIMATE ANIMATION CONTAINER
//     setTimeout(function(){

//         $("#intro .animation-container").each(function() {

//             var e = $(this);

//             setTimeout(function(){

//                 e.addClass("run-animation");

//             }, e.data("animation-delay") );

//         });

//     }, 700 );

    
// });


jQuery(document).ready(function($) {
	"use strict";
    
    $(".preloader").addClass("hide-preloader");   
    setTimeout(function(){

        $("#intro .animation-container").each(function() {

            var e = $(this);

            setTimeout(function(){

                e.addClass("run-animation");

            }, e.data("animation-delay") );

        });

    }, 700 );


    
    
    // SCROLL REVEAL SETUP
    
    
    
});