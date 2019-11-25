const fs = require('fs')

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

function populate_msci_indexes_from_cache()
{
    try {
          var toReturn = [];
          const jsonString = fs.readFileSync('./cache/indexes.json');
          const cache_object = JSON.parse(jsonString);
          var index_array = Array.from(cache_object);
          console.log(index_array.length + " indexes retrieved from cache");
          index_array.forEach(index_description => {
          // toReturn.add(index_description.INDEX_MASTER_DESCRIPTION.msci_index_code);
          toReturn.push(index_description.index_code + " - " + index_description.index_name);
          });
        } catch(err) {
        console.log(err)
        return
      }
    return toReturn;
}

function populate_msci_entities()
{
    return populate_msci_indexes_from_cache();
}

autocomplete(document.getElementById("EntityCode"), populate_msci_entities());


