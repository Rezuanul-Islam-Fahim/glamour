/* ========================================================================

GLAMOUR: function.js
Main Theme JS file

@Author: Rezuanul Islam Fahim
@URL: http://andrewch.eu
 
=========================================================================
 */



'use strict';

jQuery(document).ready(function ($) {


	// Initializing wow animation
	//==================================

	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 80
	});
	wow.init();


	// Swiping carousel slides
	//===========================

	$(".carousel").swipe({
		swipeLeft: function () {
			$(this).carousel("next");
		},
		swipeRight: function () {
			$(this).carousel("prev");
		},
		allowPageScroll: "vertical"
	});


	// Preloader
	//=========================

	$(window).on("load", function () {
		$("#status").fadeOut();
		$("#preloader").delay(700).fadeOut("slow");
		$("body").delay(700).css({
			'overflow': 'visible'
		});
	});


	// Hide mobile menu after clicking on a link
	//==============================

	$(".navbar-collapse a").click(function () {
		$(".navbar-collapse").collapse("hide");
	});


	// ISOTOPE FILTER
	// ===========================

	if ($('.iso-box-section').length > 0) {

		var $container = $('.iso-box-section'),
			$imgs = $('.iso-box img');

		$container.imagesLoaded(function () {

			$container.isotope({
				layoutMode: 'fitRows',
				itemSelector: '.iso-box'
			});

			$imgs.load(function () {
				$container.isotope('reLayout');
			});

		});

		//filter items on button click

		$('.filter-wrapper li a').click(function () {

			var $this = $(this),
				filterValue = $this.attr('data-filter');

			$container.isotope({
				filter: filterValue,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false,
				}
			});

			// don't proceed if already selected 

			if ($this.hasClass('selected')) {
				return false;
			}

			var filter_wrapper = $this.closest('.filter-wrapper');
			filter_wrapper.find('.selected').removeClass('selected');
			$this.addClass('selected');

			return false;
		});

	}


	// Add smooth scrolling to all links 
	//==========================

	$(".navbar a, .home a, .scrollToTop").on('click', function (event) {

		// Prevent default anchor click behavior
		event.preventDefault();

		// Store hash
		var hash = this.hash;

		// Using jQuery's animate() method to add smooth page scroll
		// The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, 900, function () {

			// Add hash (#) to URL when done scrolling (default click behavior)
			window.location.hash = hash;
		});
	});


	// Check to see if the window is top if not then display scrollToTop button
	//=======================

	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			$(".scrollToTop").fadeIn("slow");
		} else {
			$(".scrollToTop").fadeOut("slow");
		}
	});


	// JQuery to collapse navbar on scroll
	//================================

	$(window).scroll(function () {
		if ($(".navbar").offset().top > 60) {
			$(".navbar").addClass("top-nav-collapse");
		} else {
			$(".navbar").removeClass("top-nav-collapse");
		}
	});


	// Map
	//=====================

	google.maps.event.addDomListener(window, 'load', init);
	var map;

	function init() {
		var mapOptions = {
			center: new google.maps.LatLng(27.734607, 85.664078),
			zoom: 12,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.DEFAULT,
			},
			disableDoubleClickZoom: true,
			mapTypeControl: true,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			},
			scaleControl: true,
			scrollwheel: false,
			panControl: true,
			streetViewControl: true,
			draggable: true,
			overviewMapControl: true,
			overviewMapControlOptions: {
				opened: false,
			},
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: [{
				"stylers": [{
					"visibility": "off"
				}]
			}, {
				"featureType": "road",
				"stylers": [{
					"visibility": "on"
				}, {
					"color": "#ffffff"
				}]
			}, {
				"featureType": "road.arterial",
				"stylers": [{
					"visibility": "on"
				}, {
					"color": "#fee379"
				}]
			}, {
				"featureType": "road.highway",
				"stylers": [{
					"visibility": "on"
				}, {
					"color": "#fee379"
				}]
			}, {
				"featureType": "landscape",
				"stylers": [{
					"visibility": "on"
				}, {
					"color": "#f3f4f4"
				}]
			}, {
				"featureType": "water",
				"stylers": [{
					"visibility": "on"
				}, {
					"color": "#7fc8ed"
				}]
			}, {}, {
				"featureType": "road",
				"elementType": "labels",
				"stylers": [{
					"visibility": "off"
				}]
			}, {
				"featureType": "poi.park",
				"elementType": "geometry.fill",
				"stylers": [{
					"visibility": "on"
				}, {
					"color": "#83cead"
				}]
			}, {
				"elementType": "labels",
				"stylers": [{
					"visibility": "off"
				}]
			}, {
				"featureType": "landscape.man_made",
				"elementType": "geometry",
				"stylers": [{
					"weight": 0.9
				}, {
					"visibility": "off"
				}]
			}],
		}
		var mapElement = document.getElementById('map');
		var map = new google.maps.Map(mapElement, mapOptions);
		var locations = [
			['Coffee Shop', 'London', '121 1212 2121', 'info@coffee.com', 'coffee.com', 27.7236, 85.5247, 'https://mapbuildr.com/assets/img/markers/solid-pin-blue.png']
		];
		for (i = 0; i < locations.length; i++) {
			if (locations[i][1] == 'undefined') {
				description = '';
			} else {
				description = locations[i][1];
			}
			if (locations[i][2] == 'undefined') {
				telephone = '';
			} else {
				telephone = locations[i][2];
			}
			if (locations[i][3] == 'undefined') {
				email = '';
			} else {
				email = locations[i][3];
			}
			if (locations[i][4] == 'undefined') {
				web = '';
			} else {
				web = locations[i][4];
			}
			if (locations[i][7] == 'undefined') {
				markericon = '';
			} else {
				markericon = locations[i][7];
			}
			marker = new google.maps.Marker({
				icon: markericon,
				position: new google.maps.LatLng(locations[i][5], locations[i][6]),
				map: map,
				title: locations[i][0],
				desc: description,
				tel: telephone,
				email: email,
				web: web
			});
			if (web.substring(0, 7) != "http://") {
				link = "http://" + web;
			} else {
				link = web;
			}
			bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
		}

		function bindInfoWindow(marker, map, title, desc, telephone, email, web, link) {
			var infoWindowVisible = (function () {
				var currentlyVisible = false;
				return function (visible) {
					if (visible !== undefined) {
						currentlyVisible = visible;
					}
					return currentlyVisible;
				};
			}());
			iw = new google.maps.InfoWindow();
			google.maps.event.addListener(marker, 'click', function () {
				if (infoWindowVisible()) {
					iw.close();
					infoWindowVisible(false);
				} else {
					var html = "<div style='color:#000;background-color:#fff;padding:5px;width:150px;'><h4>" + title + "</h4><p>" + desc + "<p><p>" + telephone + "<p><a href='mailto:" + email + "' >" + email + "<a><a href='" + link + "'' >" + web + "<a></div>";
					iw = new google.maps.InfoWindow({
						content: html
					});
					iw.open(map, marker);
					infoWindowVisible(true);
				}
			});
			google.maps.event.addListener(iw, 'closeclick', function () {
				infoWindowVisible(false);
			});
		}
	}
});
