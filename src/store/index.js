import { createStore } from 'vuex'

export default createStore({
  state: {
    nombre:'',
    palabras:[{text:'hola',help:'forma de saludar'},{text:'comedia',help:'Estilo de entretenimiento'},{text:'heroes',help:'Personas dispuestas a ir más allá de su responsabilidad cuando la vida de otro está en riesgo'},{text:'cafe',help:'Bebida consumida normalmente para iniciar el dia'},{text:'vacaciones',help:'Etapa del año que todas las personas esperan'},{text:'invierno',help:'Etapa del año donde la gente suele enfermarse'}],
    palabra:'',
    espacios:[],
    intentos:5,
    registro:[]
  },
  mutations: {
    START_GAME(state,nombre){

        state.nombre = nombre
        state.palabra = state.palabras[Math.floor(Math.random()*state.palabras.length)]
        state.espacios = Array(state.palabra.text.split("").length).fill(" ")
        state.intentos = 5
    },
    INCORRECT_ANSWER(state){
      state.intentos = state.intentos - 1
    },
    ARRIESGAR_METHOD(state){
      state.intentos = 0
    },
    SAVE_MATCH(state,intento,data){
        state.registro.push({nombre:state.nombre,intentos:intento,resultado:data})
    },
    RESET_GAME(state){
      state.nombre=''
    }
  }
})
