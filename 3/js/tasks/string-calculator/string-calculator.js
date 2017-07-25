(function (global) {

    'use strict';

    global.calculator = global.calculator || new Calculator();

    function Calculator() {
        var self = this;

        self.outputString = outputString;
        self.calculate = calculate;

        var operators = {
            '+': (x, y) => x + y,
            '-': (x, y) => x - y,
            '*': (x, y, denom) => ((x * y) / denom),
            '/': (x, y, denom) => ((x / y) * denom)
        };

        function isOperator(c) {
            return c === "+" || c === "-" || c === "*" || c === "/";
        };

        function getPriority(op) {
            switch (op) {
            case "(":
            case ")":
                return 0;
            case "+":
            case "-":
                return 1;
            case "*":
            case "/":
                return 2;
            //case "^":
            //    return 3;
            default:
                return 3;
            }
        };

        function outputString(expression) {

            expression = expression.replace(/\s*/g, '');

            var stackOpers = [];
            var out = [];

            for (var i = 0; i < expression.length; i++) {
                var c = expression[i];
                if (c === '(') {
                    stackOpers.push(c);
                    continue;
                }

                if (c === ')') {
                    while (stackOpers[stackOpers.length - 1] !== '(') {
                        var operator = stackOpers[stackOpers.length - 1];
                        out.push(operator);
                        stackOpers.pop();
                    }
                    stackOpers.pop();
                    continue;
                }

                if (isOperator(c)) {
                    if (stackOpers.length > 0) {
                        var oper = stackOpers[stackOpers.length - 1];
                        var priorC = getPriority(c);
                        var priorLast = getPriority(oper);
                        if (priorC > priorLast && (oper !== ("(" || ")"))) {
                            stackOpers.push(c);
                            continue;
                        }
                        if (priorLast > priorC) {
                            while (stackOpers.length > 0 && stackOpers[stackOpers.length - 1] !== "(") {
                                out.push(stackOpers[stackOpers.length - 1]);
                                stackOpers.pop();
                            }
                            stackOpers.push(c);
                            continue;
                        }
                        if (priorLast === priorC) {
                            out.push(oper);
                            stackOpers.pop();
                            stackOpers.push(c);
                            continue;
                        }
                    }
                    stackOpers.push(c);
                    continue;
                }

                var parse = parseInt(c);
                if (typeof (parse) === "number" && !isNaN(parse)) {
                    var k = i;
                    var str = "" + c;
                    while ((i + 1) < expression.length &&
                        !isOperator(expression[i + 1]) &&
                        (expression[i + 1] !== "(" && expression[i + 1] !== ")")) {
                        if (expression[i + 1] == "." || expression[i + 1] == ",") {
                            str += ".";
                            i++;
                            continue;
                        }
                        var p = parseInt(expression[i + 1]);
                        if (typeof (parse) === "number" && !isNaN(parse)) {
                            str += expression[i + 1];
                            i++;
                            continue;
                        }
                    }
                    if (i > k) {
                        str = parseFloat(str);
                        out.push(str);
                        continue;
                    }

                    c = parse;
                    out.push(c);
                    continue;
                } else {
                    return NaN;
                }
            }
            if (stackOpers.length > 0) {
                while (stackOpers.length > 0) {
                    out.push(stackOpers[stackOpers.length - 1]);
                    stackOpers.pop();
                }
            }

            return out;
        };

        function calculate(expression) {
            var stack = [];

            expression = self.outputString(expression);

            expression = expression.reverse();

            for (var i = expression.length - 1; i >= 0; i--) {

                while (!isOperator(expression[i])) {
                    stack.push(expression[i]);
                    expression.pop();
                    i--;
                }
                if (isOperator(expression[i])) {
                    var op1 = stack.pop();
                    var op2 = stack.pop();
                    var res;
                    var denom = floatDenom(op2, op1);
                    if (denom === 1) {
                        res = operators[expression[i]](op2, op1, 1);
                    } else {
                        res = operators[expression[i]](op2 * denom, op1 * denom, denom) / denom;
                    }

                    stack.push(res);
                    expression.pop();
                }
            }
            return stack[0];
        };

        function floatDenom(x, y) {
            var denominator = 10,
                regex = /[.]/g,
                power = 0;

            for (var i = 0; i < arguments.length; i++) {
                let argStr = String(arguments[i]);
                let index = argStr.search(regex);

                if (index > 0) {
                    let length = argStr.length;
                    var pow = length - index - 1;

                    if (pow > power) {
                        power = pow;
                    }
                }

            }
            denominator = Math.pow(denominator, power);

            return denominator;
        };
    }
})(this);
