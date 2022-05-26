<template>
  <div class="chartsWrapper">

    <div class="leftChartWrapper">
        <canvas id ="leftChart">To jest lewy wykres</canvas>
    </div>

    <div class="rightChartWrapper">
         <canvas id ="rightChart">To jest prawy wykres</canvas>
    </div>

    <div class="bottomWrapper">
        <canvas id ="bottomChart">To jest prawy wykres</canvas>        
    </div>

  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios'

export default {

   mounted() {
    console.log('Komponent zaladowany')


    const leftChartPlace = document.getElementById('leftChart')
    const rightChartPlace = document.getElementById('rightChart')
    const bottomChartPlace = document.getElementById('bottomChart')
    
    var optionsLeft = {
      maintainAspectRatio: false,
      responsive : true,
        layout: {
            padding: {
              left: 50,
              right: 50,
              top: 20,
              bottom: 20
            }
        },
      scales: {
        y: {
          
          grid: {
            display: false,
            drawBorder:false,
            color: "rgba(0,99,132,1)"
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder:false,
          }
        }
      }
    };

    var optionsRight = {
      maintainAspectRatio: false,
      responsive : true,
        layout: {
            padding: {
              left: 50,
              right: 50,
              top: 20,
              bottom: 20
            }
        },
      scales: {
        y: {
          
          grid: {
            display: false,
            drawBorder:false,
            color: "rgba(0,99,132,1)"
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder:false,
          }
        }
      }
    };

    var optionsBottom = {
      maintainAspectRatio: false,
      responsive : true,
        layout: {
            padding: {
              left: 50,
              right: 50,
              top: 20,
              bottom: 20
            }
        },
      scales: {
        y: {
          
          grid: {
            display: false,
            drawBorder:false,
            color: "rgba(0,99,132,1)"
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder:false,
          }
        }
      }
    };
/* Lewy wykres */
    const leftChart = new Chart(leftChartPlace, {
    type: 'doughnut',
    data: {
        labels: ['Done', 'Ongoing'],
        datasets: [{
            label: '# of Votes',
            data: [2,4],
            backgroundColor: [
                'rgba(00, 255, 00, 0.5)',
                'rgba(255, 00, 00, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: optionsLeft
});

/* Prawy wykres */

    const rightChart = new Chart(rightChartPlace, {
    type: 'doughnut',
    data: {
        labels: ['DaftCode', 'Skyware', 'Rocket Launcher'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: optionsRight
});

/* Dolny wykres */

const bottomChart = new Chart(bottomChartPlace, {
    type: 'bar',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',  'Sunday'],
        datasets: [{
            label: '# of Votes',
            data: [6, 6, 6 ,6, 6, 6, 6],
            backgroundColor: [
                'rgba(00, 255, 00, 0.5)',
                'rgba(255, 00, 00, 0.5)',
                'rgba(00, 255, 00, 0.5)',
                'rgba(255, 00, 00, 0.5)',
                'rgba(00, 255, 00, 0.5)',
                'rgba(255, 00, 00, 0.5)',
                'rgba(00, 255, 00, 0.5)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: optionsBottom
});

  }
};
</script>


<style>
.chartsWrapper { /* glowny container na wykresy */
  width: 80%;
  height: 80vh;
  display: block;
  margin: 0 auto;
}

.leftChartWrapper { /* ustawienia lewego wykresu */
  width: 50%;
  height:40vh;
  background-color: rgba(255,255,255,0.1);
  display: block;
  float:left;
  position:relative;
}

.rightChartWrapper { /* ustawienia prawego wykresu */
  width: 50%;
  height: 40vh;
  background-color: rgba(255,255,255,0.1);
  display: block;
  float:left;
  position:relative;
}

.bottomWrapper { /* ustawienia dolnego wykresu */
  width: 100%;
  height: 50%;
  display: block;
  float: left;
  position: relative; 
}



</style>
