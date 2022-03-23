<template>
  <div>
        <hero />  
        <div>
          <about />
        </div>

  </div>
</template>

<script>
import About from '../components/index/About.vue'
import Hero from '../components/index/Hero.vue'
export default {
  components: { Hero,About },
  name: 'IndexPage'
}
</script>
