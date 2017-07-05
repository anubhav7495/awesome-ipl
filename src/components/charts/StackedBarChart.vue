<template>
  <div class="row">
    <Loader v-if="!data.length" />
    <svg :width="width" :height="height" class="chart">
      <g :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }" id="container">
      </g>
    </svg>
  </div>
</template>

<script>
  import { scaleLinear, scaleBand, scaleOrdinal, schemeCategory10 } from 'd3-scale';
  import { max } from 'd3-array';
  import { axisBottom, axisLeft } from 'd3-axis';
  import { stack } from 'd3-shape';
  import { select } from 'd3-selection';
  // eslint-disable-next-line
  import { transition } from 'd3-transition';
  import Loader from '../Loader';

  const props = {
    data: {
      type: Array,
      default: () => [],
    },
    margin: {
      type: Object,
      default: () => ({
        left: 30,
        right: 20,
        top: 10,
        bottom: 25,
      }),
    },
    domain: {
      type: Object,
      default: () => ({}),
    },
    keys: {
      type: Array,
      default: () => [],
    },
  };

  export default {
    name: 'stacked-bar-chart',
    components: {
      Loader,
    },
    props,
    data() {
      return {
        width: 0,
        height: 0,
        scales: {
          color: scaleOrdinal(schemeCategory10),
        },
        stacked: [],
        resizeTimer: null,
      };
    },
    computed: {
      padded() {
        const width = this.width - this.margin.left - this.margin.right;
        const height = this.height - this.margin.top - this.margin.bottom;
        return { width, height };
      },
    },
    mounted() {
      window.addEventListener('resize', () => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(this.onResize, 550);
      });
      this.mungeData();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize);
    },
    watch: {
      data: function dataChanged() {
        this.mungeData();
      },
      width: function widthChanged() {
        this.initialize();
        this.update();
        this.updateChart();
      },
    },
    methods: {
      onResize() {
        this.width = this.$el.offsetWidth;
        this.height = 400;
      },
      initialize() {
        this.scales.x = scaleBand().rangeRound([this.padded.height, 0]).padding(0.2);
        this.scales.y = scaleLinear().rangeRound([0, this.padded.width]);
      },
      update() {
        const maxY = max(this.stacked, data => max(data, d => d[1]));

        this.scales.x.domain((this.data.map(d => d[this.domain.x])));
        this.scales.y.domain(([0, maxY]));
      },
      drawChart() {
        const container = select('#container');

        const toolTip = select('body').append('div')
          .attr('class', 'tooltip')
          .attr('opacity', 0);

        container.selectAll('.layer')
          .data(this.stacked, d => d.key)
          .enter()
          .append('g')
          .attr('class', 'layer')
          .attr('fill', d => this.scales.color(d.key))
          .selectAll('rect')
          .data(d => d)
          .enter()
          .append('rect')
          .on('mousemove', (d) => {
            toolTip.transition()
              .duration(200)
              .style('opacity', 1);
            toolTip.html(`count: <b>${d[1] - d[0]}</b>`)
              .style('left', `${event.pageX}px`)
              .style('top', `${event.pageY - 30}px`);
          })
          .on('mouseout', () => {
            toolTip.transition()
              .duration(500)
              .style('opacity', 0);
          });
        container.append('g')
          .attr('class', 'axis x');

        container.append('g')
          .attr('class', 'axis y');

        const legend = container.append('g')
          .attr('text-anchor', 'end')
          .attr('class', 'legend')
          .selectAll('g')
          .data(this.keys)
          .enter()
          .append('g')
          .attr('transform', (d, i) => `translate(0, ${i * 25})`);

        legend.append('rect')
          .attr('class', 'legend-rect')
          .attr('fill', this.scales.color);

        legend.append('text')
          .attr('class', 'legend-text')
          .text(d => d);
      },
      updateChart() {
        const container = select('#container');
        const x = this.scales.x;
        const y = this.scales.y;
        const width = this.padded.width;
        const height = this.padded.height;

        container.selectAll('.layer')
          .data(this.stacked, d => d.key)
          .selectAll('rect')
          .data(d => d)
          .attr('y', d => x(d.data[this.domain.x]))
          .attr('x', 0)
          .attr('height', x.bandwidth())
          .attr('width', 0)
          .transition()
            .delay((d, i) => i * 20)
            .duration(800)
            .attr('x', d => y(d[0]))
            .attr('width', d => (y(d[1]) - y(d[0])));

        container.select('.x.axis')
          .attr('transform', `translate(0, ${height})`)
          .call(axisBottom(y));

        container.select('.y.axis')
          .call(axisLeft(x));

        const legend = container.select('.legend')
          .data(this.keys);

        legend.selectAll('.legend-rect')
          .attr('x', width - 20)
          .attr('width', 20)
          .attr('height', 20);

        legend.selectAll('.legend-text')
          .attr('x', width - 25)
          .attr('y', 10)
          .attr('dy', '0.32em');
      },
      mungeData() {
        if (!this.data.length) return;
        const stackFunc = stack().keys(this.keys);
        this.stacked = stackFunc(this.data);
        this.drawChart();
        this.onResize();
      },
    },
  };
</script>
