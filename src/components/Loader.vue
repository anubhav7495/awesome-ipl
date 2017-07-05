<template>
  <div class="loader-box">
    <div class="loader">
      <div class="ripple one"></div>
      <div class="ripple two"></div>
      <div class="ripple three"></div>
      <div class="ripple four"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loader',
};
</script>

<style>
  .loader-box {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
    width: 100%;
    height: 360px;
    position: relative;
  }
  .loader {
    position: absolute;
    height: 60px;
    width: 60px;
    top: 150px;
    left: calc(50% - 30px);
  }
  .ripple {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    position: absolute;
    animation: scale 1s 0s infinite ease-in-out;
    animation-direction: alternate-reverse;
    opacity: 0.7;
  }

  .four { background: #283593; }
  .three {
    background: #3949AB;
    animation-delay: -250ms;
  }
  .two {
    background: #5C6BC0;
    animation-delay: -500ms;
  }
  .one {
    background: #9FA8DA;
    animation-delay: -750ms;
  }

  @keyframes scale {
    from { transform: scale(0); }
    to   { transform: scale(1); }
  }
</style>
