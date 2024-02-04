<template>
<section>
    <div class="container">
        <h1>Adivina la palabra</h1>
        <p>Jugador: {{ nombre }}</p>
        <div class="inputs">
            <div v-for="(letra,indice) in espacios" :key="letra">
                <input type="text" maxlength="1"  v-model="letras[indice]"  :id="indice" @keyup="verifyLetter(indice)">
            </div>
        </div>
        <div class="arriesgar">
            <button @click="arriesgar">Arriesgar</button>
            <span>(Si erras la palabra, no tendras mas intentos)</span>
        </div>
        <div>
            <p>Intentos: {{ intentos }}</p>
            <div class="option">
                <h3 @click="help">Ayuda<i class="fa-solid fa-circle-info"></i></h3>
            </div>
        </div>
    </div>
</section>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import Swal from 'sweetalert2'
export default{
    mounted(){
        if(this.nombre == ''){
            this.$router.push({name:'inicio'})
        }
    },
    data(){
        return{
            letras:[]
        }
    },
    computed:{
        ...mapState(['espacios','intentos','palabra','nombre'])
    },
    methods:{
        ...mapMutations(['INCORRECT_ANSWER','ARRIESGAR_METHOD','SAVE_MATCH']),
        verifyLetter(indice){

            if(this.letras[indice] == '' || this.letras[indice] == undefined || this.letras[indice] == ' '){
                document.getElementById(indice).style = "border:2px solid black"
            }else if(this.letras.join('') == this.palabra.text){
                Swal.fire({
                    title: `Felicidades, has ganado ${this.nombre}!`,
                    text:'¿Deseas guardar esta partida en el registro?',
                    showDenyButton: true,
                    confirmButtonText: "Guardar",
                    denyButtonText: `No gracias`
                    }).then((result) => {
                    if (result.isConfirmed) {
                        this.SAVE_MATCH(this.intentos,true)
                        Swal.fire("Saved!", "", "success");
                        this.ARRIESGAR_METHOD()
                        this.$router.push({name:'inicio'})
                    } else if (result.isDenied) {
                        this.$router.push({name:'inicio'})
                    }
                    this.$router.push({name:'inicio'})
                });
            }else if(this.palabra.text[indice] == this.letras[indice]){
                document.getElementById(indice).style = "border:2px solid green"
            }else{               
                document.getElementById(indice).style = "border:2px solid red"
                this.INCORRECT_ANSWER()
                if(this.intentos == 0){
                    Swal.fire({
                        position: "center",
                         icon: "error",
                        title: `Has perdido ${this.nombre}`,
                        text:'Se te redirigira a la pagina de inicio, gracias por participar!',
                        showConfirmButton: false,
                        timer: 2500
                    });
                    this.$router.push({name:'inicio'})
                
                }
            }    
        },
        arriesgar(){
            Swal.fire({
                title: "Escribe la palabra que creas que es la correcta, suerte!",
                input: "text",
                inputAttributes: {
                    autocapitalize: "off"
                },
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                showLoaderOnConfirm: true
            }).then((result)=>{

                if(result.isConfirmed){

                    if(result.value == this.palabra.text){

                        Swal.fire({
                            title: `Felicidades, has ganado ${this.nombre}!`,
                            text:'¿Deseas guardar esta partida en el registro?',
                            showDenyButton: true,
                            confirmButtonText: "Guardar",
                            denyButtonText: `No gracias`
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.SAVE_MATCH(this.intentos,true)
                                Swal.fire("Partida guardada con exito!", "", "success");
                                this.$router.push({name:'inicio'})
                            } else if (result.isDenied) {
                                this.$router.push({name:'inicio'})
                            }
                            this.ARRIESGAR_METHOD()
                            this.$router.push({name:'inicio'})
                        });
                    }else{
                        this.ARRIESGAR_METHOD()
                        Swal.fire({
                        position: "center",
                         icon: "error",
                        title: `Has perdido ${this.nombre}`,
                        text:'Se te redirigira a la pagina de inicio, gracias por participar!',
                        showConfirmButton: false,
                        timer: 2500
                    });
                    this.$router.push({name:'inicio'})
                    }
                }
            })
        },
        help(){
            Swal.fire({
                    title: "Una ayuda de vez en cuando no viene mal..",
                    text: this.palabra.help,
                    icon: "question"
                    });
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
        width: 500px
        height: 600px
        background: white
        border-radius: 5px
        overflow: hidden
        display: flex
        align-items: center
        justify-content: space-around
        flex-direction: column

        h1
            font-size: 50px
            color: #880491

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

        p
            font-size: 30px

    .inputs
        display: flex
        width: 100%
        justify-content: space-around

        input
            border: 2px solid black
            height: 40px
            width: 40px
            border-radius: 50%
            text-align: center
            font-size: 20px
            outline: none


.arriesgar
    display: flex
    flex-direction: column
    align-items: center

.option
    width: 100%
    height: 100px
    display: flex
    justify-content: center
    align-items: center 
    color: grey

    &:hover
        cursor: pointer

</style>