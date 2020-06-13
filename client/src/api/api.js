import _ from 'lodash';
import request from 'axios'

let originBaseUrl;

if (process.env.NODE_ENV !== 'production') {
    originBaseUrl = 'http://localhost';
} else {
    originBaseUrl = 'http://smartcontroller.local:8000';
}


class Api {
    constructor() {
        this._baseUrl = originBaseUrl;
        this.options = {}
    }

    setBaseUrl = (newUrl) => {
        this._baseUrl = newUrl
    }

    createModel = (modelName, baseParams, extentions) => {
        return new ApiModel(
            modelName, 
            this.options, 
            this._baseUrl, 
            baseParams,
            extentions
        )
    }
}

class ApiModel {
    constructor(
        modelName, 
        options, 
        baseUrl, 
        baseParams,
        extentions
    ) {
        this.modelName = modelName;
        this.options = _.clone(options)
        this.options.baseParams = baseParams;
        this.extentions = extentions;
        if (baseUrl.slice(-1) === '/') {
            if (options.trailingChar) {
                this._baseUrl= baseUrl + this.modelName + options.trailingChar;
            } else {
                this._baseUrl = baseUrl + this.modelName;
            }
        } else {
            if (options.trailingChar) {
                this._baseUrl= baseUrl + '/' + this.modelName + options.trailingChar;
            } else {
                this._baseUrl = baseUrl + '/' + this.modelName;
            }
        }
    }

    getAll = (params, nestedName) => {
        return request({
            method: 'GET',
            params: _.extend(params, this.options.baseParams),
            withCredentials: true,
            credentials: 'same-origin',
            crossdomain: true,
            url: nestedName ? this._baseUrl + nestedName + this.options.trailingChar : this._baseUrl,
            headers: this.options.headers,
            xsrfCookieName: this.options.xsrfCookieName ? this.options.xsrfCookieName : 'XSRF-TOKEN', 
            xsrfHeaderName: this.options.xsrfHeaderName ? this.options.xsrfHeaderName : 'X-XSRF-TOKEN',
        }).then((response) => {
            if (this.extentions) {
                _.forEach(response.data, (item) => {
                    _.extend(item, this.extentions);
                })
            }

            return response.data;
        })
    }

    get = (id, params) => {
        return request({
            method: 'GET',
            params: _.extend(params, this.options.baseParams),
            withCredentials: true,
            credentials: 'same-origin',
            crossdomain: true,
            url: this._baseUrl + id + this.options.trailingChar,
            headers: this.options.headers,
            xsrfCookieName: this.options.xsrfCookieName ? this.options.xsrfCookieName : 'XSRF-TOKEN', 
            xsrfHeaderName: this.options.xsrfHeaderName ? this.options.xsrfHeaderName : 'X-XSRF-TOKEN',
        }).then((response) => {

            if (this.extentions) {
                _.extend(response.data, this.extentions);
            }

            return response.data;
        });
    }

    post = (data, nestedName, params) => {
        return request({
            method: 'POST',
            params: _.extend(params, this.options.baseParams),
            withCredentials: true,
            credentials: 'same-origin',
            crossdomain: true,
            url: nestedName ? this._baseUrl + nestedName + this.options.trailingChar : this._baseUrl,
            headers: this.options.headers,
            xsrfCookieName: this.options.xsrfCookieName ? this.options.xsrfCookieName : 'XSRF-TOKEN', 
            xsrfHeaderName: this.options.xsrfHeaderName ? this.options.xsrfHeaderName : 'X-XSRF-TOKEN',
            data: data,
        }).then((response) => {
            if (this.extentions) {
                _.extend(response.data, this.extentions);
            }

            return response.data;
        });
    }

    put = (data, nestedName, params) => {
        return request({
            method: 'PUT',
            params: _.extend(params, this.options.baseParams),
            withCredentials: true,
            credentials: 'same-origin',
            crossdomain: true,
            url: nestedName ? this._baseUrl + nestedName + this.options.trailingChar : this._baseUrl,
            headers: this.options.headers,
            xsrfCookieName: this.options.xsrfCookieName ? this.options.xsrfCookieName : 'XSRF-TOKEN', 
            xsrfHeaderName: this.options.xsrfHeaderName ? this.options.xsrfHeaderName : 'X-XSRF-TOKEN',
            data: data,
        }).then((response) => {

            if (this.extentions) {
                _.extend(response.data, this.extentions);
            }

            return response.data;
        });
    }
    
    delete = (params) => {
        return request({
            method: 'DELETE',
            params: _.extend(params, this.options.baseParams),
            withCredentials: true,
            credentials: 'same-origin',
            crossdomain: true,
            url: this._baseUrl,
            headers: this.options.headers,
            xsrfCookieName: this.options.xsrfCookieName ? this.options.xsrfCookieName : 'XSRF-TOKEN', 
            xsrfHeaderName: this.options.xsrfHeaderName ? this.options.xsrfHeaderName : 'X-XSRF-TOKEN',
        })
    }

    one = (id) => {
        return new ApiModel(
            id, 
            this.options, 
            this._baseUrl, 
            this.options.baseParams, this.extentions
        )
    }
}

const api = new Api();

api.options.xsrfCookieName = 'csrftoken';
api.options.xsrfHeaderName = 'X-CSRFToken'
api.options.trailingChar = '/'
api.setBaseUrl(originBaseUrl + '/api/')

export {api, originBaseUrl};