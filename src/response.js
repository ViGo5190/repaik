'use strict';

import _ from 'lodash';

class RepaikResponce {
    constructor(inputData){
        this.data = inputData;
    }

    orderBy(param) {
        if (!_.includes(availableOrderParams,_.trim(param,'-'))){
            throw new Error('Wrong order by param');
        }
        this.data = _.sortBy(this.data, [_.trim(param,'-')]);
        if (_.startsWith(param, '-')){
            this.data = _.reverse(this.data);
        }
        return this;
    }

    getData() {
        // return this.data;

        return _.map(this.data, function(el){
            return {
                // id: el.id,
                // title: el.title,
                // utcCreationDate: el.created_utc,
                score: el.score
            };
            // return article.data;
        });
    }
}

let availableOrderParams = ['created_utc','score'];

module.exports = RepaikResponce;
