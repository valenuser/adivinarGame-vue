<template>
    <section>
        <div class="container">
            <i class="fa-solid fa-arrow-left back" @click="back"></i>
            <h1>Registro de partidas</h1>
            <div>
                <div class="info">
                    <h3>Jugador</h3>
                    <h3>Intentos</h3>
                    <h3>Resultado</h3>
                </div>
                <div v-if="registro.length == 0" class="data">
                    <p>No hay resultados registrados.</p>
                </div>
                <div v-else>
                    <div v-for="resultado in registro" :key="resultado" class="resultados">
                            <div class="card">
                                <h3>{{ resultado.nombre }}</h3>
                                <h3>{{ resultado.intentos }}</h3>
                                <i class="fa-solid fa-circle-check"></i>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState }  from 'vuex'

export default{
    computed:{
        ...mapState(['registro'])
    },
    methods:{
        back(){
            this.$router.push({name:'inicio'})
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

.container
    background: white
    width: 600px  
    display: flex
    flex-direction: column
    align-items: center
    border-radius: 10px
    overflow: auto
    h1
        color: darkviolet
        font-size: 50px


    .info
        width: 600px
        height: 30px
        display: flex
        justify-content: space-around
        align-items: center

.data
    height: 50px
    display: flex
    justify-content:  center
    align-items: center

.back
    margin-right: 550px
    font-size: 30px
    &:hover
        cursor: pointer


.resultados
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
.card
    width: 590px
    height: 30px
    display: flex
    justify-content: space-around
    align-items: center
    margin-bottom: 10px
    box-shadow: 1px 1px 1px 1px gray
    border-radius: 5px
    i
        color: green
</style>