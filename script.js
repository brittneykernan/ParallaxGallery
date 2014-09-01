$(document).ready(function() {


	// settings 
	var parallaxDif = 75;
  var imgSelector = '.pinImg';
  var itemSelector = '.pinHolder';
  var maskClassName = 'parLaxGal-imgMask';
  var moverClassName = 'parLaxGal-imgMover';

	var imgs = $(itemSelector);

	imgs.each(function() {

		// resize image
		var imgHeight = $(imgSelector,this).height();

		$(imgSelector,this).wrap( "<div class='"+maskClassName+"'><div class='"+moverClassName+"'></div></div>" );
		$('.'+maskClassName,this).css({			
			'overflow':'hidden',
			'height':$('.'+maskClassName,this).height()
		});
		$('.'+moverClassName,this).css({			
			'transition':'transform 0.1s',
		});
		$(imgSelector,this).css({
			'transform': 'scale(' + ((imgHeight+parallaxDif)/imgHeight) + ')'
		});
	});	

	var windowHeight = $(window).height();
	$(window).on('resize',function(e) {
		windowHeight = $(window).height();
	});

	setParallaxTop();
	$(window).on('scroll',function(e) {
		setParallaxTop();
	});

	function setParallaxTop() {
		var scrollTop = $(this).scrollTop();
		imgs.each(function() {
			var topFromWindow = $(this).offset().top - scrollTop;
			$('.'+moverClassName,this).css('transform', 'translateY('+ getParallaxTop(topFromWindow,$(this).height()) + 'px)');
		});	
	}

	function getParallaxTop(offsetTop,imgHeight) {
		var position = (offsetTop+imgHeight)/(imgHeight+windowHeight);
		if(position > 0 && position < 1)
			return (position*parallaxDif - (parallaxDif/2)).toFixed(2);
	}
});