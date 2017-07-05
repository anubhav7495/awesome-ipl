<template>
  <div class="row">
    <grouped-bar-chart
      :data="data"
      :domain="domain"
      :margin="margin"
      :keys="keys"
    />
    <div class="col col-6">
      <h3>Top Batsmen: By Boundries</h3>
      <p>
        This chart visualizes top 10 batsmen by:
      </p>
      <ul>
        <li> Total Sixes Hit </li>
        <li> Total Fours Hit </li>
      </ul>
      <small>* Hover over the bars to see the actual values</small>
    </div>
    <div class="col col-6">
      <h3>Trivia</h3>
      <ul>
        <li>
          Chris Gayle of Royal Challengers Banglore has the most sixes at 247, and
          he leads by a huge margin.
        </li>
        <li>
          Gautam Gambhir of Kolkata Knight Riders has the most fours at 427.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import GroupedBarChart from '../charts/GroupedBarChart';

  export default {
    name: 'batsmen-boundries',
    components: { GroupedBarChart },
    data() {
      return {
        data: [],
        margin: {
          left: 35,
          right: 10,
          top: 15,
          bottom: 30,
        },
        domain: { x: 'batsman' },
        keys: ['fours', 'sixes'],
      };
    },
    mounted() {
      fetch('data/batsmen-fours-and-sixes.json').then(res => res.json())
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
