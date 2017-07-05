<template>
  <div class="row">
    <bar-chart
      :data="data"
      :domain="domain"
      :margin="margin"
      :barColor="barColor"
    />
    <div class="col col-6">
      <h3>Top Bowlers: By Wickets</h3>
      <p>
        This chart visualizes top 10 bowlers by total number of wickets taken
        across all IPL seasons.
      </p>
      <small>* Hover over the bars to see the actual values</small>
    </div>
    <div class="col col-6">
      <h3>Trivia</h3>
      <ul>
        <li>
          Lasith Malinga of Mumbai Indians leads the chart with 143 wickets taken.
        </li>
        <li>
          Amit Mishra of Delhi Daredevils comes second with 124 wickets.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BarChart from '../charts/BarChart';

  export default {
    name: 'bowler-total-wickets',
    components: { BarChart },
    data() {
      return {
        data: [],
        margin: {
          left: 35,
          right: 5,
          top: 15,
          bottom: 30,
        },
        domain: { x: 'bowler', y: 'wickets' },
        barColor: '#66BB6A',
      };
    },
    mounted() {
      fetch('data/bowler-wickets.json').then(res => res.json())
        .then(this.mungeData)
        .catch(e => console.error(e));
    },
    methods: {
      mungeData(response) {
        this.data = response
          .sort((a, b) => b.wickets - a.wickets)
          .slice(0, 10)
          .reverse();
      },
    },
  };
</script>
