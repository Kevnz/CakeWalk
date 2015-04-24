'use strict';
import request from 'superagent';
import ActionCreators from '../actions/action-creators';

const PICTURES_URI = '/api/pictures';

export default {
    getAllPictures: function () {
        request.get(PICTURES_URI)
            .end((err, res) => {
                ActionCreators.receivePictures(res.body);
            });
    },
    getProduct: function (id) {
        request.get(PICTURES_URI + '/' + id)
            .end((err, res) => {
                ActionCreators.receiveProduct(res.body);
            });
    }
};