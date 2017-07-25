(function (global) {
    'use strict';

    global.dateDisplayFormatter = global.dateDisplayFormatter || new DateDisplayFormatter();


    function DateDisplayFormatter() {
        var self = this;

        self.format = format;
        self.parseDate = parseDate;
        self.dateFormat = dateFormat;
        self.from = from;
        self.fromNow = fromNow;

        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var daysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
       
        var formats = {
            short: "MM/d/yy",
            utc: "ddd MMM dd yyyy",
            full: "dddd, MMMM d, yyyy",
            local: "dd.MM.yyyy",
            isoWithoutDay: "yyyy-MM",
            isoFull: "yyyyMMdd",
            isoStandart: "yyyy-MM-dd"
        };
        var partOfDate = {
            day: {
                name: "d",
                regex: /[d]+/gi
            },
            month: {
                name: "M",
                regex: /[M]+/gi
            },
            year: {
                name: "y",
                regex: /[y]+/gi
            }
        };

        function format(date, inputFormat, outputFormat) {
            if (!date) {
                return undefined;
            }

            var formattedDate;

            var type = typeof (date);

            if (type === "number") {
                date = Math.abs(date);
                formattedDate = new Date(date * 1000);
            } else {
                formattedDate = self.parseDate(date, inputFormat);
            }
            if (!formattedDate) {
                return "Invalid date or inputFormat";
            }
            formattedDate = self.dateFormat(formattedDate, outputFormat);
            return formattedDate;
        }

        function parseDate(date, inputFormat) {
            var day, month, year;
            var parsedDate = Date.parse(date);

            if (!inputFormat && isNaN(parsedDate)) {
                return NaN;
            }

            if (!isNaN(parsedDate)) {;
                return new Date(parsedDate);
            }

            if (!inputFormat) {
                return undefined;
            }


            var regex = /[-./]/g;
            var arr = inputFormat.match(regex);
            if (!arr) {
                day = getPartOfDate(date, inputFormat, null, partOfDate.day.name, partOfDate.day.regex);
                month = getPartOfDate(date, inputFormat, null, partOfDate.month.name, partOfDate.month.regex);
                year = getPartOfDate(date, inputFormat, null, partOfDate.year.name, partOfDate.year.regex);
            } else {
                arr = inputFormat.split(/[-./]/g);
                arr = arr.sort();

                day = getPartOfDate(date, inputFormat, arr[0], "d");
                month = getPartOfDate(date, inputFormat, arr[1], "M");
                year = getPartOfDate(date, inputFormat, arr[2], "y");
            }

            var newDate = new Date(year, month - 1, day);

            return newDate;

        }

        function getPartOfDate(date, inputFormat, item, part, regex) {
            var pos = inputFormat.search(part);//
            if (regex) {

                item = inputFormat.match(regex)[0];
            }
            var subdate = date.substr(pos, item.length);//
            var partOfDate = parseInt(subdate);
            return partOfDate;
        }

        function dateFormat(date, outputFormat) {

            var formattedDate;

            var dayNum = date.getDay();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();

            var formatFromDate = {
                d: day,
                dd: padding(day, 2),
                ddd: daysShort[dayNum],
                dddd: days[dayNum],
                M: month,
                MM: padding(month, 2),
                MMM: monthsShort[month],
                MMMM: months[month],
                yyyy: year,
                yy: padding(year, -2),
                h: hours,
                hh: padding(hours, 2),
                m: minutes,
                mm: padding(minutes, 2),
                s: seconds,
                ss: padding(seconds, 2)
            };

            if (!outputFormat) {
                outputFormat = formats.isoStandart;
            }
            outputFormat = String(formatFromDate[outputFormat] || outputFormat || formatFromDate[outputFormat]);

            var token = /d{1,4}|M{1,4}|yy(?:yy)?|([hmsTt])\1?|"[^"]*"|'[^']*'/g;

            return outputFormat.replace(token, function (pattern) {

                var result = pattern in formatFromDate
                    ? formatFromDate[pattern]
                    : pattern.slice(1, pattern.length - 1);

                return result;
            });
        }

        function from(dateFrom, dateTo) {

            dateFrom = new Date(dateFrom);
            dateTo = new Date(dateTo);


            var secondsDateFrom = dateFrom.getTime();
            var secondsDateTo = dateTo.getTime();

            var deltaTime = secondsDateTo - secondsDateFrom;

            var delta = deltaTime;
            if (delta < 0) {
                delta = Math.abs(delta);
                var dopDate = dateFrom;
                dateFrom = dateTo;
                dateTo = dopDate;
            }
            if (delta === 0) {
                return 0;
            }

            var years, months, days, hours, minutes, seconds, milliSeconds;

            days = ((delta / 1000) / 3600) / 24;
            days = Math.round(days);

            delta = delta - days * 1000 * 3600 * 24;

            if (delta > 0 && delta >= deltaTime * 0.2) {

                hours = (delta / 1000) / 3600;
                hours = Math.round(hours);
                delta = delta - hours * 1000 * 3600;

                if (delta > 0 && delta >= deltaTime * 0.2) {

                    minutes = (delta / 1000) / 60;
                    minutes = Math.round(minutes);

                    delta = delta - minutes * 1000 * 60;

                    if (delta > 0 && delta >= deltaTime * 0.2) {
                        seconds = (delta / 1000);
                        seconds = Math.round(seconds);

                        if (delta > 0 && delta >= deltaTime * 0.2) {
                            milliSeconds = delta - seconds * 1000;
                        }
                        milliSeconds = delta - seconds * 1000;
                    }
                }
            }
            if (days >= 365) {
                years = Math.floor(days / 365);
                var visoc = 0;
                for (var i = dateFrom.getFullYear() ; i < dateTo.getFullYear() ; i++) {
                    if (i % 4 === 0) {
                        visoc += 1;
                    }
                }
                days = days - (years - visoc) * 365 - visoc * 366;
            } else {
                years = 0;
            }

            months = Math.floor(days / 30);
            days = days % 30;

        var obj = {
            year: years,
            month: months,
            day: days,
            hours: hours || 0,
            minutes: minutes || 0,
            seconds: seconds || 0,
            milliseconds: milliSeconds || 0
        };

        var s = (obj.year ? (obj.year + " г. ") : "")
                   + (obj.month ? (obj.month + " мес. ") : "")
                       + (obj.day ? (obj.day + " дн. ") : "")
                          + (obj.hours ? (obj.hours + " ч. ") : "")
                              + (obj.minutes ? (obj.minutes + " мин. ") : "")
                                  + (obj.seconds ? (obj.seconds + " с. ") : "")
                                        + (obj.milliseconds ? (obj.milliseconds + " мс. ") : "");
        return s;
    }

    function fromNow(dateFrom) {
        var now = new Date();
        return self.from(dateFrom, now);
    }

    function padding(num, paddingValue) {
        var s = String(num);
        if (paddingValue > 0) {
            while (s.length < (paddingValue || 2)) {
                s = "0" + s;
            }
        } else {
            while (s.length > (Math.abs(paddingValue) || 2)) {
                s = s.slice(-2);
            }
        }

        return s;
    }

    function getCountDaysOfMonth(year, month) { // month in [0..11]
        return new Date(year, month + 1, 0).getDate();
    }

    function getCountDaysBetWeenMonths(year, monthTo, monthFrom) {
        var days = 0;
        for (var i = monthFrom; i <= monthTo; i++) {
            days += getCountDaysOfMonth(year, i);
        }
        return days;
    }

    function getCountDaysBetWeenYears(yearTo, yearFrom) {
        var days = 0;
        for (var i = yearFrom; i < yearTo; i++) {
            days += self.getCountDaysBetWeenMonths(i, 11, 0);
        }
        return days;
    }

    function getCountDaysOfYear(year) { // month in [0..11]
        var days = 0;
        for (var i = 0; i < 12; i++) {
            days += new Date(year, i + 1, 0).getDate();
        }
        return days;
    }
}
})(this);