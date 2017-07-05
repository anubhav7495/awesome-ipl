<template>
  <div class="row">
    <bar-chart
      :data="data"
      :domain="domain"
      :margin="margin"
    />
    <div class="col col-6">
      <h3>Top Batsmen: Total Runs</h3>
      <p>
        This chart visualizes top 10 batsmen with most runs scored across all
        the seasons of IPL.
      </p>
      <small>* Hover over the bars to see the actual values</small>
    </div>
    <div class="col col-6">
      <h3>Trivia</h3>
      <ul>
        <li>
          Virat Kohli of Royal Challengers Banglore has scored 4115 runs, the most
          for any batsman in IPL.
        </li>
        <li>
          Suresh Raina of Chennai Super kings is second on the list by a difference of
          only 9 runs at 4106.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BarChart from '../charts/BarChart';

  export default {
    name: 'batsmen-total-runs',
    components: { BarChart },
    data() {
      return {
        data: [],
        margin: {
          left: 40,
          right: 5,
          top: 15,
          bottom: 30,
        },
        domain: { x: 'batsmen', y: 'totalRuns' },
      };
    },
    mounted() {
      fetch('data/batsmen-total-runs.json').then(res => res.json())
        .then(this.mungeData)
        .catch(e => console.error(e));
    },
    methods: {
      mungeData(response) {
        this.data = response
          .sort((a, b) => b.totalRuns - a.totalRuns)
          .slice(0, 10)
          .reverse();
      },
    },
  };
</script>
