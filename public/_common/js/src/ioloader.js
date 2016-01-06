/**
 * ioloader.js
 * JQuery plugin for lazy preloading of images --
 */

(function( $ ) {
	
	$.fn.ioloader = function(options) {
		var $w = $(window),
        	elements = this,
        	selector = this.selector,
        	defaults = {
				attribute : 'data-src',
				onImageShow : function(e){},
				onBeforeImageShow : function(e){}
			};
		
		var settings = $.extend(defaults ,options);
		
		var onImageLoad= function(e,source) {
			 
			e.removeClass('lazy-loading');
			e.attr('src',source); 
			settings.onBeforeImageShow(e);			
	        e.addClass('lazy-loaded');
	        settings.onImageShow(e);
	        e.trigger('lazyshow');
		};
		
		
		var loadImage = function(e, source) {
			e.addClass('lazy-loading');
			e.trigger('lazyload');
			$.ajax({
				method : 'GET',
				url : source,
				success : function(data, textStatus, jqXHR) {
					onImageLoad(e, source);
				},
				error : function(jqXHR, textStatus, errorThrown) {
					alert(textStatus + ':' + errorThrown);
				}				
			});
		};
		
		this.each(function(){
			var $e = $(this), 
				source = $e.attr(settings.attribute);
			if($e.hasClass('lazy-loaded') || $e.hasClass('lazy-loading')) return;			
			loadImage($e,source);									
		});
		
		return this;		
	};
	
})(jQuery);



