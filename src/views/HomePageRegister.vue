<template>
  <div class="square" >
    <div class="heading">
      <h1>TimeHUB</h1>
    </div>
    <div class = "placeholder">
      <input class="login" type="text" placeholder="Login"/>
    </div>
    <div style="clear:both;"></div>
    <div class = "placeholder">
      <input class="haslo" type="text" placeholder="Hasło"/>
    </div>
    <div class="button1">
      <button class="loginbutton" type="button" onclick="window.location.href='/'">
        <h4>Register</h4>
      </button>
    </div>
      <div class="underbutton">
        <div class="tile">
          Are you already registered?
        </div>
        <div class="tile">
          <button class="changebutton" type="button" onclick="window.location.href='/'">
            Log In now
          </button>
        </div>
      </div> 
  </div>
</template>

<style>

.square{
  align: center;
  width: 55%;
  height: 280px;
  background-color: #F6F6F6;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 0px 7px gray, 0 0 2px inset gray;
  border-radius: 16px;
}
.heading{
  width: 100%;
  height: 15%;
  padding: 10px;
  margin-bottom: 5px;
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
    width: 200px;
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
.tile{
  padding: 5px;
}
</style>
<script lang="ts">

export default {
  components: {},

  setup(): { pageName: string } {
    const pageName = "home";
    return {
      pageName: pageName,
    };
  },
};
</script>
