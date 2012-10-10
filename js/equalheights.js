jQuery.fn.equalHeights = function() {
	var maxHeight = 0;

	// get the maximum height
	this.each(function(){
		var $this = jQuery(this);
		$this.height('auto');
		if ($this.outerHeight(false) > maxHeight) { maxHeight = $this.outerHeight(false); }
	});

	// set the elements height
	this.each(function(){
		var $this = jQuery(this);
		$this.height(maxHeight);
	});
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

