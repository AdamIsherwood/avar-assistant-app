```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Danish Cities</title>
    <style>
        #cities {
            list-style-type: none;
            padding: 0;
        }
        #chart {
            width: 400px;
            height: 300px;
        }
    </style>
</head>
<body>
    <h1>Danish Cities with more than 75.000 inhabitants</h1>
    <ul id="cities"></ul>
    <canvas id="chart"></canvas>
    <script>
        const cities = [
            { name: "Copenhagen", population: 805200},
            { name: "Aarhus", population: 285391 },
            { name: "Odense", population: 180851 },
            { name: "Aalborg", population: 119132 },
            { name: "Frederiksberg", population: 104479 },
            { name: "Esbjerg", population: 71567 },
            { name: "Randers", population: 62998},
            { name: "Kolding", population: 61289 },
            { name: "Horsens", population: 60818 },
            { name: "Vejle", population: 59912 },
            { name: "Roskilde", population: 51684 }
        ];

        const citiesList = document.getElementById('cities');
        cities.forEach(city => {
            if (city.population > 75000) {
                const listItem = document.createElement('li');
                listItem.textContent = `${city.name} (${city.population})`;
                citiesList.appendChild(listItem);
             }
        });


        const canvas = document.getElementById('chart');
        const ctx = canvas.getContext('2d');

        const filteredCities = cities.filter(city => city.population > 75000)
        const chartData = {
            labels: filteredCities.map(city => city.name),
            datasets: [{
                label: 'Population',
                data: filteredCities.map(city => city.population),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };

        new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    </script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</body>
</html>

```