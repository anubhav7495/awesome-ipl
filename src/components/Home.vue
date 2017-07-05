<template>
  <div class="row">
    <h2 class="primary">Awesome IPL dashboard</h2>
    <p class="lead">
      The Indian Premier League is a professional Twenty20 cricket league in
      India contested during April and May of every year by teams representing
      Indian cities.
    </p>
    <p class="lead">
      Awesome IPL dashboard is a collection of visualizations and trivia
      of IPL data from 2008 to 2016 season.
    </p>
    <div class="row">
      <div class="col col-4">
        <router-link :to="{ path: '/finals' }" class="sidebar-link btn-link">
          Season Finals
        </router-link>
        <p class="small">
          Which team has won the IPL <b>most times</b>? Which team is most likely to reach
          an IPL final <b>every year</b>?
        </p>
      </div>
      <div class="col col-4">
        <router-link :to="{ path: '/batsmen-total-runs' }" class="sidebar-link btn-link">
          Top Batsmen
        </router-link>
        <p class="small">
          Visualizations of top IPL Batsmen based on <b>Runs scored</b>, <b>Individual scores</b>
          & <b>4's and 6's scored</b>
        </p>
      </div>
      <div class="col col-4">
        <router-link :to="{ path: '/bowler-total-wickets' }" class="sidebar-link btn-link">
          Top bowlers
        </router-link>
        <p class="small">
          Visualizations of top IPL Bowlers based on <b>Wickets taken</b>, <b>Over's bowled</b>
          & <b>Bowling economy</b>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col col-4 col-offset-2">
        <router-link :to="{ path: '/awards-motm' }" class="sidebar-link btn-link">
          Player Awards
        </router-link>
        <p class="small">
          Who has won most <b>Man of the Match</b> awards,
          <b>Orange Caps</b> Or <b>Purple Caps</b> across the seasons?
        </p>
      </div>
      <div class="col col-4">
        <router-link :to="{ path: '/team-wins' }" class="sidebar-link btn-link">
          Top Teams
        </router-link>
        <p class="small">
          Visualizations of top IPL teams based on <b>Total wins</b>, <b>Matches vs Wins</b>
          & <b>4's and 6's scored</b>
        </p>
      </div>
    </div>
  </div>
</template>

<style>
  .primary { color: #3f51b5; }

  .lead {
    font-size: 18px;
    font-weight: 300;
  }

  .btn-link {
    color: #3f51b5;
    border: 0;
    margin-top: 18px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
  }

  .small {
    padding: 0 15px;
    font-size: 15px;
  }
</style>
