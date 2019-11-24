function populate_msci_indexes()
{
    console.log("Calling index master MSCI API to get the list of indexes");
    var request = new XMLHttpRequest();
  
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://api.msci.com/index/indexmaster/description/v1.0/indexes/ALL?calc_date=20191122&as_of_date=20191122&distribution_zone=WORLD&cumulative=false', true);
    request.setRequestHeader("Authorization", "Basic ZWY0YmRhNzAtZDk5ZS00NzBiLTgwZDItNGRlZmMyN2M2MzYwOlNuRllaVXh3UFZFdFdISnpLejFmYzFKdldXUmlkRVZHUDFsRGN6UXJVbVVyTmpZNE9EVTNOQT09");

    request.onload = function() 
    {
        console.log("Parsing JSON back");
        var indexes = JSON.parse(this.response);
        console.log(indexes);
        // Begin accessing JSON data here
        if (request.status == 200) {
            index_array = Array.from(indexes.indexes);
            index_array.forEach(index_description => {
              console.log(index_description.INDEX_MASTER_DESCRIPTION.msci_index_code + ":" + index_description.INDEX_MASTER_DESCRIPTION.index_name);
            })
          } else {
            console.log('error')
          }
    }

    // Send request
    request.send()

    return ["MSCI World","MSCI France","MSCI EAFE"];
}

function populate_msci_entities()
{
    return populate_msci_indexes();
}

autocomplete(document.getElementById("EntityCode"), populate_msci_entities());


