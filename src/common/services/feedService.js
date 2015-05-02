'use strict';

angular.module('newzak.feedServiceModule', [])

.factory('feedService', function ($http, $q, conf, lodash) {

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

	var brandSource = function (source) {
		var result;

		switch (source) {
			case 'Drowned In Sound // Feed':
				result = 'dis';
				break;
			case 'Album Reviews - Pitchfork':
				result = 'pitchfork';
				break;
		}

		return result;
	};

	var generateTimestamp = function (dateStr) {
		var dateObj = new Date(dateStr);

		return dateObj.getTime();
	};

	var combineLists = function (lists) {
		var entries = [],
			type;

		lodash.forEach(lists, function (list) {
			if (200 !== list.data.responseStatus) { return; }

			lodash.forEach(list.data.responseData.feed.entries, function (entry) {
				entry.type = brandSource(list.data.responseData.feed.title);
				entry.srcLink = list.data.responseData.feed.link;
				entries.push(entry);
			})
		});

		return entries;
	};

	var getMasterList = function () {
		var list = [],
			entries;

		$q.all(fetchAllLists()).then(function (lists) {
			entries = combineLists(lists);

			lodash.forEach(entries, function (entry) {
				entry.timestamp = generateTimestamp(entry.publishedDate);
				list.push(entry);
			});
		});

		return list;
	};

    return {
       getMasterList: getMasterList 
    };
});
