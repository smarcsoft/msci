function populate_msci_indexes()
{
    console.log("Calling index master MSCI API to get the list of indexes");
    var request = new XMLHttpRequest();
    var toReturn = new Array();
  
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://api.msci.com/index/indexmaster/description/v1.0/indexes/ALL?calc_date=20191122&as_of_date=20191122&distribution_zone=WORLD&cumulative=false', true);
    request.setRequestHeader("Authorization", "Basic ZWY0YmRhNzAtZDk5ZS00NzBiLTgwZDItNGRlZmMyN2M2MzYwOlNuRllaVXh3UFZFdFdISnpLejFmYzFKdldXUmlkRVZHUDFsRGN6UXJVbVVyTmpZNE9EVTNOQT09");

    request.onload = function() 
    {
        var indexes = JSON.parse(this.response);
        // Begin accessing JSON data here
        if (request.status == 200) {
            var index_array = Array.from(indexes.indexes);
            console.log(index_array.length + " indexes retrieved from MSCI");
            index_array.forEach(index_description => {
              // toReturn.add(index_description.INDEX_MASTER_DESCRIPTION.msci_index_code);
              toReturn.push(index_description.INDEX_MASTER_DESCRIPTION.msci_index_code + " - " + index_description.INDEX_MASTER_DESCRIPTION.index_name);
            })
          } else {
            console.log('error')
          }
    }

    // Send request
    request.send()

    return toReturn;
}

function populate_msci_entities()
{
    return populate_msci_indexes();
}

autocomplete(document.getElementById("EntityCode"), populate_msci_entities());


