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
      <h3>Orange Cap Awards</h3>
      <p>
        This chart visualizes all the orange cap winners in IPL from (2008-2016)
        in left-to-right direction.
      </p>
      <p>
        Orange Cap is awarded to the Batsman with most runs at the end of
        every IPL season.
      </p>
      <small>* Hover over the bars to see the actual values</small>
    </div>
    <div class="col col-6">
      <h3>Trivia</h3>
      <ul>
        <li>
          Virat Kohli won the award in 2016 by scoring 973 runs, highest for any
          orange cap winner.
        </li>
        <li>
          Chris Gayle has won orange cap twice & consecutively, in 2011 and 2012.
        </li>
        <li>
          Chris Gayle in 2012 and Mike Hussey in 2013 both scored the same amount
          of runs(733) to win the orange cap.
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
          left: 35,
          right: 5,
          top: 15,
          bottom: 30,
        },
        domain: { x: 'batsman', y: 'runs' },
        barColor: '#FF9800',
        tipLabel: 'runs',
      };
    },
    mounted() {
      fetch('data/orange-caps-awards.json').then(res => res.json())
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
