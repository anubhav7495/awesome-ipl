<template>
  <div class="row">
    <bar-chart
      :data="data"
      :domain="domain"
      :margin="margin"
    />
    <div class="col col-6">
      <h3>Man of the Match Awards</h3>
      <p>
        This chart visualizes top 10 players the have won the most Man of the Match
        awards across all seasons of IPL.
      </p>
      <p>
        Man of the Match Awards is given after each match to the best performer.
      </p>
      <small>* Hover over the bars to see the actual values</small>
    </div>
    <div class="col col-6">
      <h3>Trivia</h3>
      <ul>
        <li>
          Chris Gayle leads the list, being awarded the MOTM 17 times in IPL.
        </li>
        <li>
          Yusuf pathan and AB de Villiers follow with 16 and 15 MOTM awards
          respectively.
        </li>
        <li>
          Sadly, no bowlers make it to the top 10 list.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BarChart from '../charts/BarChart';

  export default {
    name: 'awards-motm',
    components: { BarChart },
    data() {
      return {
        data: [],
        margin: {
          left: 30,
          right: 5,
          top: 15,
          bottom: 30,
        },
        domain: { x: 'player', y: 'count' },
      };
    },
    mounted() {
      fetch('data/man-of-match-awards.json').then(res => res.json())
        .then(this.mungeData)
        .catch(e => console.error(e));
    },
    methods: {
      mungeData(response) {
        this.data = response.sort((a, b) => b.count - a.count)
          .slice(0, 10)
          .reverse();
      },
    },
  };
</script>
