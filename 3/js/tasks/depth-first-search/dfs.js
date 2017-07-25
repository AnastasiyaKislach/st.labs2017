(function (global) {
    'use strict';

    global.depthFirstSearch = global.depthFirstSearch || new DepthFirstSearch();

    function DepthFirstSearch() {

        var self = this;

        self.showNodes = showNodes;
        self.search = search;
        self.print = print;

        function showNodes(tree, treeName) {
            var result = "";
            for (var i in tree) {
                if (tree.hasOwnProperty(i)) {
                    if (typeof (tree[i]) === "object") {
                        showNodes(tree[i], treeName + "." + i);
                    } else {
                        result += treeName + "." + i + " = " + tree[i] + "\n";
                    }
                }
            }
            console.log(result);
        };

        function search(tree, treeName, searchValue) {

            var searchArr = [];

            (function nodesRecurs(tree, treeName, searchValue) {
                for (var i in tree) {
                    if (tree.hasOwnProperty(i)) {
                        if (typeof (tree[i]) === "object") {
                            nodesRecurs(tree[i], treeName + "." + i, searchValue);
                        } else {
                            if (String(tree[i]).indexOf(searchValue) >= 0) {//value
                                searchArr.push({
                                    path: treeName + "." + i,
                                    value: tree[i],
                                    type: 'value'
                                });
                            }
                            if (String(i).indexOf(searchValue) >= 0) {//key
                                searchArr.push({
                                    key: i,
                                    path: treeName + "." + i,
                                    value: tree[i],
                                    type: 'key'
                                });
                            }
                        }
                    }
                }
            })(tree, treeName, searchValue);

            return searchArr;
        };

        function print(array) {
            if (array && array.length) {
                array.toString();
            }
        };

    }
})(this);