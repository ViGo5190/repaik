'use strict';
import rp from 'request-promise';
import _ from 'lodash';
const RepaikResponce = require('./response');

class Repaik {
    constructor(jsonUrl) {
        this.url = jsonUrl || 'http://www.reddit.com/r/javascript/.json';
    }

    request() {
        var options = {
            uri: this.url,
            json: true
        };
        return rp(options)
            .then((res) => {
                let articles = _.map(res.data.children, function (article) {
                    return article.data;
                });
                return new RepaikResponce(articles);
            });
    }
}

module.exports = Repaik;