<template>

<h1>User's statistics</h1>
  <div class="chartsWrapper">

    <div class="leftChartWrapper">
      <h2>Aktualne taski</h2>
      <h3><br></h3>
        <canvas id ="leftChart">To jest lewy wykres</canvas>
    </div>

    <div class="rightChartWrapper">
      <h2>Podział tasków na kanbany</h2>
      <h3>w ciągu ostatnich 7 dni</h3>
         <canvas id ="rightChart">To jest prawy wykres</canvas>
    </div>

    <div class="bottomWrapper">
      <h2>Ilość wykonanych tasków w przeciągu ostatnich 7 dni</h2>
      <h3><br></h3>
        <canvas id ="bottomChart">To jest prawy wykres</canvas>        
    </div>
    
  </div>
</template>

<script lang="ts">
import Chart from 'chart.js/auto';
import 'chartjs-plugin-style';


export default {
  props:{
    zmienna: Array,
    zmienna2: Array
},
  /*{
    test: [],
    test3: String,
    zmienna: String
  },*/
  
   mounted() {
    console.log("Zrobione: "+this.zmienna);
    console.log("W trakcie: "+this.zmienna2);
    const leftChartPlace:any = document.getElementById('leftChart')!;
    const rightChartPlace:any = document.getElementById('rightChart')!;
    const bottomChartPlace:any = document.getElementById('bottomChart')!;

  const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
  const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.5)`;


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

    };

    var optionsBottom = {
      plugins: {
            legend: {
                display: false,
            }
        },
      maintainAspectRatio: false,
      responsive : true,
        layout: {
            padding: {
              left: 50,
              right: 50,
              top: 20,
              bottom: 20
            },
        },
      scales: {
        y: {
          
          grid: {
            display: false,
            drawBorder:true,
            color: "rgba(0,99,132,1)"
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder:true,
          }
        }
      }
    };

    const leftChart = new Chart(leftChartPlace, {
    type: 'doughnut',
    data: {
        labels: [this.zmienna, this.zmienna2],
        datasets: [{
            data: [2,5],
            backgroundColor: [
                randomRGB(),
                randomRGB()
            ],
            borderColor: [
                "rgba(0,0,0,0)",
                "rgba(0,0,0,0)"
            ],
            borderWidth: 5
        }]
    },
    options: optionsLeft
});


    const rightChart = new Chart(rightChartPlace, {
    type: 'doughnut',
    data: {
        labels: ['DaftCode', 'Skyware', 'Rocket Launcher'],
        datasets: [{
            data: [4,6, 3],
            backgroundColor: [
                randomRGB(),
                randomRGB(),
                randomRGB(),
            ],
            borderColor: [
                "rgba(0,0,0,0)",
                "rgba(0,0,0,0)",
                "rgba(0,0,0,0)"
            ],
            borderWidth: 1
        }]
    },
    options: optionsRight
});


const bottomChart = new Chart(bottomChartPlace, {
    type: 'bar',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',  'Sunday'],
        datasets: [{
            data: [6, 4, 5 ,9, 1, 4, 6],
            backgroundColor: [
                randomRGB(),
                randomRGB(),
                randomRGB(),
                randomRGB(),
                randomRGB(),
                randomRGB(),
                randomRGB(),
            ],
            borderColor: [
                "rgba(0,0,0,0)",
                "rgba(0,0,0,0)",
                "rgba(0,0,0,0)",
                "rgba(0,0,0,0)",
                "rgba(0,0,0,0)",
                "rgba(0,0,0,0)",
                "rgba(0,0,0,0)",
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
  height: 65vh;
  display: block;
  margin: 0 auto;
}

.leftChartWrapper { /* ustawienia lewego wykresu */
  width: 50%;
  height:40vh;
  background-color: rgba(255,255,255);
  display: block;
  float:left;
  position:relative;
  padding-bottom: 40px;
}

.rightChartWrapper { /* ustawienia prawego wykresu */
  width: 50%;
  height: 40vh;
  background-color: rgba(255,255,255);
  display: block;
  float:left;
  position:relative;
  padding-bottom: 40px;
}

.bottomWrapper { /* ustawienia dolnego wykresu */
  width: 100%;
  height: 50%;
  margin-top:40px;
  margin-bottom:40px;
  display: block;
  float: left;
  position: relative; 
}

h1{
  margin: 20px;
}

</style>
