'use strict';

angular.module('newzak.feedServiceModule', [])

.factory('feedService', function ($http, $q, $sce, conf, lodash) {

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
		var feeds = conf.feeds,
			result;

		lodash.forEach(feeds, function (feed) {
			if (feed.title === source) { result = feed.slug; }
		});

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
				entry.contentSnippet = $sce.trustAsHtml(entry.contentSnippet);
				entry.timestamp = generateTimestamp(entry.publishedDate);
				entries.push(entry);
			});
		});

		entries = lodash.sortBy(entries, 'timestamp').reverse();

		return entries;
	};

	var getMasterList = function () {
		var list = [],
			entries;

		$q.all(fetchAllLists()).then(function (lists) {
			entries = combineLists(lists);

			lodash.forEach(entries, function (entry) {
				list.push(entry);
			});

		});

		return list;
	};

	return {
	   getMasterList: getMasterList 
	};
});
