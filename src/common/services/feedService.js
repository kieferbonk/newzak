'use strict';

angular.module('newzak.feedServiceModule', [])

.factory('feedService', function ($http, conf, lodash) {

	var fetchFeed = function (url) {
		return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=100&q=' + url + 
			'&callback=JSON_CALLBACK');
	};

	var fetchAllLists = function () {
		var lists = [];
		lodash.forEach(conf.feeds, function (n) {
			lists.push(fetchFeed(n.url));
		});

		return lists;
	};

	var getMasterList = function () {
		var list = [];

		lodash.forEach(fetchAllLists(), function (n) {
			n.then(function (feed) {
				if (200 === feed.data.responseStatus) { list.push.apply(list, feed.data.responseData.feed.entries); }
			})
		});

		return list;
	};

    return {
       getMasterList: getMasterList 
    };
});
