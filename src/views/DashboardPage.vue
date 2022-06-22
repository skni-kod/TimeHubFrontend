<script lang="ts">
import { defineComponent } from 'vue';
import TimeHubClient from '../axios-client';
import store from '../store';
export default defineComponent({
    components: {},

    setup(): { pageName: string; } {
        var path = window.location.pathname;
        const URLPageName = path.substring(path.lastIndexOf("/") + 1);

        return {
            pageName: URLPageName,
        };
    },
    beforeMount: async function() {
        try {
            const response = await TimeHubClient.get(`uzytkownikTablice/`, {headers:{Authorization:`Bearer ${this.token}`}});
            store.dispatch('getKanbany', response.data);
            this.kanbany = response.data;
        } catch (error) {
            this.kanbany = "Nie można było pobrać danych"
        }
    },
    data: () => {
        return {
            user: store.getters.getUser,
            token:store.getters.getToken,
            kanbany: store.getters.getKanbany,
            tytul: '',
            czy_zautomatyzowane: false
        };
    },
    methods: {
        stworzTablice: async function() {
            try {
                const response = await TimeHubClient.post(`tablice/`,
                {
                    tytul: this.tytul,
                    czy_zautomatyzowane: this.czy_zautomatyzowane
                },
                {
                    headers:{Authorization:`Bearer ${this.token}`}
                });
                this.tytul = '';
                this.czy_zautomatyzowane = false;
            }
            catch (error) {
                console.log(error);
            }
            try {
                const response = await TimeHubClient.get(`uzytkownikTablice/`, {headers:{Authorization:`Bearer ${this.token}`}});
                this.kanbany = response.data;
            } catch (error) {
                this.kanbany = "Nie można było pobrać danych"
            }
        }
    }
});
</script>

<template>
    <div class="main">
        <div class="first">
            <div class="personal-info">
                <div class="avatar">
                    <img
                        :src="require('../assets/avatar_placeholder.svg')"
                        alt=""
                    />
                </div>
                <h2>Witaj: {{ user.username }}!</h2>
                <h4>E-mail: {{ user.email }}</h4>
                <div class="btns">
                    <router-link to="/statistics" class="btn"
                        >Zobacz swoje statystyki</router-link
                    >
                    <router-link to="/calendar" class="btn"
                        >Zobacz swój kalendarz</router-link
                    >
                </div>
            </div>
        </div>
        <div class="second">
            <h2>Twoje kanbany</h2>
            <div class="kanbany">
                <div class="kanban" v-for="kanban in kanbany" :key="kanban.tablica.id">
                    <router-link :to='"/kanban/" + kanban.tablica.id'>
                        <img :src="require('../assets/kanban.png')" alt="" />
                        <h3>{{kanban.tablica.tytul}}</h3>
                    </router-link>
                </div>

                <div class="stworz">
                    <h3>Stwórz tablicę</h3>
                    <input type="text" placeholder="Nazwa tablicy" v-model="tytul"/><br/>
                    <input type="checkbox" name="zautomatyzowane" id="zautomatyzowane" v-model="czy_zautomatyzowane">
                    <label for="zautomatyzowane">Czy zautomatyzowane</label><br/>
                    <input type="submit" value="Stwórz" @click="stworzTablice"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .main {
        .btn {
            padding: 20px;
            border: 1px solid #42b983;
            text-decoration: none;
            color: #42b983;
            transition: 1s;
            margin-top: 25px;
            &:hover {
                background: #42b983;
                border-color: white;
                color: white;
            }
        }
        margin-top: 50px;
        .first {
            display: flex;
            justify-content: center;
            align-items: center;
            .personal-info {
                display: flex;
                flex-direction: column;
            }
            .avatar {
                img {
                    width: 100%;
                    clip-path: circle(50%);
                    max-width: 150px;
                    height: auto;
                }
            }
            .btns {
                display: flex;
                column-gap: 15px;
            }
        }
        .second {
            margin: 30px;
            text-align: center;
            .kanbany {
                display: flex;
                flex-wrap: wrap;
                text-align: center;
                justify-content: center;
                margin: 30px;
                .stworz{
                    background: darken($color: #ffff, $amount: 30);
                    max-width: 240px;
                    height: auto;
                    width: 100%;
                    padding: 18px 32px;
                    border-radius: 16px;
                    input{
                        margin: 5px;
                    }
                }
                .kanban {
                    display: flex;
                    flex-direction: column;
                    row-gap: 10px;
                    margin: 10px;
                    img {
                        background: darken($color: #ffff, $amount: 30);
                        max-width: 120px;
                        height: auto;
                        width: 100%;
                        padding: 18px 32px;
                        border-radius: 16px;
                    }
                }
            }
        }
    }
</style>