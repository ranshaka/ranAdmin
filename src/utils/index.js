export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
                // support "1548221490638"
                time = parseInt(time)
            } else { 
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        return value.toString().padStart(2, '0')
    })
    return time_str
}

export function Guid(){
    var guid = "";
    for (var i = 1; i <= 32; i++){
      var n = Math.floor(Math.random()*16.0).toString(16);
      guid +=   n;
      if((i==8)||(i==12)||(i==16)||(i==20))
        guid += "-";
    }
    return guid;    
}
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * 深拷贝
 * @param data
 */
 export function cloneDeep(data) {
    return JSON.parse(JSON.stringify(data));
}

/**
 * 树转数组
 * @param tree
 * @param hasChildren
 */
export function treeToList(tree, hasChildren) {
    if (hasChildren === void 0) {
        hasChildren = false;
    }
    var queen = [];
    var out = [];
    queen = queen.concat(JSON.parse(JSON.stringify(tree)));
    while (queen.length) {
        var first = queen.shift();
        if (first === null || first === void 0 ? void 0 : first.children) {
            queen = queen.concat(first.children);
            if (!hasChildren)
                delete first.children;
        }
        out.push(first);
    }
    return out;
}

/**
 * 数组转树
 * @param list
 * @param tree
 * @param parentId
 * @param key
 */
export function listToTree(list, tree, parentId, key) {
    if (parentId === void 0) {
        parentId = 0;
    }
    if (key === void 0) {
        key = 'parentId';
    }
    list.forEach(function (item) {
        var _a;
        if (item[key] === parentId) {
            var child = __assign(__assign({}, item), {
                children: []
            });
            listToTree(list, child.children, item.id, key);
            if (!((_a = child.children) === null || _a === void 0 ? void 0 : _a.length))
                delete child.children;
            tree.push(child);
        }
    });
    return tree;
}

/**
 * 获取树节点 key 列表
 * @param treeData
 */
export function getTreeKeys(treeData) {
    var list = treeToList(treeData);
    return list.map(function (item) {
        return item.key;
    });
}

/**
 * 循环遍历出最深层子节点，存放在一个数组中
 * @param deepList
 * @param treeData
 */
export function getDeepList(deepList, treeData) {
    treeData === null || treeData === void 0 ? void 0 : treeData.forEach(function (item) {
        var _a;
        if ((_a = item === null || item === void 0 ? void 0 : item.children) === null || _a === void 0 ? void 0 : _a.length) {
            getDeepList(deepList, item.children);
        } else {
            deepList.push(item.key);
        }
    });
    return deepList;
}

/**
 * 将后台返回的含有父节点的数组和第一步骤遍历的数组做比较,如果有相同值，将相同值取出来，push到一个新数组中
 * @param uniqueArr
 * @param arr
 */
export function uniqueTree(uniqueArr, arr) {
    var uniqueChild = [];
    for (var i in arr) {
        for (var k in uniqueArr) {
            if (uniqueArr[k] === arr[i]) {
                uniqueChild.push(uniqueArr[k]);
            }
        }
    }
    return uniqueChild;
}

/**
 * 是否选中
 * @param selectedKeys
 * @param eventKey
 */
export function isChecked(selectedKeys, eventKey) {
    return selectedKeys.indexOf(eventKey) !== -1;
}

/**
 * 处理左侧树数据
 * @param data
 * @param targetKeys
 * @param direction
 */
export function handleLeftTreeData(data, targetKeys, direction) {
    if (direction === void 0) {
        direction = 'right';
    }
    data.forEach(function (item) {
        if (direction === 'right') {
            item.disabled = targetKeys.includes(item.key);
        } else if (direction === 'left') {
            if (item.disabled && targetKeys.includes(item.key))
                item.disabled = false;
        }
        if (item.children)
            handleLeftTreeData(item.children, targetKeys, direction);
    });
    return data;
}

/**
 * 处理右侧树数据
 * @param data
 * @param targetKeys
 * @param direction
 */
export function handleRightTreeData(data, targetKeys, direction) {
    console.log(data)
    console.log(targetKeys)
    if (direction === void 0) {
        direction = 'right';
    }
    var list = treeToList(data);
    var arr = [];
    var tree = [];
    list.forEach(function (item) {
        if (direction === 'right') {
            if (targetKeys.includes(item.key)) {
                var content = __assign({}, item);
                if (content.children)
                    delete content.children;
                arr.push(__assign({}, content));
            }
        } else if (direction === 'left') {
            if (!targetKeys.includes(item.key)) {
                var content = __assign({}, item);
                if (content.children)
                    delete content.children;
                arr.push(__assign({}, content));
            }
        }
    });
    listToTree(arr, tree, 0);
    return tree;
}

/**
 * 树数据展平
 * @param list
 * @param dataSource
 */
export function flatten(list, dataSource) {
    list.forEach(function (item) {
        dataSource.push(item);
        if (item.children)
            flatten(item.children, dataSource);
    });
    return dataSource;
}

export function formatDateTime (time=new Date(), format){
    let now=new Date(time)
    var year = now.getFullYear();
    ;
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month < 10) {
    month = '0' + month;
    }
    if (date < 10) {
    date = '0' + date;
    }
    if (hour < 10) {
    hour = '0' + hour;
    }
    if (minute < 10) {
    minute = '0' + minute;
    }
    if (second < 10) {
    second = '0' + second;
    }

    if(format=="HH"){
        return hour+":"+ minute
    }
    if(format=="HHmm"){
        return hour+":"+ minute+":"+second
    }
    if(format=="YYYY"){
        return year +"-"+ month+"-"+ date
    }
    return year +"-"+ month+"-"+ date+" "+ hour+":"+ minute+ ":" +second;
}