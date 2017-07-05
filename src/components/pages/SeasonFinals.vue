<template>
  <div class="row">
    <grouped-bar-chart
      :data="data"
      :domain="domain"
      :margin="margin"
      :keys="keys"
      :tip-label="tipLabel"
    />
    <div class="col col-6">
      <h3>Season Final Analysis</h3>
      <p>
        This chart visualizes teams by:
      </p>
      <ul>
        <li> IPL Final Appearences </li>
        <li> IPL Final Wins </li>
      </ul>
      <small>* Hover over the bars to see the actual values</small>
    </div>
    <div class="col col-6">
      <h3>Trivia</h3>
      <ul>
        <li>
          Chennai Super Kings have the most final appearences at 6.
        </li>
        <li>
          Kolkata Knight Riders have won 2 out of 2 finals.
        </li>
        <li>
          Mumbai Indians, Kolkata Knight Riders and Chennai Super Kings have won
          2 titles each, making them the most successful teams.
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
          left: 30,
          right: 10,
          top: 15,
          bottom: 40,
        },
        domain: { x: 'team' },
        keys: ['played', 'wins'],
        tipLabel: 'count',
      };
    },
    mounted() {
      fetch('data/season-finals.json').then(res => res.json())
        .then(this.mungeData)
        .catch(e => console.error(e));
    },
    methods: {
      mungeData(response) {
        const finals = response.reduce((acc, row) => {
          if (!acc[row.team1]) acc[row.team1] = { played: 0, wins: 0 };
          if (!acc[row.team2]) acc[row.team2] = { played: 0, wins: 0 };
          acc[row.team1].played += 1;
          acc[row.team2].played += 1;
          acc[row.winner].wins += 1;
          return acc;
        }, {});

        this.data = Object.entries(finals).map(([team, obj]) => {
          const played = obj.played;
          const wins = obj.wins;
          return { team, played, wins };
        })
        .sort((a, b) => a.played - b.played);
      },
    },
  };
</script>
