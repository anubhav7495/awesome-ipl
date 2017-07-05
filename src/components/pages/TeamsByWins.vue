<template>
  <div class="row">
    <stacked-bar-chart
      :data="data"
      :margin="margin"
      :keys="keys"
      :tip-label="tipLabel"
      :domain="domain"
    />
    <div class="col col-6">
      <h3>Top Teams: Matches Vs Wins</h3>
      <p>This chart visualizes the IPL teams across all seasons based on</p>
      <ul>
        <li>Total Matches Played</li>
        <li>Total Match Wins</li>
      </ul>
      <small>* Hover over the bars to see the actual values</small>
    </div>
    <div class="col col-6">
      <h3>Trivia</h3>
      <ul>
        <li>
          Mumbai Indian have the highest number of match wins among all other teams
          at 80 matches.
        </li>
        <li>
          Chennai super kings are the second most successful side in IPL behind Mumbai
          Indians.
        </li>
        <li>
          Both Teams have won 2 IPL titles each.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import StackedBarChart from '../charts/StackedBarChart';

  export default {
    name: 'teams-by-wins',
    components: { StackedBarChart },
    data() {
      return {
        margin: { left: 35, right: 20, top: 10, bottom: 25 },
        data: [],
        keys: ['total', 'wins'],
        domain: { x: 'teamAbbr' },
        tipLabel: 'matches',
      };
    },
    mounted() {
      fetch('data/team-matches-vs-wins.json').then(res => res.json())
        .then(this.mungeData)
        .catch(e => console.error(e));
    },
    methods: {
      mungeData(response) {
        this.data = response
          .sort((a, b) => b.wins - a.wins);
      },
    },
  };
</script>
