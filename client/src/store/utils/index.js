import _ from 'lodash';

var transformToObject = (list) => {
    let results = {};
    _.forEach(list, (item) => {
        results[item.id] = item;
    })
    return results;
}

var removeDuplicates = (list) => {
    return _.uniqBy(list, 'id');
}

var replaceInArray = (item, list) => {
    let index = _.findIndex(list, (listItem) => {
        return listItem.id === item.id;
    });
    list[index] = item;
}

export {transformToObject};
export {replaceInArray};
export {removeDuplicates};