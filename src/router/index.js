import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import TeamsByWins from '@/components/pages/TeamsByWins';
import TeamsByBoundries from '@/components/pages/TeamsByBoundries';
import BatsmenTotalRuns from '@/components/pages/BatsmanTotalRuns';
import BatsmenIndividualScores from '@/components/pages/BatsmenIndividualScores';
import BatsmenBoundries from '@/components/pages/BatsmenBoundries';
import BowlerTotalWickets from '@/components/pages/BowlerTotalWickets';
import BowlerEconomy from '@/components/pages/BowlerEconomy';
import AwardsMOTM from '@/components/pages/AwardsMOTM';
import AwardsOrangeCaps from '@/components/pages/AwardsOrangeCaps';
import AwardsPurpleCaps from '@/components/pages/AwardsPurpleCaps';
import SeasonFinals from '@/components/pages/SeasonFinals';

Vue.use(Router);

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/finals',
      name: 'Finals',
      component: SeasonFinals,
    },
    {
      path: '/team-wins',
      name: 'TeamsByWins',
      component: TeamsByWins,
    },
    {
      path: '/team-boundries',
      name: 'TeamsByBoundries',
      component: TeamsByBoundries,
    },
    {
      path: '/batsmen-total-runs',
      name: 'BatsmenTotalRuns',
      component: BatsmenTotalRuns,
    },
    {
      path: '/batsmen-individual-scores',
      name: 'BatsmenIndividualScores',
      component: BatsmenIndividualScores,
    },
    {
      path: '/batsmen-boundries',
      name: 'BatsmenBoundries',
      component: BatsmenBoundries,
    },
    {
      path: '/bowler-total-wickets',
      name: 'BowlerTotalWickets',
      component: BowlerTotalWickets,
    },
    {
      path: '/bowler-economy',
      name: 'BowlerEconomy',
      component: BowlerEconomy,
    },
    {
      path: '/awards-motm',
      name: 'AwardsMOTM',
      component: AwardsMOTM,
    },
    {
      path: '/awards-orange-caps',
      name: 'AwardsOrangeCaps',
      component: AwardsOrangeCaps,
    },
    {
      path: '/awards-purple-caps',
      name: 'AwardsPurpleCaps',
      component: AwardsPurpleCaps,
    },
  ],
});
