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
        var dateType = ["string", "number"];
        var formats = {
            short: "mm/d/yyyy",
            long: "dd mmmm yyyy",
            utc: "ddd mmm dd yyyy",
            full: "dddd, mmmm d  yyyy",
            local: "dd.mm.yyyy",
            isoWithoutDay: "YYYY-MM",
            isoFull: "YYYYMMDD",
            isoStandart: "YYYY-MM-DD"
        };
        var partOfDate = {
            day: {
                name: "D",
                regex: /[D]+/gi
            },
            month: {
                name: "M",
                regex: /[M]+/gi
            },
            year: {
                name: "Y",
                regex: /[Y]+/gi
            }
        };

        function format(date, inputFormat, outputFormat) {
            if (!date) {
                return undefined;
            }

            var formattedDate = 0;

            var type = typeof (date);
            if (type === "string") {
                var dateParsed = self.parseDate(date, inputFormat);
                formattedDate = self.dateFormat(dateParsed, outputFormat);
            }
            if (type === "number") {
                date = Math.abs(date);
                var newDate = new Date(date * 1000);
                formattedDate = self.dateFormat(newDate, outputFormat);
            }

            return formattedDate;
        }

        function parseDate(date, inputFormat) {
            var parsedDate;
            var day, month, year;
            var newDate2;//

            if (!inputFormat) {
                parsedDate = Date.parse(date);
                if (!parsedDate) {
                    return undefined;
                } else {
                    var newDate = new Date(parsedDate);
                    return newDate;
                }
            } else {
                inputFormat = inputFormat.toUpperCase();
                var regex = /[-./]/g;
                var arr = inputFormat.match(regex);
                if (!arr) {
                    day = parsedPartOfDateRegex(date, inputFormat, partOfDate.day.name, partOfDate.day.regex);
                    month = parsedPartOfDateRegex(date, inputFormat, partOfDate.month.name, partOfDate.month.regex);
                    year = parsedPartOfDateRegex(date, inputFormat, partOfDate.year.name, partOfDate.year.regex);
                } else {
                    arr = inputFormat.split(/[-./]/g);
                    arr = arr.sort();

                    day = parsedPartOfDate(date, inputFormat, arr[0], "D");
                    month = parsedPartOfDate(date, inputFormat, arr[1], "M");
                    year = parsedPartOfDate(date, inputFormat, arr[2], "Y");
                }

                newDate2 = new Date(year, month - 1, day);

                return newDate2;
            }
        }

         function parsedPartOfDate(date, inputFormat, item, part) {
            var length = item.length;
            var pos = inputFormat.search(part);
            var fromDate = date.substr(pos, length);
            var partOfDate = parseInt(fromDate);
            return partOfDate;
        }

         function parsedPartOfDateRegex (date, inputFormat, part, regex) {
            var pos = inputFormat.search(part);
            var item = inputFormat.match(regex)[0];
            var subdate = date.substr(pos, item.length);
            var partOfDate = parseInt(subdate);
            return partOfDate;
        }

        function dateFormat(date, outputFormat) {
            var self = this;
            var formattedDate = "";

            var dayNum = date.getDay();
            var day = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();

            var formatFromDate = {
                d: day,
                dd: padLeft(day, 2),
                ddd: daysShort[dayNum],
                dddd: days[dayNum],
                M: month,
                MM: padLeft(month, 2),
                MMM: monthsShort[month],
                MMMM: months[month],
                YY: year,
                yyyy: year
            };
            if (!outputFormat) {
                outputFormat = formats.isoStandart;
            }
            switch (outputFormat) {
                case formats.short:
                    {
                        formattedDate = "" + formatFromDate.mm + "/" + formatFromDate.d + "/" + formatFromDate.yyyy;
                        return formattedDate;
                    }
                case formats.long:
                    {
                        formattedDate = "" + formatFromDate.dd + " " + formatFromDate.mmmm + " " + formatFromDate.yyyy;
                        return formattedDate;
                    }
                case formats.utc:
                    {
                        formattedDate = "" + formatFromDate.ddd + " " + formatFromDate.mmm +
                            " " + formatFromDate.dd + " " + formatFromDate.yyyy;
                        return formattedDate;
                    }
                case formats.full:
                    {
                        formattedDate = "" + formatFromDate.dddd + ", " + formatFromDate.mmmm +
                            " " + formatFromDate.d + " " + formatFromDate.yyyy;
                        return formattedDate;
                    }
                case formats.local:
                    {
                        formattedDate = "" + formatFromDate.dd + "." + formatFromDate.mm +
                            "." + formatFromDate.yyyy;
                        return formattedDate;
                    }
                case formats.isoWithoutDay:
                    {
                        formattedDate = "" + formatFromDate.yyyy + "-" + formatFromDate.mm;
                        return formattedDate;
                    }
                case formats.isoFull:
                    {
                        formattedDate = "" + formatFromDate.yyyy + formatFromDate.mm + formatFromDate.dd;
                        return formattedDate;
                    }
                default:
                    {
                        outputFormat = outputFormat.toUpperCase();
                        var regex = /[-./]/g;
                        var match = outputFormat.match(regex);
                        if (!match) {
                            //????
                        } else {
                            var arr = outputFormat.split(/[-./]/g);

                            for (var i = 0; i < 3; i++) {
                                if (arr[i].search("Y") >= 0) {
                                    formattedDate += year;
                                    if (i !== 2) {
                                        formattedDate += match[0];
                                    }
                                } else if (arr[i].search("M") >= 0) {
                                    month = arr[i].length === 4 ? formatFromDate.mmmm
                                                : arr[i].length === 3 ? formatFromDate.mmm
                                                : arr[i].length === 2 ? formatFromDate.mm
                                                : formatFromDate.m;
                                    formattedDate += month;
                                    if (i !== 2) {
                                        formattedDate += match[0];
                                    }
                                } else {
                                    day = arr[i].length === 4 ? formatFromDate.dddd
                                                 : arr[i].length === 3 ? formatFromDate.ddd
                                                 : arr[i].length === 2 ? formatFromDate.dd
                                                 : formatFromDate.d;
                                    formattedDate += day;
                                    if (i !== 2) {
                                        formattedDate += match[0];
                                    }
                                }

                            }
                        }

                        return formattedDate;
                    }
            }
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

            var years, months;

            var days = ((delta / 1000) / 3600) / 24;
            days = Math.round(days);

            delta = delta - days * 1000 * 3600 * 24;

            if (delta > 0 && delta >= deltaTime * 0.2) {

                var hours = (delta / 1000) / 3600;
                hours = Math.round(hours);
                delta = delta - hours * 1000 * 3600;

                if (delta > 0 && delta >= deltaTime * 0.2) {

                    var minutes = (delta / 1000) / 60;
                    minutes = Math.round(minutes);

                    delta = delta - minutes * 1000 * 60;

                    if (delta > 0 && delta >= deltaTime * 0.2) {
                        var seconds = (delta / 1000);
                        seconds = Math.round(seconds);

                        if (delta > 0 && delta >= deltaTime * 0.2) {

                            var milliSeconds = delta - seconds * 1000;
                        }
                        var milliSeconds = delta - seconds * 1000;
                    }
                }
            }
            if (days >= 365) {
                years = Math.floor(days / 365);
                var visoc = 0;
                for (var i = dateFrom.getFullYear(); i < dateTo.getFullYear(); i++) {
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

            var s = obj.year + " г. " + obj.month + " мес. "
                + obj.day + " дн. " + obj.hours + " ч. " + obj.minutes + " м. ";
            return s;
        }

         function fromNow(dateFrom) {
            var now = new Date();
            return self.from(dateFrom, now);
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

        function padLeft(num, size) {
            var s = String(num);
            while (s.length < (size || 2)) {
                s = "0" + s;
            }
            return s;
        }

    }
})(this);