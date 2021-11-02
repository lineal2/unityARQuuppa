// Copyright 2015 Quuppa Oy. All rights reserved.
var Q = Q || {};
Q.settings = function() {
	var that = {};
	that.useSmoothing = true;
	//that.smoothing = 0.8;
	that.maxAge = 80000;
	that.centerOnSelected = false;
	that.showRawDataInTree = false;
	that.renderCovarianceForSelected = true;
	that.renderInactiveAreaAsGrey = true;
	that.renderZones = true;
	that.renderTrackingAreaBorders = true;
	that.dotScaleFactor = 1.0;
	that.tagPositionAccuracyEnabled = true;
	that.tagPositionRadiusThreshold = 10.0;
	that.gridVisible = true;
	that.gridColor = "#ff0000";
	that.backgroundColor = "#898484";
	that.gridAlpha = 0.5;
	
	var gui = new dat.GUI();
	gui.width = 500;
	gui.closed = true;
	that.gui = gui;
	
	var f1 = gui.addFolder('Filters');
	var maxAgeControl = f1.add(that, "maxAge", 0, 180000).name("Position max age filter (msec,0=off)").listen();	
	f1.add(that, "tagPositionRadiusThreshold", 0.0, 10.0).name("Tag pos radius threshold filter (m,0=off)");	
	
	var f2 = gui.addFolder('Map rendering');
	f2.add(that, "dotScaleFactor", 0.1, 4.0).name("Size scale factor for dots on the map");
	f2.add(that, "tagPositionAccuracyEnabled", 0.1, 10.0).name("Render tag position accuracy halo (2D)");
	f2.add(that, "renderCovarianceForSelected").name("Render covariance matrix for selected tags (2D)");
	f2.add(that, "gridVisible").name("Grid visible?");
	f2.addColor(that, "gridColor").name("Grid color");
	f2.add(that, "gridAlpha", 0.0, 1.0).name("Grid alpha");
	f2.addColor(that, "backgroundColor").name("Background color");
	f2.add(that, "renderInactiveAreaAsGrey").name("Render inactive area as grey (2D)");
	f2.add(that, "renderZones").name("Render Zones (2D)");
	f2.add(that, "renderTrackingAreaBorders").name("Render tracking area borders (2D)");
	
	gui.add(that, "centerOnSelected").name("Center on tag when selected").listen();
	gui.add(that, "showRawDataInTree").name("Show ALL data fields in tree");
	
	return that;
}();
