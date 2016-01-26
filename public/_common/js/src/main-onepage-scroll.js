var heightSubMenuItems = 20;
jQuery(document).ready(function($) {
	$(".content").children().removeClass("show");
	$("#scroll-body").ioSimplePageTransition();
    $('.focuspoint').focusPoint();

    $('.blue .lazy').ioloader({
    	onBeforeImageShow : function(e) {    		
    		if(e.hasClass("main"))
    			e.parent().focusPoint("adjustFocus"); 
    		$('.blue .content').children().addClass("show");
    	}    	
    });
   
    
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
    
    $("ul.submenu a").click(function(ev){
    	ev.preventDefault();
    	var $this =$(this);
    	var index = $this.parent().prevAll("li").size();
    	$("#scroll-body").ioSimplePageTransition("navigateTo",index);
    });
    
});