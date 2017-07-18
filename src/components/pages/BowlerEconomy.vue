<template>
  <div class="row">
    <bar-chart :data="data" :domain="domain" :margin="margin" />
    <div class="col col-6">
      <h3>Top Bowlers: By Economy</h3>
      <p>
        This chart visualizes top 10 most economical bowlers across all seasons
        of IPL.
      </p>
      <p>
        Economy = Total Runs Conceded / Total Overs Bowled.
      </p>
      <small>** Only bowlers that have bowled 300+ overs are included.</small>
      <small>* Hover over the bars to see the actual values</small>
    </div>
    <div class="col col-6">
      <h3>Trivia</h3>
      <ul>
        <li>
          Lasith Malinga of Mumbai Indians is the most economical bowler across
          all seasons on IPL with an economy of 6.349.
        </li>
        <li>
          Ravichandran Ashwin comes second with a small margin at 6.359.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BarChart from '../charts/BarChart';

  export default {
    name: 'bowler-economy',
    components: { BarChart },
    data() {
      return {
        data: [],
        margin: {
          left: 25,
          right: 5,
          top: 15,
          bottom: 30,
        },
        domain: { x: 'bowler', y: 'economy' },
      };
    },
    mounted() {
      fetch('data/bowler-overs-and-runs.json').then(res => res.json())
        .then(this.mungeData)
        .catch(e => console.error(e));
    },
    methods: {
      mungeData(response) {
        this.data = response.map(row => ({
          bowler: row.bowler,
          economy: (row.runs / row.overs).toFixed(3),
        }))
        .sort((a, b) => a.economy - b.economy)
        .slice(0, 10)
        .reverse();
      },
    },
  };
</script>
