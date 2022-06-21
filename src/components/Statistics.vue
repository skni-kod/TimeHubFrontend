<template>
  <h1>Statystyki Użytkownika</h1>
  <div class="chartsWrapper">
    <div class="leftChartWrapper">
      <h2>Aktualne zadania</h2>
      <h3><br /></h3>
      <canvas id="leftChart">To jest lewy wykres</canvas>
    </div>

    <div class="rightChartWrapper">
      <h2>Podział zadań na tablice</h2>
      <h3>w ciągu ostatnich 7 dni</h3>
      <canvas id="rightChart">To jest prawy wykres</canvas>
    </div>

    <div class="bottomWrapper">
      <h2>Ilość wykonanych zadań</h2>
      <h3>w przeciągu ostatnich 7 dni</h3>
      <canvas id="bottomChart">To jest dolny wykres</canvas>
    </div>
  </div>
</template>

<script lang="ts">
import Chart from "chart.js/auto";
import axios from "axios";

export default {
  async created() {
    const { data } = await axios.get(
      "https://projekt-timehub.herokuapp.com/api/statystykaNotatkiSkonczoneAktywne7Dni/"
    );
    let zrobione: Promise<void> = data.zrobione + 2; //+1 jest dla testu xd
    let wtrakcie: Promise<void> = data.w_trakcie + 3;

    const leftChartPlace: any = document.getElementById("leftChart");
    const rightChartPlace: any = document.getElementById("rightChart");
    const bottomChartPlace: any = document.getElementById("bottomChart");

    const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
    const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.5)`;

    var optionsLeft = {
      maintainAspectRatio: false,
      responsive: true,
      layout: {
        padding: {
          left: 50,
          right: 50,
          top: 20,
          bottom: 20,
        },
      },
    };

    var optionsRight = {
      maintainAspectRatio: false,
      responsive: true,
      layout: {
        padding: {
          left: 50,
          right: 50,
          top: 20,
          bottom: 20,
        },
      },
    };

    var optionsBottom = {
      plugins: {
        legend: {
          display: false,
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      layout: {
        padding: {
          left: 50,
          right: 50,
          top: 20,
          bottom: 20,
        },
      },
      scales: {
        y: {
          grid: {
            display: false,
            drawBorder: true,
            color: "rgba(0,99,132,1)",
          },
        },
        x: {
          grid: {
            display: false,
            drawBorder: true,
          },
        },
      },
    };

    const leftChart = new Chart(leftChartPlace, {
      type: "doughnut",
      data: {
        labels: ["Zrobione: " + zrobione, "W trakcie: " + wtrakcie],
        datasets: [
          {
            data: [zrobione, wtrakcie],
            backgroundColor: [randomRGB(), randomRGB()],
            borderColor: ["rgba(0,0,0,0)", "rgba(0,0,0,0)"],
            borderWidth: 5,
          },
        ],
      },
      options: optionsLeft,
    });

    const rightChart = new Chart(rightChartPlace, {
      type: "doughnut",
      data: {
        labels: ["DaftCode", "Skyware", "Rocket Launcher"],
        datasets: [
          {
            data: [4, 6, 3],
            backgroundColor: [randomRGB(), randomRGB(), randomRGB()],
            borderColor: ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"],
            borderWidth: 1,
          },
        ],
      },
      options: optionsRight,
    });

    const bottomChart = new Chart(bottomChartPlace, {
      type: "bar",
      data: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            data: [6, 4, 5, 9, 1, 4, 6],
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
            borderWidth: 1,
          },
        ],
      },

      options: optionsBottom,
    });
  },
};
</script>

<style scoped lang="scss">
.chartsWrapper {
  /* glowny container na wykresy */
  width: 80%;
  height: 65vh;
  display: block;
  margin: 0 auto;
}

.leftChartWrapper {
  /* ustawienia lewego wykresu */
  width: 50%;
  height: 40vh;
  background-color: rgba(255, 255, 255);
  display: block;
  float: left;
  position: relative;
  padding-bottom: 40px;
}

.rightChartWrapper {
  /* ustawienia prawego wykresu */
  width: 50%;
  height: 40vh;
  background-color: rgba(255, 255, 255);
  display: block;
  float: left;
  position: relative;
  padding-bottom: 40px;
}

.bottomWrapper {
  /* ustawienia dolnego wykresu */
  width: 100%;
  height: 50%;
  margin-top: 40px;
  margin-bottom: 40px;
  display: block;
  float: left;
  position: relative;
}

h1 {
  margin: 20px;
}
</style>
