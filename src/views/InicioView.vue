<template>
<section>
    <div class="container">
        <h1>ADIVINAR GAME</h1>
        <div class="containerData">
            <label for="#">Username:</label>
            <input type="text" v-model="username" maxlength="10">
        </div>
        <button @click="start">Empezar</button>
        <button @click="registro" class="registroButton">Registro</button>

    </div>
</section>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { useToast } from "vue-toastification";
export default{
    mounted(){
        this.RESET_GAME()
    },
    data(){
        return{
            username:'',
            toast:useToast()
        }
    },
    computed:{
        ...mapState(['nombre','palabra','longitud'])
    },
    methods:{
        ...mapMutations(['START_GAME','RESET_GAME']),
        start(){
            if(this.username == '' || this.username.includes(' ')){
                this.toast.error('Debe ingresar un nombre de usuario correcto.',{timeout:2000,position:'bottom-center'})
                this.username = ''
            }else{
                this.START_GAME(this.username)
                console.log(this.nombre);
                console.log(this.palabra);
                this.$router.push({name:'game'})
            }
        },
        registro(){
            this.$router.push({name:'registro'})
        }

    }
}
</script>
<style lang="sass" scoped>
section
    width: 100%
    height: 100vh
    background: #880491
    display: flex
    align-items: center
    justify-content: center

.registroButton
        width: 160px
        height: 30px
        font-size: 20px
        border: none
        border-radius: 5px
        background: gold
        color: white
        transition: 0.5s
        &:hover
            cursor: pointer
            border: 2px solid gold
            background: white
            color: black

.container
    background: white
    width: 400px
    height: 400px   
    display: flex
    flex-direction: column
    align-items: center
    border-radius: 10px
    justify-content: space-around
    h1
        color: darkviolet
        font-size: 50px

button
    width: 160px
    height: 30px
    font-size: 20px
    border: none
    border-radius: 5px
    background: darkviolet
    color: white
    transition: 0.5s
    &:hover
        cursor: pointer
        border: 2px solid darkviolet
        background: white
        color: darkviolet

.containerData
    display: flex
    flex-direction: column

    margin: 22px

    input
        width: 300px
        height: 30px
        border-radius: 5px
        border: 2px solid darkviolet
        outline: none
        text-align: center
        font-size: 20px



    
</style>