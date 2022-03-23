<template>
  <div class="px-10">
      <div class="text-h4">
          <b>Dashboard</b>
      </div>
     <v-row class="pt-5">
         <v-col align="center" @click="route('usermanagement')" >
            <v-card height="250" width="250" elevation="5" align="center" style="cursor:pointer">
                <v-icon size="120">mdi-account-multiple</v-icon>
                <div class="text-h5">
                   <b> Users</b>
                </div>
                <div class="text-h3 green--text pt-5">
                    <b>{{users.length}}</b>
                </div>
            </v-card>
         </v-col>
         <v-col align="center" @click="route('cases')" >
               <v-card height="250" width="250" elevation="5" align="center" style="cursor:pointer">
                <v-icon size="120">mdi-text-box-search-outline</v-icon>
                <div class="text-h5">
                   <b>Case Report</b>
                </div>
                <div class="text-h3 green--text pt-5">
                    <b>{{search_list.length}}</b>
                </div>
            </v-card>
         </v-col>
         <v-col align="center" @click="route('admin/cases')" >
               <v-card height="250" width="250" elevation="5" align="center" style="cursor:pointer">
                <v-icon size="120">mdi-text-box-search-outline</v-icon>
                <div class="text-h5">
                   <b>Donors</b>
                </div>
                <div class="text-h3 green--text pt-5">
                    <b></b>
                </div>
            </v-card>
         </v-col>
     </v-row>
     <div class="py-10" align="start">
       <v-card elevation="5">
         <div class="pa-2">
          <b> Case Report Analytics</b>
         </div>
         <div class="pie_chart"  style="height:280px" align="center" v-if="chart_data1" >
                    <pie-chart :data="chartData1" :options="chartOptions"></pie-chart>
                </div>
       </v-card>
       </div>
  </div>
</template>

<script>
import PieChart from "./PieChart.js";
export default {
    components:{
        PieChart,
    },
    created(){
        this.loadData()
    },
    data(){
        return{
        chartData1: {
        responsive:false,
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ['Women','Child','Men'],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ['#E3C790', '#344557'],
            data: [1]
          }
        ]
      },
      chartData: {
        responsive:false,
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        chart_data1:false,
        labels: [],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ['#E3C790', '#344557'],
            data: []
          }
        ]
      },
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
      },
            users:[],
            search_list:[],
            demand_list:[]
        }
    },
    methods:{
        route(val){
            this.$router.push('/admin/'+val)
        },
        loadData(){
                this.searchGetall()
                this.usersGetall()
        },
       async usersGetall(){
            const res = await this.$axios
                .get(`/users/user/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                })
                .then((res) => {
                console.log(res.data);
                this.users = res.data;
                
                });
        },
      
      // async demandGetall(){
      //      this.isLoading = true;
      //       const res = await this.$axios
      //           .get(`/demand/`, {
      //               headers: {
                        
      //               },
      //           })
      //           .then((res) => {
      //           this.demand_list = res.data;
      //           this.demand_list.map(item=>{
      //         if(this.chartData.datasets[0].data.length>=3){
      //         }
      //         else {
      //             this.chartData.labels.push(item.category)
      //             this.chartData.datasets[0].data[this.chartData.datasets[0].data.length]=item.quantity
      //         }   
      //     })
      //   });
      // },
      async searchGetall(){
      const res = await this.$axios
        .get(`/cases/`, {
          headers: {
           
          },
        })
        .then((res) => {
          console.log(res.data);
          this.search_list = res.data;
          // this.search_list.map(item=>{

          //         // this.chartData1.labels.push(item.category)
          //         this.chartData1.datasets[40].data[0]=1
              
          // })
          var women =  this.search_list.filter(item => item.category=='Women')
          this.chartData1.datasets[0].data[0]=women.length
          var child =  this.search_list.filter(item => item.category=='Child')
          this.chartData1.datasets[0].data[1]=child.length
          var men =  this.search_list.filter(item => item.category=='Men')
          this.chartData1.datasets[0].data[2]=men.length
          this.chart_data1=true;
        });
      }
    }

}
</script>

<style>
.pie_chart {
   margin: 0px 0px 30px 20px;
    max-width: 250px;
  }

</style>