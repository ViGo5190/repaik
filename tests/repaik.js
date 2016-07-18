/**
 * Stanislav Gumeniuk i@vigo.su
 */

let assert = require('chai').assert;
let RepaikResponce = require('../src/responce');
let knowJson = require('../tests_mocks/input.json');
let _ = require('lodash');

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

describe('services/cache', function () {


    describe('RepaikResponce', function () {
        it('return good object of loaded json', function () {
            let res = new RepaikResponce(knowJson);
            assert.deepEqual(res.getData(), require('../tests_mocks/output1'));
        });

        it('reformat input data', function () {
            let res = new RepaikResponce(knowJson);
            assert.deepEqual(res.reformateData(reformatDataInputData).getData(), require('../tests_mocks/output2'));
        });

        it('order by', function () {
            let res = new RepaikResponce(knowJson);
            // console.log(JSON.stringify(
            //     res.reformateData(reformatDataInputData).orderBy('domain').getData()
            // ));
            assert.deepEqual(
                res.reformateData(reformatDataInputData).orderBy('domain').getData(),
                require('../tests_mocks/output3'));
        });

        it('order by + reformat data', function () {
            let res = new RepaikResponce(knowJson);
            // console.log(JSON.stringify(
            //     res.reformateData(reformatDataInputData).orderBy('domain').reformateData(reformatDataOrderedData).getData()
            // ));
            assert.deepEqual(
                res.reformateData(reformatDataInputData).orderBy('domain').reformateData(reformatDataOrderedData).getData(),
                require('../tests_mocks/output4'));
        });

        it('order by + group by', function () {
            let res = new RepaikResponce(knowJson);
            // console.log(JSON.stringify(
            //     res.reformateData(reformatDataInputData).orderBy('domain').groupBy('domain').getData()
            // ));
            assert.deepEqual(
                res.reformateData(reformatDataInputData).orderBy('domain').groupBy('domain').getData(),
                require('../tests_mocks/output5'));
        });

        it('order by + group by', function () {
            let res = new RepaikResponce(knowJson);
            // console.log(JSON.stringify(
            //     res
            //         .reformateData(reformatDataInputData)
            //         .orderBy('domain')
            //         .groupBy('domain')
            //         .reformateData(reformatDataGroupedData)
            //         .getData()
            // ));
            assert.deepEqual(
                res
                    .reformateData(reformatDataInputData)
                    .orderBy('domain')
                    .groupBy('domain')
                    .reformateData(reformatDataGroupedData)
                    .getData(),
                require('../tests_mocks/output6'));
        });

    });


});