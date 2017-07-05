<template>
  <div class="sidebar" :class="{ 'sidebar-open': isSideBarOpen }">
    <img src="../assets/ipl-logo.png" alt="ipl logo" class="logo hide-md">
    <button class="btn back-btn show-md" @click="closeSideBar" >&larr;</button>
    <router-link
      :to="{ path: '/' }"
      class="sidebar-link"
      active-class="active"
      exact
    >
      Home
    </router-link>
    <router-link :to="{ path: '/finals' }" class="sidebar-link" active-class="active">
      Season Finals
    </router-link>
    <button class="btn collapse-btn" @click="toggle">Top Teams</button>
    <div class="collapse-panel">
      <router-link :to="{ path: '/team-wins' }" class="sidebar-link" active-class="active">
        by Wins
      </router-link>
      <router-link :to="{ path: '/team-boundries' }" class="sidebar-link" active-class="active">
        by Boundries
      </router-link>
    </div>
    <button class="btn collapse-btn" @click="toggle">Top Batsmen</button>
    <div class="collapse-panel">
      <router-link :to="{ path: '/batsmen-total-runs' }" class="sidebar-link" active-class="active">
        by Runs
      </router-link>
      <router-link :to="{ path: '/batsmen-individual-scores' }" class="sidebar-link" active-class="active">
        by Scores
      </router-link>
      <router-link :to="{ path: '/batsmen-boundries' }" class="sidebar-link" active-class="active">
        by Boundries
      </router-link>
    </div>
    <button class="btn collapse-btn" @click="toggle">Top Bowlers</button>
    <div class="collapse-panel">
      <router-link :to="{ path: '/bowler-total-wickets' }" class="sidebar-link" active-class="active">
        by Wickets
      </router-link>
      <router-link :to="{ path: '/bowler-economy' }" class="sidebar-link" active-class="active">
        by Economy
      </router-link>
    </div>
    <button class="btn collapse-btn" @click="toggle">Player Awards</button>
    <div class="collapse-panel">
      <router-link :to="{ path: '/awards-motm' }" class="sidebar-link" active-class="active">
        Man of Match
      </router-link>
      <router-link :to="{ path: '/awards-orange-caps' }" class="sidebar-link" active-class="active">
        Orange Caps
      </router-link>
      <router-link :to="{ path: '/awards-purple-caps' }" class="sidebar-link" active-class="active">
        Purple Caps
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    props: {
      isSideBarOpen: {
        type: Boolean,
        default: () => false,
      },
    },
    methods: {
      toggle: function toggleCollapse(e) {
        e.target.classList.toggle('active');
        const panel = e.target.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = `${panel.scrollHeight}px`;
        }
      },
      closeSideBar: function closeSideBar() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  .logo {
    max-width: 279px;
    height: auto;
    display: block;
    border-bottom: 1px solid #eee;
  }

  .sidebar {
    position: fixed;
    background: #fff;
    height: 100%;
    width: 280px;
    transition: all 0.3s;
    z-index: 10;
    border-right: 1px solid #eee;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .sidebar-open {
    transform: translateX(0);
  }

  .sidebar-link {
    display: block;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    outline: 0;
    text-align: center;
    padding: 8px 16px;
    border-bottom: 1px solid #eee;
    font-size: inherit;
  }

  .sidebar-link.active, .sidebar-link:hover {
    background-color: #3f51b5;
    color: #fff;
  }

  .btn {
    background: #fff;
    border: none;
    display: block;
    width: 100%;
    outline: none;
  }

  .back-btn {
    height: 50px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
    font-size: 32px;
    display: none;
  }
  .back-btn:hover {
    background-color: #3f51b5;
    color: #fff;
  }

  .collapse-btn {
    padding: 8px 16px;
    border: 0;
    border-bottom: 1px solid #e0e0e0;
  }
  .collapse-btn:hover,
  .collapse-btn.active { background: #eee; }

  .collapse-btn::after {
    content: "\25BE";
    float: right;
    color: #3f51b5;
    transition: transform 0.5s ease-in-out;
  }
  .collapse-btn.active::after { transform: rotate(180deg); }
  .collapse-panel {
    background-color: white;
    max-height: 0;
    overflow: hidden;
    font-size: 14px;
    transition: max-height 0.3s ease-out;
  }

  @media (max-width: 960px) {
    .hide-md { display: none; }
    .back-btn { display: block; }
  }
</style>
