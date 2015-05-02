'use strict';

angular.module('newzak.conf', [])

.constant('conf', {
	pageTitle : 'newzak',
	feeds: [
		{
			'url': 'http://pitchfork.com/rss/reviews/albums/',
			'title': 'Album Reviews - Pitchfork',
			'slug': 'pitchfork'
		},
		{
			'url': 'http://drownedinsound.com/feeds/reviews/feed.xml',
			'title': 'Drowned In Sound // Feed',
			'slug': 'dis'
		}
	]
	
});
