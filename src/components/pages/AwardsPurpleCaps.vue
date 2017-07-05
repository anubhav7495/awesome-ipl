<template>
  <div class="row">
    <bar-chart
      :data="data"
      :domain="domain"
      :margin="margin"
      :barColor="barColor"
      :tip-label="tipLabel"
    />
    <div class="col col-6">
      <h3>Purple Cap Awards</h3>
      <p>
        This chart visualizes all the Purple cap winners in IPL from (2008-2016)
        in left-to-right direction.
      </p>
      <p>
        Purple Cap is awarded to the Bowler with most wickets at the end of every
        IPL season.
      </p>
      <small>* Hover over the bars to see the actual values</small>
    </div>
    <div class="col col-6">
      <h3>Trivia</h3>
      <ul>
        <li>
          Dwayne Bravo has won the purple cap twice, in 2013 & 2015.
        </li>
        <li>
          Dwayne Bravo took the most wickets(32) in 2011, most for any purple
          cap winner.
        </li>
        <li>
          RP singh in 2009, Mohit Sharma in 2014 and Bhuvneshwar Kumar in 2016,
          won the purple cap with exact same wicket haul(23).
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BarChart from '../charts/BarChart';

  export default {
    name: 'awards-orange-caps',
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
        domain: { x: 'bowler', y: 'wickets' },
        barColor: '#9C27B0',
        tipLabel: 'wickets',
      };
    },
    mounted() {
      fetch('data/purple-caps-awards.json').then(res => res.json())
        .then(this.mungeData)
        .catch(e => console.error(e));
    },
    methods: {
      mungeData(response) {
        this.data = response.reverse();
      },
    },
  };
</script>
