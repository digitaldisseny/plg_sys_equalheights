jQuery.fn.equalHeights = function() {
	var maxHeight = 0;
	var windowWidth = jQuery(window).width();

	// get the maximum height
	this.each(function(){
		var $this = jQuery(this);
		$this.height('auto');
		if ($this.outerHeight(false) > maxHeight) { maxHeight = $this.outerHeight(false); }
	});

	// We dont want to add extra space in a mobile view (< 750px)
	if (windowWidth > 750)
	{
		// Set the elements height
		this.each(function(){
			var $this = jQuery(this);
			$this.height(maxHeight);
		});
	}
};

function ddResizeClass(selector) {
	jQuery(selector).equalHeights();
}

function ddEqualizeHeights() {
	if (ddClasses != 'undefined') {
		jQuery.each(ddClasses, function(index, selector) {
			ddResizeClass(selector);
		});
	}
}
