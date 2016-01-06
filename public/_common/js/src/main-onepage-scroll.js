var activeSectionIndex = 0;
var countSections =7;

jQuery(document).ready(function($) {
    var wh = window.innerHeight;
    $("section").height(wh);

    $("section").swipe({
        swipe: function(event, direction, distance, duration, fingercount, fingerData) {
            var $this = $(this);
            if(direction==="down") {

                if(activeSectionIndex === 0) {
                    //nope, no looping
                    $("#scroll-body").removeClass("page2 page3 page4 page5 page6 page7");
                } else {
                    $("#scroll-body").removeClass("page" + (activeSectionIndex+1));
                    activeSectionIndex--;
                    var top = (-100 * activeSectionIndex) +"%";
                    var offset = $("#scroll-body").offset();
                    offset.top = offset.top + wh;
                    
                    if ($this.prev()[0]) {
                    	$this.prev().find(".lazy").ioloader({
                        	onBeforeImageShow : function(e) {
                        		e.parent().focusPoint("adjustFocus");
                        	}
                        });
                        if($this.prev().prev()[0]) {
                           
                            $this.prev().prev().find(".lazy").ioloader({
                            	onBeforeImageShow : function(e) {
                            		e.parent().focusPoint("adjustFocus");
                            	}
                            });
                        }
                    }
                    
                    
                    /*
                    $("#scroll-body").css({
                        "top" : offset.top +"px",
                        "transition" : "top 0.4s ease-in",
                        "-ms-transition": "top 0.4s ease-in",
                        "-moz-transition" : "top 0.4s ease-in",
                        "-webkit-transition" : "top 0.4s ease-in"
                    });
                    */
                }
            }
            if(direction ==="up") {
                if(activeSectionIndex === (countSections-1)) {
                    //nope, no looping
                } else {



                    activeSectionIndex++;
                    var clazz= "page" + (activeSectionIndex+1);
                    $("#scroll-body").addClass(clazz);
                    var top = (-100 * activeSectionIndex) +"%";
                    var offset = $("#scroll-body").offset();
                    offset.top = offset.top - wh;
                    if ($this.next()[0]) {
                    	 $this.next().find(".lazy").ioloader({
                         	onBeforeImageShow : function(e) {
                         		e.parent().focusPoint("adjustFocus");
                         	}
                         });
                        if($this.next().next()[0]) {
                           
                            $this.next().next().find(".lazy").ioloader({
                            	onBeforeImageShow : function(e) {
                            		e.parent().focusPoint("adjustFocus");
                            	}
                            });
                        }
                    }

                    //$("section." + clazz + " div.focuspoint").focusPoint("adjustFocus");
                    /*
                    $("#scroll-body").css({
                        "top" : offset.top +"px",
                        "transition" : "top 0.4s ease-in",
                        "-ms-transition": "top 0.4s ease-in",
                        "-moz-transition" : "top 0.4s ease-in",
                        "-webkit-transition" : "top 0.4s ease-in"
                    });
                    */
                }
            }
        }
    });



    $('.focuspoint').focusPoint();

    $('.blue .lazy').ioloader({
    	onBeforeImageShow : function(e) {
    		e.parent().focusPoint("adjustFocus");
    	}
    });
    $('.magenta .lazy').ioloader({
    	onBeforeImageShow : function(e) {
    		e.parent().focusPoint("adjustFocus");
    	}
    });

    


});