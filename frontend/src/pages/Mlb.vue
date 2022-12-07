<template>
    <div id="mlb-tex">
        <div class="search-box bg-gradient">
            <input type="text" class="search-text" v-model="id" placeholder="MLB">
            <button class="btn search-button btn-warning" @click="search">
                <img src="../assets/img/icons8-pesquisar-480.svg" height="35" width="35">
            </button>
            <!-- <input id="text-input" class="input-search" type="text" v-model="id"
                placeholder="Search MLB">
            <input class="input-search2 btn btn-info" type="submit" @click="search"> -->
        </div>
        <p>ID de Teste: <b>MLB1830777149</b></p>
        <p>ID de Teste: <b>MLB2832356661</b></p>
        <div v-if="mlb" class="card borderT">
            <div class="card-body">
                <h6><b>Título: {{ mlb.title }}</b></h6>
                <p><b>Data de Cadastro: {{ mlb.date_created }}</b></p>
                <p><b>Estoque: {{ mlb.available_quantity }}</b></p>
                <p><b>{{ mlb.sold_quantity }} Vendidos</b></p>
                <img :src="imgPng">
            </div>
            <ul class="mx-auto card-group w800">
                <li class="card-body myBox backgroundEffect" v-for="item in mlb.variations" :key="item.id">
                    <p><b>Atributos: {{ item.attribute_combinations[0].value_name }}</b></p>
                    <p v-if="attribute"><b>Atributos 02: {{ item.attribute_combinations[2].value_name }}</b></p>
                    <p><b>Estoque: {{ item.available_quantity }}</b></p>
                    <p><b>Vendidos: {{ item.sold_quantity }}</b></p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'; //MLB1830777149
export default {
    name: 'mlb-text',
    data() {
        return {
            id: '',
            mlb: '',
            imgPng: '',
            attribute: '',
        }
    },
    methods: {
        async search() {

            await axios.get(`http://localhost:3000/itens/analytics/${this.id}`).then(res => {
                const data = res.data;

                this.mlb = data;
                const attributes = data.variations;
                attributes.forEach(element => {
                    const imgPng = element.picture_ids;
                    this.imgPng = `http://http2.mlstatic.com/D_${imgPng[0]}-O.jp`
                    this.attribute = element.attribute_combinations[2].value_name
                })
                return
            }).catch(err => console.log(err));

        }

    },
}
</script>
<style scoped>
.search-box {
    margin-left: 50%;
    margin-top: 2%;
    width: 400px;
    transform: translate(-50%);
    height: 40px;
    padding: 10px;
    border-radius: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-text {
    /* border: black; */
    /* background: none; */
    outline: none;
    padding: 2px;
    font-size: 16px;
    line-height: 40px;
    margin: 0;
    margin-left: 20px;
    border-radius: 40px;
    width: 100%;
}

.search-text::placeholder {
    display: flex;
    padding: 10px;
    font-family: monospace;
}

.search-button {
    position: relative;
    margin-left: -11%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    margin-top: 2%;
}

.mxW {
    max-height: 10%;
}

a {
    color: aliceblue;
    text-decoration: none;
}

img {
    width: 150px;
}

ul,
li {
    list-style: none;
}

@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

.w800 {
    max-width: 800px;
}

.borderT {
    border: none;
    /* background-color: #eee3e3; */
    /* max-width: 100%; */
    margin-left: 60px;
    margin-right: 60px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.myBox {
    /* width: 280px;
    height: 520px; */
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background: #fff;
    transition: all 0.5s ease;
    cursor: pointer;
    user-select: none;
    z-index: 10;
    border: solid 1px;
    max-width: 30%;
    margin: 2px;
    margin-top: 2%;
    border-radius: 5px;
    overflow: hidden
}

.myBox .backgroundEffect {
    bottom: 0;
    height: 0px;
    width: 100%
}

.myBox:hover {
    color: #fff;
    transform: scale(1.025);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 5px 10px;
    background: rgb(132, 137, 132);
}

.myBox:hover .backgroundEffect {
    bottom: 0;
    height: 320px;
    width: 100%;
    position: absolute;
    z-index: -1;
    background: #1b9ce3;
    animation: popBackground 0.3s ease-in
}

@keyframes popBackground {
    0% {
        height: 20px;
        border-top-left-radius: 50%;
        border-top-right-radius: 50%
    }

    50% {
        height: 80px;
        border-top-left-radius: 75%;
        border-top-right-radius: 75%
    }

    75% {
        height: 160px;
        border-top-left-radius: 85%;
        border-top-right-radius: 85%
    }

    100% {
        height: 320px;
        border-top-left-radius: 100%;
        border-top-right-radius: 100%
    }
}

.myBox .pic {
    position: relative
}

.myBox .pic img {
    width: 100%;
    height: 280px;
    object-fit: cover
}

.myBox .date {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 70px;
    background-color: #1b9ce3;
    color: white;
    position: absolute;
    bottom: 0px;
    transition: all ease
}

.myBox .date .day {
    font-size: 14px;
    font-weight: 600
}

.myBox .date .month,
.myBox .date .year {
    font-size: 10px
}

.myBox .text-muted {
    font-size: 12px
}

.myBox:hover .text-muted {
    color: #fff !important
}

.myBox .content {
    padding: 0 20px
}

.myBox .content .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    background-color: #1b9ce3;
    border-radius: 25px;
    font-size: 12px;
    border: none
}

.myBox:hover .content .btn {
    background: #fff;
    color: #1b9ce3;
    box-shadow: #0000001a 0px 3px 5px
}

.myBox .content .btn .fas {
    font-size: 10px;
    padding-left: 5px
}

.myBox .content .foot .admin {
    color: #1b9ce3;
    font-size: 12px
}

.myBox:hover .content .foot .admin {
    color: #fff
}

.myBox .content .foot .icon {
    font-size: 12px
}
</style>