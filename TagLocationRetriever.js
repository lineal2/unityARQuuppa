// Copyright 2015 Quuppa Oy. All rights reserved.
var Q = Q || {};
Q.TagDataRetriever = function (map, updateInterval) {
	var tagDrawables = {};  // map containing all drawables added to map so far
	
	retrieveTagLocations = function () {
		jQuery.ajax({
			url : "getTagPosition",
			//url : "http://127.0.0.1:8080/qpe/getTagLocation",
			dataType : 'json',
			async : true,
			success : function (data, textStatus, jqXHR) {
				var activeTags = {};
                for(var i = 0; i < data.length; i++) {
                    var tag = data[i];
                    var drawable = tagDrawables[tag.id];
                    if(drawable === undefined) {
                    	// not showing this yet
                    	var drawable = new Q.TagDrawable();
                    	map.addDrawable(drawable);
                    } else {
                    	delete tagDrawables[tag.id];
                    }
                    if(tag.color !== undefined)
                        drawable.color = tag.color;
                    if(tag.smoothedPositionX !== undefined && tag.smoothedPositionY !== undefined)
                    	drawable.position = [tag.smoothedPositionX, tag.smoothedPositionY];
                    else
                    	drawable.position = [tag.positionX, tag.positionY];
                    if(tag.name !== undefined)
                        drawable.name = tag.name;
                    activeTags[tag.id] = drawable;
                }
            	// now remove the ones taht did not get update
            	for(id in tagDrawables) {
            		map.removeDrawable(tagDrawables[id]);
            	}
            	
            	tagDrawables = activeTags;
            	map.render();
			},
			error : function (jqXHR, textStatus, errorThrown) {
				console.log('error', 'loading tag positions failed, ' + textStatus);
			}
		});
		
		setTimeout(function () {
			retrieveTagLocations();
		}, updateInterval);
		
	};
	
	setTimeout(function () {
		retrieveTagLocations();
	}, updateInterval);
};
