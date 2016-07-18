'use strict';
import rp from 'request-promise';
import RepaikResponce from './response';

class Repaik {
    request(jsonUrl) {
        var options = {
            uri: jsonUrl,
            json: true
        };
        return rp(options)
            .then((res) => {
                return new RepaikResponce(res);
            })
            .catch((e) => {
                throw new Error(e);
            })
    }
}

module.exports = Repaik;