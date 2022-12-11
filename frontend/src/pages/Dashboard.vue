<template>
    <nav>
        <ul>
            <li id="options" class="ul-btn" @click="clk = !clk">
                <h4><b>{{ clk ? 'Results' : 'DashBoards' }}</b></h4>
            </li>
        </ul>
        <label for="options" @click="clk = !clk">{{ clk ? 'Dashboard' : 'Results' }}</label>
    </nav>
    <div class="transi search-box bg-gradient">
        <input @keyup.enter="search" type="text" class="search-text" v-model="id" placeholder="MLB">
        <button class="btn search-button btn-success" @click="search">
            <img src="../assets/img/icons8-pesquisar-480.svg" height="35" width="35">
        </button>
    </div>
    <div v-if="clk">
        <div>
            <br>
            <hr>
            <div v-if="!errors">
                <div v-if="mlb" class="card borderT">
                    <div class="card-body max-li myText">
                        <nav class="imgPng">
                            <img :src="imgPng">
                        </nav>
                        <h6><b>Título: {{ mlb.title }}</b></h6>
                        <p><b>Data de Cadastro: {{ date }}</b></p>
                        <p><b>Estoque: {{ mlb.available_quantity }}</b></p>
                        <p><b>{{ mlb.sold_quantity }} Vendidos</b></p>
                        <p v-if="shipp"><b>Valor Frete Pago Pelo Seller: R${{ shipp }}</b></p>
                        <p v-if="shipp"><b>Peso de Cadastro: {{ kg }}g</b></p>
                    </div>
                    <ul class="mx-auto card-group w800">
                        <li data-aos="flip-right" data-aos-delay="300" class="card-body myBox backgroundEffect"
                            v-for="item in mlb.variations" :key="item.id">
                            <p><b>Atributos: {{ item.attribute_combinations[0].value_name }}</b></p>
                            <p v-if='rootAttribute && rootAttribute.prop'><b>Atributos 02: {{
                                    item.attribute_combinations[2].value_name
                            }}</b></p>
                            <p><b>Estoque: {{ item.available_quantity }}</b></p>
                            <p><b>Vendidos: {{ item.sold_quantity }}</b></p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="chart01" v-show="!clk" style="height:50vh; width: 80vw; margin-top: 20px;">
        <canvas class="chart01" id="myChart"></canvas>
    </div>
    <div>

    </div>

</template>
<script>
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
    name: 'dashboardPage',
    data() {
        return {
            clk: true,
            id: '',
            mlb: '',
            imgPng: '',
            date: '',
            shipp: '',
            kg: '',
            rootAttribute: undefined,
            errors: ''
        }
    },
    async mounted() {

        const datas = {
            labels: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho'],
            datasets: [{
                label: 'Meu primeiro Dashboard',
                data: [65, 59, 80, 81, 56, 55, 48],
                backgroundColor: [
                    'rgba(255,99,132,0.2)',
                    'rgba(255,159,64,0.2)',
                    'rgba(255,205,86,0.2)',
                    'rgba(255,192,192,0.2)',
                    'rgba(54,162,235,0.2)',
                    'rgba(153,102,255,0.2)',
                    'rgba(201,203,207,0.2)',
                ],
                borderColor: [
                    'rgb(255,99,132)',
                    'rgb(255,159,64)',
                    'rgb(255,205,86)',
                    'rgb(255,192,192)',
                    'rgb(255,162,235)',
                    'rgb(153,102,255)',
                    'rgb(201,203,207)',
                ],
                borderWidth: 1
            }],

        }
        const config = {
            type: 'bar',
            data: datas,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
        const ctx = document.getElementById('myChart');
        const myChart = await new Chart(ctx, config);
        myChart

    },
    methods: {
        async search() {
            await axios.get(`http://localhost:3000/itens/analytics/${this.id}`).then(res => {
                const data = res.data;
                this.mlb = data;

                const date = data.date_created;
                this.date = date.slice(0, 10).split('-').reverse().join('/');

                const attributes = data.variations;
                attributes.forEach(element => {
                    element
                    const imgPng = element.picture_ids;
                    this.imgPng = `http://http2.mlstatic.com/D_${imgPng[0]}-O.jp`
                    let attribute02 = element.attribute_combinations[2].value_name;
                    this.attribute = attribute02;
                })
            }).catch(err => {
                this.errors = err.status;
            });
            this.shipping()

        },
        async shipping() {
            await axios.get(`http://localhost:3000/itens/shipping/${this.id}`).then(res => {
                const data = res.data
                this.shipp = data.list_cost;
                this.kg = data.billable_weight;

                console.log(this.kg, this.shipp)
            }).catch(err => console.log(err));
        }
    }
}

</script>
<style scoped>
.max-li {
    display: inline-block;
    justify-content: center;
    width: 800px;
}

.ul-btn {
    cursor: pointer;
}

.myText {
    /* display: flex; */
    text-align: start;
    background-color: red;
    max-width: 50%;
    width: 100%;
    border: solid 0, 5px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background: #fff;
    transition: all 0.5s ease;

}

.imgPng {
    text-align: center;

}

.chart01 {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-left: 10%;
    background: #ffffffcd;
}

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
    margin-left: 30px;
    border-radius: 40px;
    width: 100%;
}

.search-text::placeholder {
    display: flex;
    padding: 10px;
    margin-left: 2px;
}

.search-button {
    position: relative;
    margin-left: -12%;
    width: 43.5px;
    height: 43.5px;
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
    display: flex;
    justify-content: center;
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

.dashboard {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 50%;
    margin-top: 2%;
    max-width: 200px;
    transform: translate(-50%);

}

.myBox {
    display: inline-block;
    /* width: 280px;
    height: 520px; */
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background: #fff;
    transition: all 0.5s ease;
    cursor: pointer;
    user-select: none;
    z-index: 10;
    border: solid 0, 5px;
    max-width: 30%;
    width: 30%;
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