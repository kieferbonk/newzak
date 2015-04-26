'use strict';

angular.module('newzak.conf', [])

.constant('conf', {
    feeds: [
    	{
    		'name': 'Pitchfork',
    		'url': 'http://pitchfork.com/rss/reviews/albums/'
    	},
    	{
    		'name': 'Drowned In Sound',
    		'url': 'http://drownedinsound.com/feeds/reviews/feed.xml'
    	}
    ]
    
});
