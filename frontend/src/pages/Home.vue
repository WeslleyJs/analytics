<template>
  <div class="bgColor">
    <div class="container">
      <div class="row">
        <div data-aos="fade-left" data-aos-delay="400" class="col-lg-6 d-flex flex-column justify-content-center">
          <h1 data-aos-delay="400" class="aos-init aos-animate">Oferecemos soluções modernas para seu e-commerce</h1>
          <h2 data-aos="fade-up" data-aos-delay="400" class="aos-init aos-animate">Somos uma equipe talentosa dispostos
            a
            te ajudar</h2>
        </div>
        <div class="col-lg-6 hero-img aos-init aos-animate" data-aos="zoom-out" data-aos-delay="200">
          <img data-aos="fade-left" data-aos-delay="400" src="../assets/img/hero-img.png" class="img-fluid" alt="">
        </div>
      </div>
    </div>
  </div>
  <div class="container space">
    <div class="row">
      <div class="col-lg-6 hero-img aos-init aos-animate" data-aos="zoom-out" data-aos-delay="200">
        <img data-aos="fade-right" data-aos-delay="400" src="../assets/img/features-2.png"
          style="width=50px; height=50px;" class="img-fluid" alt="">
      </div>
      <div class="col-lg-6 d-flex flex-column justify-content-center">
        <h3 id="about" data-aos="fade-down" class="aos-init aos-animate"><b>Sobre-nós</b></h3>
        <h4 data-aos="fade-down" data-aos-delay="400" class="aos-init aos-animate">
          Nossa Ferramenta tem como propósito, passar aos sellers uma visão maior sobre o mercado e
          seus concorrentes trazendo maior competitividade no mercado
          com anúncios mais atrativos.
        </h4>
        <p data-aos="fade-down" data-aos-delay="700" class="aos-init aos-animate">
          Vale lembrar que a API do Mercado Livre não fornece as informações precisas das informações.
          Tendo em mente de trazer privacidade para seus sellers.Sendo assim as informações presentes
          nesta ferramenta, trata-se de um valor aproximado, que o próprio Mercado Livre fornece em suas API's
        </p>
      </div>
    </div>
  </div>
  <div class="bgColor">
  <div class="container space">
    <div class="row">
      <div data-aos="fade-right" data-aos-delay="300" class="col-lg-6 d-flex flex-column justify-content-center">
        <h3 id="about" data-aos="fade-down" class="aos-init aos-animate"><b>Serviços</b></h3>
        <h4 data-aos="fade-right" data-aos-delay="300" class="aos-init aos-animate">    
          Com nossa ferramenta é possível:
        </h4>
        <ul data-aos="fade-right" data-aos-delay="300">
          <li>Variações mais vendidas</li>
          <li>Data de cadastro</li>
          <li>Modalidade e valor de frete</li>
        </ul>
      </div>
      <div class="col-lg-6 hero-img aos-init aos-animate" data-aos="zoom-out" data-aos-delay="200">
        <img data-aos="fade-down" data-aos-delay="300" src="https://preview.uideck.com/items/appvilla/assets/images/hero/phone.png"
          style="width=50px; height=50px;" class="img-fluid" alt="">
      </div>
    </div>
  </div>
</div>
<Footer />

</template>
<script>
import Footer from '../components/Footer.vue'
export default {
  name: 'home-page',
  components:{
    Footer,
  }
}
</script>
<style scoped >
.space {
  margin-top: 2%;
}

/* .btn-edit{
        width: 30%;
        height: 35%;

    } */
.bgColor {
  background-color: rgba(93, 49, 126, 0.2);
  width: 100%;
}
ul, li{
  list-style: none;
}
a {
  color: aliceblue;
  text-decoration: none;
}
</style>