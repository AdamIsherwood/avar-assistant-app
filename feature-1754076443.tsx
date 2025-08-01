```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Danish Cities</title>
    <style>
        body {
            font-family: sans-serif;
        }
        #chartContainer {
            width: 600px;
            height: 400px;
        }
    </style>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>

    <h1>Danish Cities with > 75,000 Inhabitants</h1>

    <ul id="cityList">
    </ul>

    <div id="chartContainer"></div>

    <script>
        const cities = [
            { name: "Copenhagen", population: 809248 },
            { name: "Aarhus", population: 285149 },
            { name: "Odense", population: 205499 },
            { name: "Aalborg", population: 119215 },
            { name: "Frederiksberg", population: 104395 },
            { name: "Esbjerg", population: 71618 },  // Sneaky! Just below the limit.
            { name: "Randers", population: 62980 }, // Below limit for variety
            { name: "Kolding", population: 61735 } // Another one to test
        ];

        const cityList = document.getElementById('cityList');
        const qualifyingCities = cities.filter(city => city.population > 75000);

        qualifyingCities.forEach(city => {
            const listItem = document.createElement('li');
            listItem.textContent = `${city.name} - Population: ${city.population}`;
            cityList.appendChild(listItem);
        });


        const cityNames = qualifyingCities.map(city => city.name);
        const cityPopulations = qualifyingCities.map(city => city.population);


        const data = [{
            x: cityNames,
            y: cityPopulations,
            type: 'bar'
        }];

        const layout = {
            title: 'Population of Danish Cities',
            xaxis: { title: 'City' },
            yaxis: { title: 'Population' }
        };

        Plotly.newPlot('chartContainer', data, layout);

    </script>

</body>
</html>
```