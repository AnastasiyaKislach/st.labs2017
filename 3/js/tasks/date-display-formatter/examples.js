
(function () {

    var dates = [
        {
            date: "31102011",
            inputFormat: "",
            outpuFormat: ""
        },
       {
           date: "10/30/2011",
           outpuFormat: "dddd, MMMM d  yyyy"
       },
       {
           date: "20130431",
           inputFormat: "yyyyMMdd",
           outpuFormat: "MM-dd-yyyy hh:mm:ss"
       },
        {
            date: "Thu Jun 04 2015",
            inputFormat: "",
            outpuFormat: "dd.MM.yyyy"
        },
        {
            date: "04312013 19:16",
            inputFormat: "MMddyyyy",
            outpuFormat: ""
        },
       {
           date: "10/30/11",
           inputFormat: "MM/d/yy"
       }
    ];

    var date = {
        date: new Date("21 May 1989 19:16:00"),
        inputFormat: "MMddyyyy hh:mm:ss",
        outpuFormat: "MM-dd-yyyy hh:mm:ss"
    }

    console.log("1. Разработать объект для форматирования дат ");

    var res, i = 0, string;

    for (i = 0; i < dates.length; i++) {
        res = dateDisplayFormatter.format(dates[i].date, dates[i].inputFormat, dates[i].outpuFormat);
        string = '(\'' + dates[i].date + '\'';
        if (dates[i].inputFormat) {
            string += ', \'' + dates[i].inputFormat + '\'';
        }
        if (dates[i].outpuFormat) {
            string += ', \'' + dates[i].outpuFormat + '\'';
        }
        string += ') => ';

        console.log(string + res);
    }
    string = '';

    res = dateDisplayFormatter.dateFormat(date.date, date.outpuFormat);
    string = '(\'' + date + '\'';
    if (dates.outpuFormat) {
        string += ', \'' + dates.outpuFormat + '\'';
    }
    string += ') => ';
    console.log(string + res);

    var dateFrom = "04/07/2015";
    var dateTo = "07/25/2019";
    res = dateDisplayFormatter.from(dateFrom, dateTo);
    console.log(dateFrom + ' to ' + dateTo + ': ' + res);

    dateFrom = "04/07/2015";
    dateTo = "01/05/2017";
    res = dateDisplayFormatter.from(dateFrom, dateTo);
    console.log(dateFrom + ' to ' + dateTo + ': ' + res);


    dateFrom = "04/07/2015";
    res = dateDisplayFormatter.fromNow(dateFrom);
    console.log(dateFrom + 'to now' + ': ' + res);



    console.log("\n");
})();




//("2013-04-31", "YYYY-MM-DD").fromNow()



//1.	"31102011" => "31-10-2011"
//2.	"31102011" => "31 October 2011"
//3.	("20130431", "YYYYMMDD") => 31 April 2013
//4.	("20130431", "YYYYMMDD", "MM-DD-YYYY") => 04-31-2013
//5.	("2013-04-31", "YYYY-MM-DD").fromNow() => 2 years ago