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
    barColor: {
      type: String,
      default: () => '#EF5350',
    },
    tipLabel: {
      type: String,
      default: () => 'value',
    },
  };

  export default {
    name: 'bar-chart',
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
      this.init();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize);
    },
    watch: {
      data: function dataChanged() {
        this.init();
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
        this.height = this.width > 480 ? 400 : 360;
      },
      initialize() {
        this.scales.x = scaleBand().rangeRound([this.padded.width, 0]).padding(0.1);
        this.scales.y = scaleLinear().rangeRound([0, this.padded.height]);
      },
      update() {
        const maxY = max(this.data, d => d[this.domain.y]);
        this.scales.x.domain((this.data.map(d => d[this.domain.x])));
        this.scales.y.domain(([maxY, 0]));
      },
      wrap(text, width) {
        text.each(function wrapText() {
          const t = select(this);
          const words = t.text().split(/\s+/).reverse();
          let word = words.pop();
          let line = [];
          // eslint-disable-next-line
          let lineNumber = 0;
          const lineHeight = 1;
          const y = t.attr('y');
          const dy = parseFloat(t.attr('dy'));
          let tspan = t.text(null)
            .append('tspan')
            .attr('x', 0)
            .attr('y', y)
            .attr('dy', `${dy}em`);

          while (word) {
            line.push(word);
            tspan.text(line.join(' '));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(' '));
              line = [word];
              lineNumber += 1;
              tspan = t.append('tspan')
                .attr('x', 0)
                .attr('y', y)
                .attr('dy', `${(lineNumber * lineHeight) + dy}em`)
                .text(word);
            }
            word = words.pop();
          }
        });
      },
      drawChart() {
        const container = select('#container');

        const toolTip = select('body').append('div')
          .attr('class', 'tooltip')
          .attr('opacity', 0);

        container.selectAll('rect')
          .data(this.data)
          .enter()
          .append('rect')
          .attr('fill', this.barColor)
          .on('mousemove', (d) => {
            toolTip.transition()
              .duration(200)
              .style('opacity', 1);
            toolTip.html(`${this.tipLabel}: <b>${d[this.domain.y]}</b>`)
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
      },
      updateChart() {
        const container = select('#container');
        const x = this.scales.x;
        const y = this.scales.y;
        const height = this.padded.height;
        const xAxis = axisBottom(x);

        container.selectAll('rect')
          .data(this.data)
          .attr('x', d => x(d[this.domain.x]))
          .attr('y', height)
          .attr('width', x.bandwidth())
          .attr('height', 0)
          .transition()
            .delay((d, i) => i * 20)
            .duration(800)
            .attr('y', d => y(d[this.domain.y]))
            .attr('height', d => height - y(d[this.domain.y]));

        container.select('.x.axis')
          .attr('transform', `translate(0, ${height})`)
          .call(xAxis)
          .selectAll('.tick text')
          .call(this.wrap, x.bandwidth());

        container.select('.y.axis')
          .call(axisLeft(y));
      },
      init() {
        if (!this.data.length) return;
        this.drawChart();
        this.onResize();
      },
    },
  };
</script>
