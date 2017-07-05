<template>
  <div id="app">
    <sidebar :isSideBarOpen="isSideBarOpen" v-on:close="closeSidebar" />
    <div class="container" :class="{ overlay:isSideBarOpen }">
      <div class="header">
        <svg height="32px" width="32px" class="ham-icon" @click="openSidebar">
          <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,
            8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,
            0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,
            2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
          />
        </svg>
        Awesome IPL
      </div>
      <div class="main">
        <div class="container-fixed">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from './components/Sidebar';

export default {
  name: 'app',
  components: {
    sidebar,
  },
  data() {
    return {
      isSideBarOpen: false,
    };
  },
  methods: {
    openSidebar: function openSidebar() {
      this.isSideBarOpen = true;
    },
    closeSidebar: function closeSidebar() {
      this.isSideBarOpen = false;
    },
  },
};
</script>

<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  body,
  button,
  input,
  select {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 1.4;
    color: #333;
  }

  body {
    overflow: hidden;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  small { display: block; }

  .container {
    position: relative;
    margin-left: 280px;
    padding-top: 50px;
    transition: all 0.3s;
  }
  .overlay {
    background-color: rgba(0, 0, 0, 0.25);
  }

  .header {
    position: absolute;
    height: 50px;
    text-align: center;
    top: 0;
    left: 0;
    right: 0;
    line-height: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
    background: #3f51b5;
    color: #fff;
    z-index: 9;
    font-size: 18px;
  }

  .ham-icon {
    position: absolute;
    left: 15px;
    top: 8px;
    fill: #fff;
    display: none;
    cursor: pointer;
  }

  .main {
    height: calc(100vh - 50px);
    overflow: auto;
  }

  .container-fixed {
    padding: 0 15px;
    padding-top: 5px;
  }

  .row::before,
  .row::after {
    content: " ";
    display: table;
  }

  .row::after {
    clear: both;
  }

  .row + .row {
    margin-top: 1.6%;
  }

  .col {
    position: relative;
    float: left;
    margin-right: 1.6%;
  }
  .col:last-child {
    margin-right: 0;
  }

  .col-offset-2 {
    margin-left: 15.33333%;
  }
  .col-4 {
    width: 32.26667%;
  }
  .col-6 {
    width: 49.2%
  }
  .col-12 {
    width: 100%;
  }

  .txt-cntr {
    text-align: center;
  }

  .tick text {
    font-size: 11px;
  }

  .chart {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  }

  .tooltip {
    position: absolute;
    text-align: center;
    padding: 5px 10px;
    font-size: 12px;
    background: #eee;
    border: 0;
    border-radius: 3px;
    pointer-events: none;
  }

  .tooltip::after {
    content: " ";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 10px;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #eee transparent transparent transparent;
  }

  .axis text { font-size: 10px; }

  .axis path, .axis line {
    fill: none;
    stroke: #e0e0e0;
    shape-rendering: crispEdges;
  }

  @media (min-width: 1440px) {
    .container-fixed {
      padding: 0;
      max-width: 1140px;
      margin: 0 auto;
    }
  }

  @media (max-width: 960px) {
    .container { margin-left: 0; }
    .sidebar   { transform: translate(-281px, 0); }
    .ham-icon  { display: block; }
  }

  @media (max-width: 600px) {
    .container-fixed {
      padding-left: 10px;
      padding-right: 10px;
    }
    .col { margin-right: 0; }
    .col-4,
    .col-6,
    .col-12 {
      width: auto;
      float: none;
    }

    .col-offset-2 { margin-left: 0; }
  }

  @media (max-width: 480px) {
    .axis text { font-size: 8px; }
    .tooltip {
      font-size: 9px;
      padding: 3px 6px;
    }
  }
</style>
