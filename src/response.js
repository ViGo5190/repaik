'use strict';

import _ from 'lodash';

class RepaikResponce {
    constructor(inputData) {
        this.data = inputData;
    }

    orderBy(param) {
        if (!_.includes(availableOrderParams, _.trim(param, '-'))) {
            throw new Error('Wrong order by param');
        }
        this.data = _.sortBy(this.data, [_.trim(param, '-')]);
        if (_.startsWith(param, '-')) {
            this.data = _.reverse(this.data);
        }

        return this;
    }

    groupBy(param) {
        if (!_.includes(availableGroupParams, param)) {
            throw new Error('Wrong order by param');
        }
        this.data = _.groupBy(this.data, param);

        return this;
    }

    reformateData(reformateDataFunction) {
        this.data = reformateDataFunction(this.data);
        
        return this;
    }

    getData() {
        return this.data;
    }
}

let availableOrderParams = ['created_utc', 'score', 'domain'];
let availableGroupParams = ['domain'];

module.exports = RepaikResponce;
