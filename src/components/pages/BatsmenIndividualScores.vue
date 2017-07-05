<template>
  <div class="row">
    <bar-chart
      :data="data"
      :domain="domain"
      :margin="margin"
      :tip-label="tipLabel"
      :bar-color="barColor"
    />
    <div class="col col-6">
      <h3>Top Batsmen: By Individual Scores</h3>
      <p>
        This chart visualizes top 10 batsmen with highest individual score in an
        IPL match across all seasons.
      </p>
      <small>* Hover over the bars to see the actual values</small>
    </div>
    <div class="col col-6">
      <h3>Trivia</h3>
      <ul>
        <li>
          Chris Gayle of Royal Challengers Banglore leads the chart with a massive
          score of 175 runs, scored against Pune Warriors.
        </li>
        <li>
          CH Gayle has 3 entries in top 10, followed by AB de Villiers and Virender Sehwag,
          both at 2 entries.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BarChart from '../charts/BarChart';

  export default {
    name: 'batsmen-individual-scores',
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
        domain: { x: 'batsmen', y: 'score' },
        tipLabel: 'score',
        barColor: '#66BB6A',
      };
    },
    mounted() {
      fetch('data/batsmen-individual-scores.json').then(res => res.json())
        .then(this.mungeData)
        .catch(e => console.error(e));
    },
    methods: {
      mungeData(response) {
        this.data = response.slice(0, 10).reverse();
      },
    },
  };
</script>
