export function orderById(list) {
    var filteredList = list.sort(
        function sortFunction(film1, film2) {
            if (film1.Id < film2.Id)
                return -1;
            if (film1.Id > film2.Id)
                return 1;
            return 0;
        });

    return filteredList;
}

export function orderByName(list) {
    var filteredList = list.sort(
        function sortFunction(film1, film2) {
            if (film1.Name < film2.Name)
                return -1;
            if (film1.Name > film2.Name)
                return 1;
            return 0;
        });

    return filteredList;
}

export function orderByRating(list) {
    var filteredList = list.sort(
        function sortFunction(film1, film2) {
            if (film1.Rating > film2.Rating)
                return -1;
            if (film1.Rating < film2.Rating)
                return 1;
            return 0;
        });

    return filteredList;
}
