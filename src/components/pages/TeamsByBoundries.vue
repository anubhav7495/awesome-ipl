<template>
  <div class="row">
    <grouped-bar-chart
      :data="data"
      :domain="domain"
      :margin="margin"
      :keys="keys"
    />
    <div class="col col-6">
      <h3>Top Teams: Boundries</h3>
      <p>This chart visualizes the IPL teams across all seasons based on</p>
      <ul>
        <li>Total Sixes Hit</li>
        <li>Total Fours Hit</li>
      </ul>
      <small>* Hover over the bars to see the actual values</small>
    </div>
    <div class="col col-6">
      <h3>Trivia</h3>
      <ul>
        <li>
          Royal Challengers Banglore appears to be the most explosive side in IPL
          with highest number of sixes scored.
        </li>
        <li>
          Mumbai Indians have scored the most fours for a IPL side.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import GroupedBarChart from '../charts/GroupedBarChart';

  export default {
    name: 'teams-by-boundries',
    components: { GroupedBarChart },
    data() {
      return {
        margin: { left: 40, right: 10, top: 15, bottom: 30 },
        data: [],
        domain: { x: 'teamAbbr' },
        keys: ['fours', 'sixes'],
      };
    },
    mounted() {
      fetch('data/team-fours-and-sixes.json').then(res => res.json())
        .then(this.mungeData)
        .catch(e => console.error(e));
    },
    methods: {
      mungeData(response) {
        this.data = response.sort((a, b) => (b.fours + b.sixes) - (a.fours + a.sixes))
          .reverse();
      },
    },
  };
</script>
