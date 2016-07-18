repaik
======

JSON crawler and formatter.

Example:
--------


```
    const Repaik = require('repaik);
    let repaik = new Repaik();
    let res = repaik.request('http://www.reddit.com/r/javascript/.json');
    res.getData() // return json
```

Example
-------


You need to order articles from reddit by domain and then group by domain to get statistic like `domain, articles count, score sum`:

```
    const Repaik = require('repaik');
    const _ = require('lodash');

    let reformatDataInputData = function(data){
        return _.map(data.data.children, function (article) {
            return article.data;
        });
    };

    let reformatDataOrderedData = function(data) {
        return _.map(data, function (el) {
            return {
                id: el.id,
                title: el.title,
                'utc creation date': el.created_utc,
                score: el.score,
                domain: el.domain
            };
        });
    };

    let reformatDataGroupedData = function(data) {
        return _.map(data, function (el, key) {
            let scoreSumm = _.reduce(el, function(sum, curEl) {
                return sum + curEl.score;
            }, 0);
            return {
                domain: key,
                'articles count': el.length,
                'score summ': scoreSumm
            };
        });
    };

    let repaik = new Repaik();
    let res = repaik.request('http://www.reddit.com/r/javascript/.json');

    res
        .reformateData(reformatDataInputData)
        .orderBy('domain')
        .groupBy('domain')
        .reformateData(reformatDataGroupedData)
        .getData(); // get all you need

```