/**
 * io-simple-page-transition.js
 * JQuery plugin implementing a simple single page navigation.
 * This plugin depends on the following other plugins:
 * 	1. jquery.touchSwipe
 *  2. jquery.focuspoint
 *  3. io-loader plugin
 */

var activeSectionIndex = 0;
(function($){
	
	$.fn.ioSimplePageTransition = function(options) {
		var $w = $(window), 
		wh = window.innerHeight,
    	elements = this,
    	selector = this.selector,
    	initialized = false,
    	countSections = elements.length,
    	defaults = {
			pageSelectorSwipe : "section",
			selectorClickNext : null,
			selectorClickPrevious : null,
			pageflow : "vertical",
			scrollbody : "#scroll-body"
		};
		
		//exposing public method calls
		if(typeof(options)==="string") {
			var $e = $(this);
			switch(options) {
				case "navigateTo":
					navigateTo($e);
					break;
				default:
					break;
			}			
			return this;			
		}
		
		var settings = $.extend(defaults ,options);
		
		var loadNext = function(e){
			if (e.next()[0]) {				
           	 	e.next().find(".lazy").ioloader({
                	onBeforeImageShow : function(elem) {
                		elem.parent().focusPoint("adjustFocus");
                		
                	}
                });
           	 	
               if(e.next().next()[0]) {                  
                   e.next().next().find(".lazy").ioloader({
                   		onBeforeImageShow : function(elem) {
                   			elem.parent().focusPoint("adjustFocus");
                   		}
                   });
               }
           }
		};
		
		var loadPrevious = function(e) {
			
			if (e.prev()[0]) {				
            	e.prev().find(".lazy").ioloader({
                	onBeforeImageShow : function(elem) {
                		elem.parent().focusPoint("adjustFocus");                        		
                	}
                });
                if(e.prev().prev()[0]) {
                   
                    e.prev().prev().find(".lazy").ioloader({
                    	onBeforeImageShow : function(elem) {
                    		elem.parent().focusPoint("adjustFocus");
                    	}
                    });
                }
            }			
		};
		
		var loadCurrent = function(e) {
			e.ioloader({
		    	onBeforeImageShow : function(elem) {
		    		elem.parent().focusPoint("adjustFocus");
		    	}
		    });
		};
		
		var navigateTo = function(e) {
			loadCurrent(e);
            loadPrevious(e);
            loadNext(e);
            
			var n = e.prev().length;
			activeSectionIndex = n;
			var top = (-100 * activeSectionIndex) +"%";
            var offset = $(scrollbody).offset();
            offset.top = activeSectionIndex * wh;
            $(pageSelectorSwipe).find(".content").children().removeClass("show");
            e.find(".content").children().addClass("show");            			
		};
		
		var init = function() {
			$(selector).height(wh);			
			initialized=true;
		}
		
		this.each(function(){
			var $e = $(this), 
				direction1 = settings.pageflow==="vertical"?"down":"right",
				direction2 = settings.pageflow==="vertical"?"up":"left",
				scrollbody = settings.scrollbody;
			
			if(!initialized) init();
			$e.swipe({
				swipe : function(event, direction, distance, duration, fingercount, fingerData) {
					if(direction===direction1) { //down
						
						if(activeSectionIndex === 0) {
							var clazz ="";
							for( var i=2;i<countSections+1;i++) {
								 clazz +=" page"+i;
							}
							$(scrollbody).removeClass($.trim(clazz));							
						} else {	
							$(settings.pageSelectorSwipe).find(".content").children().removeClass("show");
							loadPrevious($e);
							$(scrollbody).removeClass("page" + (activeSectionIndex+1));
		                    activeSectionIndex--;
		                    var top = (-100 * activeSectionIndex) +"%";
		                    var offset = $(scrollbody).offset();
		                    offset.top = offset.top + wh;
		                    //$e.find(".content").children().removeClass("show");
		                    $e.prev().find(".content").children().addClass("show");
		                    
		                    
						}						
					} 
					
					if(direction===direction2) { //up
						if(activeSectionIndex === (countSections-1)) {
							//nope, no looping
						} else {	
							$(settings.pageSelectorSwipe).find(".content").children().removeClass("show");
							loadNext($e);
							activeSectionIndex++;
		                    var clazz= "page" + (activeSectionIndex+1);
		                    $(scrollbody).addClass(clazz);
		                    var top = (-100 * activeSectionIndex) +"%";
		                    var offset = $(scrollbody).offset();
		                    offset.top = offset.top - wh;		
		                    //$e.find(".content").children().removeClass("show");
		                    $e.next().find(".content").children().addClass("show");
						}
					}
					
				}
			});
			
			
		});		
		return this;		
	};
	
})(jQuery);