<template>
  <div class="home">
    <WhoAreYou 
      message=" Developped by Esteban VINCENT, Marty EVUORT and Matthieu EVUORT, this web site is a Web project on which you can play the Battleship's game, 
                have a ranking, have an account and different other things. It's just a project for a class and won't never be released." 
    />
    <Services />
  </div>
</template>

<script>
import WhoAreYou from '@/components/WhoAreYou'
import Services from '@/components/Services'

export default {
  name: 'Home',
  components: { WhoAreYou, Services }
}
</script>
