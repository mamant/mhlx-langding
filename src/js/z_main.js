function habitsSlider() {
	var imgSlider = $('.habits-slider-slide .img-slider');
	var textSlider = $('.habits-slider-slide .text-slider');

	var parentSlider = $('.habits-slider-slide');

	var currentIndicator = parentSlider.find('.current-slide-marker');

	function removeIndClasses() {
		currentIndicator.removeClass('left middle right');
	}

	imgSlider.owlCarousel({
		singleItem: true,
		items: 1,
		dots: false,
		autoplay: false,
		loop: false,
		nav: false,
		navText: '',
		mouseDrag: true,
		navSpeed: 600
		// animateIn: 'fadeIn',
		// animateOut: 'fadeOut'
	});

	textSlider.owlCarousel({
		singleItem: true,
		items: 1,
		dots: false,
		autoplay: false,
		loop: false,
		nav: false,
		navText: '',
		mouseDrag: true,
		navSpeed: 600
		// animateIn: 'fadeIn',
		// animateOut: 'fadeOut'
	});

	parentSlider.find('.left-control').on('click', function(e){
		e.preventDefault();
		imgSlider.trigger('prev.owl.carousel', 600);
		textSlider.trigger('prev.owl.carousel', 600);
	});

	parentSlider.find('.right-control').on('click', function(e){
		e.preventDefault();
		imgSlider.trigger('next.owl.carousel', 600);
		textSlider.trigger('next.owl.carousel', 600);
	});

	$('.slider-nav-steps .step').on('click', function(e){
		e.preventDefault();

		var id = $(this).attr('data-id');

		textSlider.trigger('to.owl.carousel', id);
		imgSlider.trigger('to.owl.carousel', id);
	});

	imgSlider.on('changed.owl.carousel', function(event) {
		$('.slider-nav-steps .step').each(function(){
			var id = parseInt($(this).attr('data-id'));
			var itemIndex = parseInt(event.item.index);

			if (itemIndex == 0) {
				removeIndClasses();
				currentIndicator.addClass('left');
			}

			if (itemIndex == 1) {
				removeIndClasses();
				currentIndicator.addClass('middle');
			}

			if (itemIndex == 2) {
				removeIndClasses();
				currentIndicator.addClass('right');
			}
		})
	});
}


$(document).ready(function() {
	habitsSlider();

	$('[data-scroll]').on('click', function () {
		var link = $(this).data('href');
		var headerHeight = $('.fixed-nav').height(); // get height for correct scroll
		var scrollPosition = $(link).offset().top - headerHeight;

		$.smoothScroll(scrollPosition);
	});

	$('.my-background-video').bgVideo({
		fullScreen: false
	});

	$('.phone_with_ddd').mask('+38 000 000-00-00');

	$('.navigation-button, .navigation-button-close, .page-header--mobile-menu').on('click', function () {
		$('body').toggleClass('has-mobile-menu');
	});
});
