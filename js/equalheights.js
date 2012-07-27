jQuery.fn.equalHeights = function() {
	var maxHeight = 0;

	// get the maximum height
	this.each(function(){
		var $this = jQuery(this);
		$this.height('auto');
		if ($this.height() > maxHeight) { maxHeight = $this.height(); }
	});

	// set the elements height
	this.each(function(){
		var $this = jQuery(this);
		$this.height(maxHeight);
	});
};

function ddResizeClass(className) {
	var selector = '.' + className;
	jQuery(selector).equalHeights();
}

function ddEqualizeHeights() {
	if (ddClasses != 'undefined') {
		ddClasses.each(function(className) {
			ddResizeClass(className);
		});
	}
}

