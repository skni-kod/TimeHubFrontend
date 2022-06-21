<template>
  <div class="mainpanel" v-if="!auth">
    <div class="square" >
      <div class="heading">
        <h1>TimeHUB</h1>
      </div>
      <div class = "placeholder">
        <input class="login" v-model="login" type="text" placeholder="Login"/>
      </div>
      <div style="clear:both;"></div>
      <div class = "placeholder">
        <input class="haslo" v-model="email" type="email" placeholder="Email"/>
      </div>
          <div class = "placeholder">
        <input class="login" v-model="password" type="password" placeholder="Hasło"/>
      </div>
      <div style="clear:both;"></div>
      <div class = "placeholder">
        <input class="haslo" v-model="password_confirm" type="password" placeholder="Powtórz hasło"/>
      </div>
      <p class="error">{{ error}}</p>
      <div class="button1">
        <button class="loginbutton" type="button" @click="register">
          <h4>Zarejestruj się</h4>
        </button>
      </div>
        <div class="underbutton">
          <div class="tile1">
            Jesteś już zarejestrowany?
          </div>
          <div class="tile">
            <button class="changebutton" type="button" onclick="window.location.href='/'">
              Zaloguj się
            </button>
          </div>
        </div> 
    </div>
  </div>
  <div class="description">
  <h1> O TimeHUB </h1>
    <div class="tile2">
      <div class="text">
        Projekt TimeHUB został założony przez ośmioosobową 
        grupę studentów II roku Informatyki. Ośmioro członków
        Studenckiego Koła Naukowego Informatyków KOD, postanowiło
        stworzyć system ułatwiający organizację pracy w zespole.
        Dzięki wsparciu koła naukowego oraz prowadzących projektu 
        możliwe było stworzenie aplikacji TimeHUB.
      </div>
      <div class="photo1">
      <img :src="require('../assets/LogoSkniKod.png')" alt="SKNI KOD">
      </div>
    </div>
    <div class="tile2">
      <div class="photo2"><img :src="require('../assets/Wykresy.png')" alt="Wykresy"></div>
      <div class="text">
        TimeHub pozawala na łatwe oraz efektywne organizowanie pracy
        w zespole. Umożliwia podział pracy między członków zespołu, 
        poprzez przydzielanie zadań do konkretnych użytkowników.
        Intuicyjny system wykresów zapewnia przejrzyste śledzenie
        postępów grupy. Platforma jest dostępna zarówno w przhlądarce 
        jak i w aplikacji mobilnej.
      </div>
    </div>
    
  </div>
</template>

<style>
.mainpanel{
  background-color: white;
  width: 100%;
  height: auto;
  padding: 15px;
}
.description{
  width: 100%;
  align: center;
  margin-top: 15px;
  background-color: #F6F6F6;
  box-shadow: 0px 0px 7px gray, 0 0 2px inset gray;
  padding: 10px;
}
.square{
  align: center;
  width: 600px;
  height: auto;
  background-color: #F6F6F6;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 0px 7px gray, 0 0 2px inset gray;
  border-radius: 16px;
  padding:10px;
}
.error{
  color:red
}
.heading{
  width: 100%;
  height: 15%;
}
::placeholder {
  font-size: 1.2em;
  font-style: italic;
  }
  :not(:placeholder-shown) {
  
  }
.placeholder{
  width: 100%;
  height: 15%;
  padding: 10px;
}
.login{
  text-align: center;
  width: 50%;
  border-radius: 16px;
  line-height: 1.5;
}
.haslo{
  text-align: center;
  width: 50%;
  border-radius: 16px;
  line-height: 1.5;
}
.button1{
  padding: 15px;
}
.loginbutton {
    border: 0;
    width: 250px;
    line-height: 2;
    padding: 0 20px;
    font-size: 1.5rem;
    text-align: center;
    border-radius: 16px;
    background-color: white;
    cursor: pointer;
    color: #2c3e50;
    box-shadow: 0px 0px 7px gray, 0 0 2px inset gray;
    enable-background: new 0 0 569.613 569.614;
               
}

.loginbutton:active {
    box-shadow: 0 0 0, 0 0 5px inset gray;
    transition-duration: 0.025s;
}
.changebutton{
    border: 0;
    width: 100px;
    line-height: 1.1;
    padding: 8px 10px;
    font-size: 0.8rem;
    text-align: center;
    color: #2c3e50;
    cursor: pointer;
    border-radius: 16px;
    background-color: white;
    box-shadow: 0px 0px 7px gray, 0 0 2px inset gray;
    enable-background: new 0 0 569.613 569.614;
}
.changebutton:active {
    box-shadow: 0 0 0, 0 0 5px inset gray;
    transition-duration: 0.025s;
}
.tile1{
  padding: 5px;
}
.tile2{
  display:flex;
flex-wrap:wrap;
justify-content:center;
align-items:center;
margin-bottom: 12px;
column-gap:25px;
}
.text{
  width: 50%;
  height: 130px;
  background-color: #F6F6F6;
  text-align: justify;
  box-shadow: 0px 0px 7px gray, 0 0 2px inset gray;
  border-radius: 16px;
  padding: 10px;
}
.photo1{
  width: 30%;
}
.photo1 img{
  width: 80%;
  height: auto;
  object-fit: contain;
  box-shadow: 0px 0px 7px gray, 0 0 2px inset gray;
  border-radius: 16px;
}
.photo2{
  width: 30%;
}
.photo2 img{
  width: 100%;
  height: auto;
  object-fit: contain;
  box-shadow: 0px 0px 7px gray, 0 0 2px inset gray;
  border-radius: 16px;
}
</style>
<script lang="ts">
import {defineComponent} from 'vue';
import TimeHubClient from '../axios-client'
import router from '../router'
export default defineComponent({
  components: {},

  setup(): { pageName: string } {
    const pageName = "home";
    return {
      pageName: pageName,
    };
  },  
  data(){
    return {login:'',password:'',email:'',password_confirm:'', error:''}
  },
  methods:{
    register(){
      const dane = {username:this.login,email:this.email, password1:this.password, password2:this.password_confirm}
      TimeHubClient.post('https://projekt-timehub.herokuapp.com/dj_rest_auth/registration/',dane).then(res => { router.push('/')}).catch(err => {this.error = 'Sprawdź podane dane'})
    }
  },

});
</script>
