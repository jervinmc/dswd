<template>
  <div class="px-10">
      <div class="text-h4">
          <b>Dashboard</b>
      </div>
     <v-row class="pt-5">
         <v-col align="center" @click="route('usermanagement')" >
            <v-card height="170" width="170" elevation="5" align="center" style="cursor:pointer">
                <v-icon size="60">mdi-account-multiple</v-icon>
                <div class="text-h6">
                   <b> Users</b>
                </div>
                <div class="text-h3 green--text pt-5">
                    <b>{{users.length}}</b>
                </div>
            </v-card>
         </v-col>
         <v-col align="center" @click="route('cases')" >
               <v-card height="170" width="170" elevation="5" align="center" style="cursor:pointer">
                <v-icon size="60">mdi-text-box-search-outline</v-icon>
                <div class="text-h6">
                   <b>Case Report</b>
                </div>
                <div class="text-h3 green--text pt-5">
                    <b>{{search_list.length}}</b>
                </div>
            </v-card>
         </v-col>
         <v-col align="center" @click="route('donate')" >
               <v-card height="170" width="170" elevation="5" align="center" style="cursor:pointer">
                <v-icon size="60">mdi-text-box-search-outline</v-icon>
                <div class="text-h6">
                   <b>Donation</b>
                </div>
                <div class="text-h3 green--text pt-5">
                    <b>{{donation.length}}</b>
                </div>
            </v-card>
         </v-col>
          <v-col align="center" @click="route('4ps')" >
               <v-card height="170" width="170" elevation="5" align="center" style="cursor:pointer">
                <v-icon size="60">mdi-text-box-search-outline</v-icon>
                <div class="text-h6">
                   <b>Approved 4ps</b>
                </div>
                <div class="text-h3 green--text pt-5">
                    <b>{{ps_list.length}}</b>
                </div>
            </v-card>
         </v-col>
          <!-- <v-col align="center" @click="route('donate')" >
               <v-card height="170" width="170" elevation="5" align="center" style="cursor:pointer">
                <v-icon size="60">mdi-text-box-search-outline</v-icon>
                <div class="text-h6">
                   <b>Approved Cases</b>
                </div>
                <div class="text-h3 green--text pt-5">
                    <b>{{donation.length}}</b>
                </div>
            </v-card>
         </v-col> -->
          <v-col align="center" @click="route('sap')" >
               <v-card height="170" width="170" elevation="5" align="center" style="cursor:pointer">
                <v-icon size="60">mdi-text-box-search-outline</v-icon>
                <div class="text-h6">
                   <b>Approved SAP</b>
                </div>
                <div class="text-h3 green--text pt-5">
                    <b>{{sap_list.length}}</b>
                </div>
            </v-card>
         </v-col>
         <v-col align="center" @click="route('requests')" >
               <v-card height="170" width="170" elevation="5" align="center" style="cursor:pointer">
                <v-icon size="60">mdi-text-box-search-outline</v-icon>
                <div class="text-h6">
                   <b>Request</b>
                </div>
                <div class="text-h3 green--text pt-5">
                    <b>{{request_list.length}}</b>
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
       <!-- <div>
         <v-row>
           <v-col>
             Download Donation List Report
              <JsonExcel :data="donation" name="donation.xls">
                <v-btn>Download</v-btn>
              </JsonExcel>
           </v-col>
           <v-col>
             Download Case Report
              <JsonExcel :data="search_list" name="cases.xls">
                <v-btn>Download</v-btn>
              </JsonExcel>
           </v-col>
         </v-row>
       </div> -->
  </div>
</template>

<script>
import PieChart from "./PieChart.js";
export default {
    components:{
        PieChart,
      
    },
    created(){
      this.donateGetall()
        this.loadData()
    },
    data(){
        return{
          request_list:[],
        chart_data1:false,
        donation:[],
        ps_list:[],
        chartData1: {
        responsive:false,
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ['Women','Child','Men'],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ['#E3C790', '#344557'],
            data: [0,0,0]
          }
        ]
      },
      sap_list:[],
      chartData: {
        responsive:false,
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        chart_data1:false,
        sap_list:[],
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
       async requestGetall() {
      this.isLoading = true;
      const res = await this.$axios
        .get(`/requests/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.request_list = res.data;
          this.request_list = res.data;
          this.isLoading = false;
        });
    },
     async psGetall(){
          const res = await this.$axios
        .get(`/ps/`, {
         headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
        })
        .then((res) => {
          console.log(res.data);
          this.ps_list = res.data;
          this.ps_list = this.ps_list.filter(data=>data.status=='Approved')
          console.log('okays')
          console.log(this.ps_list)
          // this.search_list.map(item=>{

          //         // this.chartData1.labels.push(item.category)
          //         this.chartData1.datasets[40].data[0]=1
              
          // })
        });
      },
      async sapGetall(){
          const res = await this.$axios
        .get(`/sap/`, {
         headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
        })
        .then((res) => {
          console.log(res.data);
          this.sap_list = res.data;
          this.sap_list = this.sap_list.filter(data=>data.status=='Approved')
          console.log('okayss')
          console.log(this.sap_list)
          // this.search_list.map(item=>{

          //         // this.chartData1.labels.push(item.category)
          //         this.chartData1.datasets[40].data[0]=1
              
          // })
        });
      },
        route(val){
            this.$router.push('/admin/'+val)
        },
        loadData(){
                this.searchGetall()
                this.usersGetall()
                this.psGetall()
                this.sapGetall()
                this.requestGetall()
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
        async donateGetall(){
            const res = await this.$axios
                .get(`/donate/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                })
                .then((res) => {
                console.log(res.data);
                this.donation = res.data.filter(data=>data.status=='Approved');
                
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
          this.search_list = res.data;
            var women =  this.search_list.filter(item => item.case_category=='Women' && item.status=='Approved')
          this.chartData1.datasets[0].data[0]=women.length
       
          var child =  this.search_list.filter(item => item.case_category=='Child' && item.status=='Approved')
          this.chartData1.datasets[0].data[1]=child.length
          var men =  this.search_list.filter(item => item.case_category=='Men' && item.status=='Approved')
          this.chartData1.datasets[0].data[2]=men.length
        
          console.log(res.data);
          
          this.search_list = this.search_list.filter(data=>data.status=='Approved')
          console.log('okay')
          console.log(this.search_list)
          // this.search_list.map(item=>{

          //         // this.chartData1.labels.push(item.category)
          //         this.chartData1.datasets[40].data[0]=1
              
          // })
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