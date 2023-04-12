var WIKI_API_URL = "https://fr.wikipedia.org/w/api.php";
var titleMarker;
function getWikiParseText(text, callback) {
    $.ajax({
        url: WIKI_API_URL + "?action=parse&page=" + text + "&prop=text&format=json&formatversion=2&origin=*",
        dataType: 'jsonp',
        success: function (data) {
            var parseText = data.parse?.text;
            callback(parseText); // appel de la fonction de rappel avec les données récupérées
        },
        error: function (error) {
            console.log(error)
        }

    })
};

function selectAllBaA(text) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');


    listLink = Array.from(doc.querySelectorAll('a[title]:not([class]):not([title*="Aide:"]):not([title*="Portail"]):not([title*="Modifier la section"]):not([title*="Spécial:"]):not([title*="Wikipédia:"]):not([title*="Modèle:"]):not([title^="[0-9]*$"])'))
    .filter(function (link, index, self) {
        return index === self.findIndex(function (l) {
            return l.getAttribute('title') === link.getAttribute('title');
        });
    });

    return listLink;
}

function BaAtoInfo(BaA, listFinal) {
    if (BaA.title) {
        listFinal.add(BaA.title);
    }
}

function lenListLink(list) {
    return list.size
}

function displayTitle(list) {
    for (let i = 0; i < list.length; i++) {
        console.log(list[i].title);
    }
}

function callbackIfCoordinate(list, callback) {
    list.forEach(function (data) {
        $.ajax({
            url: WIKI_API_URL + "?action=parse&page=" + data.title + "&prop=text&format=json&formatversion=2&origin=*",
            dataType: 'jsonp',
            success: function (data) {
                let parser = new DOMParser();
                let htmlData = parser.parseFromString(data.parse?.text, 'text/html');
                var doc = htmlData.querySelectorAll('a');


                doc.forEach(function (balise) {
                    var latitude = balise.getAttribute('data-lat');
                    var longitude = balise.getAttribute('data-lon');
                    var title = data.parse.title;

                    if (latitude && longitude) {
                        callback(latitude, longitude, title);

                    }
                })

            },
            error: function (error) {
                console.log(error);
            }
        })
    })

}

function createListSugg(divInput, divList) {

    var query = $("#" + divInput).val().toLowerCase().trim();
    var divInput = $("#" + divInput);
    var divList = $("#" + divList);
    var previousResults = null;

    divList.empty();
    suggestionItem = "";

    if (query.length === 0) {

            divInput.empty();

    }





    $.ajax({
        url: WIKI_API_URL,
        data: {
            action: "opensearch",
            search: query,
            format: "json",
            limit: 10
        },
        dataType: "jsonp",
        success: function (data) {
            var suggestions = data[1];

        $("#searchInput").on('keydown', function (event){
            if (event.key === "Delete"){
                if (previousResults === null ) {
                    $searchResults.empty();
                } else {
                    $searchResults.html(previousResults);
                }
            }
            })

            

            if (suggestions) { // Vérifier si la variable "suggestions" est définie
                suggestions.forEach(function (suggestion) {
                    var suggestionItem = $("<li style='background-color: white; font-size: 12px;box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.2);;' ></li>");
                    suggestionItem.text(suggestion);
                    divList.append(suggestionItem);
                });
                previousResults = divList;
            }
        },
        error: function () {
            console.log(error)
        }
    });




}

function getWikiPageInDiv(mainPage, title){

    $.ajax({
        url: WIKI_API_URL + "?action=parse&page=" + title + "&prop=text&format=json&formatversion=2&origin=*",
        dataType: 'jsonp',
        success: function (data) {
           
                $('#'+mainPage).html(data.parse.text)
        },
        error: function (error) {
            console.log(error);
        }
    })
}