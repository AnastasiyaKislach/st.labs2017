﻿(function () {
    'use strict';

    var car = {
        color: "red",
        wheels: 4,
        engine: {
            cylinders: {
                count: 4,
                radius: {
                    76: 90
                },
                height: [86, 8, 8]
            },
            size: 2.2,
            new: [12, '23ii423', { aiibc: 10 }, ['test', 'piing']],
        },
        state: "stopped"
    };

    console.log(depthFirstSearch.search(car, "car", "ii").toString());
    console.log(depthFirstSearch.search(car, "car", "st").toString());
    console.log(depthFirstSearch.search(car, "car", "8").toString());
})();


/*
 * 
 Объект для тестов
 var car = {
    color: "red",
    wheels: 4,
    engine: {
        cylinders: {
            count : 4, 
            radius : {
                76 : 90
            },
            height : [86, 8, 8]
        },
        size: 2.2,
        new : [12,'23ii423', {aiibc:10}, ['test', 'piing']],
    },

    state: "stopped"
};
 * 
 * 
 Ожидаемый результат для поиска по ii:
{"value":"23ii423","path":"engine.new.[1].", type:"value"},
{"key":"aiibc","value":10,"type":"key","path":"engine.new.[2].aiibc."},
{"value":"piing","path":"engine.new.[3].[1].", type:"value"}
 * 
 */
