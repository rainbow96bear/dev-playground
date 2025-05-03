<script lang="ts">
    import "./+layout.css"
    import potentialImg from "$lib/assets/potential.png"
    import Header from "$Components/Header/Header.svelte"
    import Footer from "$Components/Footer/Footer.svelte"
</script>

<div class="baseStyle">
  <Header/>
  <div class="content_box">
    <slot/>
  </div>
  <Footer className ="footer"/>
</div>
