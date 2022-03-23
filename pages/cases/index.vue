<template>
  <div>
      <div>
          <cases-hero />    
      </div>
      <div align="center" class="pt-5">
            <cases-container />
      </div>
    
  </div>
</template>

<script>
import CasesContainer from '../../components/cases/CasesContainer.vue'
import CasesHero from '../../components/cases/CasesHero.vue'
export default {
  components: { CasesContainer, CasesHero },

}
</script>

<style>

</style>