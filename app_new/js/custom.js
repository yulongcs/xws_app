
jQuery(document).ready(function() {


/***************************************************
		  		   // Portfolio on mouseover opactiy
***************************************************/	

if( jQuery.hasOwnProperty("prettyPhoto") ){

$(".lightbox").prettyPhoto({
animation_speed	: 'normal',
theme			: 'pp_default',
social_tools	: ''
});

}

});

//prettyPhoto END	




	
/***************************************************
		  			Isotope Portfolio
***************************************************/
jQuery(document).ready(function(){ 

// Needed variables
	var $container	 	= $('#portfolio_list');
	var $filter 		= $('#portfolio_filter');
		
// Run Isotope  
	$container.isotope({
		filter				: '*',
		layoutMode   		: 'masonry',
		animationOptions	: {
		duration			: 750,
		easing				: 'linear'
	   }
	});	
	
// Isotope Filter 
	$filter.find('a').click(function(){
	  var selector = $(this).attr('data-filter');
		$container.isotope({ 
		filter				: selector,
		animationOptions	: {
		duration			: 750,
		easing				: 'linear',
		queue				: false
	   }
	  });
	  return false;
	});	

// Adding Class to current selected items
$filter.find('a').click(function() {
		$filter.find('a').removeClass('current');
		$(this).addClass('current');
	});	



});	
// Isotope Portfolio END

