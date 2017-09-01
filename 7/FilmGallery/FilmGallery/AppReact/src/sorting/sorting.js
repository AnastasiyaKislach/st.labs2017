export function orderById(list) {
    var filteredList = list.sort(
        function sortFunction(film1, film2) {
            if (film1.id < film2.id)
                return -1;
            if (film1.id > film2.id)
                return 1;
            return 0;
        });

    return filteredList;
}

export function orderByName(list) {
    var filteredList = list.sort(
        function sortFunction(film1, film2) {
            if (film1.name < film2.name)
                return -1;
            if (film1.name > film2.name)
                return 1;
            return 0;
        });

    return filteredList;
}

export function orderByRating(list) {
    var filteredList = list.sort(
        function sortFunction(film1, film2) {
            if (film1.rate > film2.rate)
                return -1;
            if (film1.rate < film2.rate)
                return 1;
            return 0;
        });

    return filteredList;
}
