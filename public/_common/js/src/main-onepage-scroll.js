var heightSubMenuItems = 20;
jQuery(document).ready(function($) {
    
	$("section").ioSimplePageTransition();
    $('.focuspoint').focusPoint();

    $('.blue .lazy').ioloader({
    	onBeforeImageShow : function(e) {    		
    		if(e.hasClass("main"))
    			e.parent().focusPoint("adjustFocus");    		
    	}    	
    });
    
    window.setTimeout(function(){
    	$('.blue .content').children().addClass("show");
    },1000)
    
    $('.magenta .lazy').ioloader({
    	onBeforeImageShow : function(e) {
    		if(e.hasClass("main"))
    			e.parent().focusPoint("adjustFocus");
    	}
    });
    
    $(".submenuToggle").click(function(ev){
		ev.preventDefault();
		var $this = $(this);		
		$("ul.submenu").css({
			"height": "0px"
		});	
		$(".submenuToggle").not($this).removeClass("open");
		if($this.hasClass("open")) {
			$this.removeClass("open");
		} else {
			var submenuHeight  = $this.next("ul").find("li").length * heightSubMenuItems;
			$this.next("ul").css("height", submenuHeight + "px");
			$this.addClass("open");
		}		
	});
    
});