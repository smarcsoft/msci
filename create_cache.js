const fs = require('fs');
const https = require('https');


function populate_msci_indexes()
{
    var response = "";
    var toCache = new Array();
    const options = {
        hostname: 'api.msci.com',
        port: 443,
        path: '/index/indexmaster/description/v1.0/indexes/ALL?calc_date=20191122&as_of_date=20191122&distribution_zone=WORLD&cumulative=false',
        method: 'GET',
        headers: {
            'Authorization': 'Basic ZWY0YmRhNzAtZDk5ZS00NzBiLTgwZDItNGRlZmMyN2M2MzYwOlNuRllaVXh3UFZFdFdISnpLejFmYzFKdldXUmlkRVZHUDFsRGN6UXJVbVVyTmpZNE9EVTNOQT09'
        }
    }

    process.stdout.write("Connecting to MSCI...");
    
    const req = https.request(options, res => 
    {
        if(res.statusCode == 200)
            process.stdout.write("SUCCEEDED\n");
        
        let it = 0;

        res.on('data', d => {
            it++;
            if(it%25 == 0)
                process.stdout.write(".");
            response += d;
        })
    

        res.on('end', () => {
            process.stdout.write("\n");
            process.stdout.write("Received " + response.length / 1024 / 1024 + "MB of information\n");
            var indexes = JSON.parse(response);
            var index_array = Array.from(indexes.indexes);
            console.log(index_array.length + " indexes retrieved from MSCI");
            
            index_array.forEach(index_description => 
                {
                    var cached_value = {index_code:index_description.INDEX_MASTER_DESCRIPTION.msci_index_code , index_name:index_description.INDEX_MASTER_DESCRIPTION.index_name};
                    toCache.push(cached_value);
                }
            );
            write_cache(toCache);
        });
    })

    req.on('error', error => {
        process.stdout.write("FAILED!: " + error + "\n");
    })

    req.end();
}


function write_cache(cache)
{
    var cache_content = JSON.stringify(cache);
    process.stdout.write("Writing cache...");
    fs.writeFile('./cache/indexes.json', cache_content, err => {
        if (err) {
            process.stdout.write('FAILED!: ' + err)
        } else {
            process.stdout.write('Successfully wrote indexes.json')
        }
    })
}

// array of objects
var index_description_cache =  populate_msci_indexes();
