'use strict';

import _ from 'lodash';

class RepaikResponce {
    constructor(inputData) {
        this.data = inputData;
    }

    orderBy(param) {
        let paramTrimmed = [_.trim(param, '-')];
        let orderDirection = (_.startsWith(param, '-')) ? 'desc' : 'asc';
        this.data = _.orderBy(this.data, paramTrimmed, [orderDirection]);

        return this;
    }

    groupBy(param) {
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

module.exports = RepaikResponce;
