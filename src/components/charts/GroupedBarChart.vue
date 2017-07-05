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
    keys: {
      type: Array,
      default: () => [],
    },
    tipLabel: {
      type: String,
      default: () => 'value',
    },
  };

  export default {
    name: 'grouped-bar-chart',
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
        this.scales.x0 = scaleBand().rangeRound([this.padded.width, 0]).paddingInner(0.1);
        this.scales.x1 = scaleBand().padding(0.05);
        this.scales.y = scaleLinear().rangeRound([0, this.padded.height]);
      },
      update() {
        const maxY = max(this.data, d => max(this.keys, k => d[k]));

        this.scales.x0.domain((this.data.map(d => d[this.domain.x])));
        this.scales.x1.domain(this.keys).rangeRound([0, this.scales.x0.bandwidth()]);
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

        container.selectAll('g')
          .data(this.data)
          .enter()
          .append('g')
          .selectAll('rect')
          .data(d => this.keys.map(key => ({ key, value: d[key] })))
          .enter()
          .append('rect')
          .on('mousemove', (d) => {
            toolTip.transition()
              .duration(200)
              .style('opacity', 1);
            toolTip.html(`${this.tipLabel}: <b>${d.value}</b>`)
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
        const x0 = this.scales.x0;
        const x1 = this.scales.x1;
        const y = this.scales.y;
        const color = this.scales.color;
        const height = this.padded.height;
        const width = this.padded.width;

        container.selectAll('g')
          .data(this.data)
          .attr('transform', d => `translate(${x0(d[this.domain.x])}, 0)`)
          .selectAll('rect')
          .data(d => this.keys.map(key => ({ key, value: d[key] })))
          .attr('x', d => x1(d.key))
          .attr('y', height)
          .attr('width', x1.bandwidth())
          .attr('height', 0)
          .attr('fill', d => color(d.key))
          .transition()
            .delay((d, i) => i * 20)
            .duration(800)
            .attr('y', d => y(d.value))
            .attr('height', d => height - y(d.value));

        container.select('.x.axis')
          .attr('transform', `translate(0, ${height})`)
          .call(axisBottom(x0))
          .selectAll('.tick text')
          .call(this.wrap, x0.bandwidth());

        container.select('.y.axis')
          .call(axisLeft(y));

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
      init() {
        if (!this.data.length) return;
        this.drawChart();
        this.onResize();
      },
    },
  };
</script>
