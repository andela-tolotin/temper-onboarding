<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
      <div class="container">
        <router-link :to="{ name: 'home' }" class="navbar-brand"
          >Tempr</router-link
        >
      </div>
    </nav>
    <main class="py-4">
      <router-view></router-view>
      <highcharts :options="chartOptions"></highcharts>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'

Vue.use(HighchartsVue)
import {Chart} from 'highcharts-vue'

export default {
    components: {
        highcharts: Chart 
    },
    mounted () {
        axios.get('/api/onboarding/chart')
        .then((response) => {
            this.chartOptions.series = response.data
        }).catch(error => {
            console.log(error)
        });
    },
    data() {
        return {
            chartOptions: {
                title: {
                    text: 'Tempr OnBoarding Retention Chart'
                },

                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: ['Create account', 'Activate account', 'Provide profile information', 'What jobs are you interested in?', 'Do you have relevant experience in these jobs?', 'Are you a freelancer?', 'Waiting for approval', 'Approval']
                },

                yAxis: {
                    title: {
                        text: 'Stages Completed'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 0
                    }
                },
                series: null,
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 0
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            }
        }
    }
}
</script>
