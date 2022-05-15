<template>
  <v-card elevation="5">
     <v-dialog v-model="deleteConfirmation" width="500" persistent>
    <v-card class="pa-10">
    <div align="center" class="text-h6">Confirmation</div>
    <div align="center" class="pa-10">
        Are you sure you want to delete this item?
    </div>
      <v-card-actions>
        <v-row align="center">
            <v-col align="end">
                <v-btn color="red" text @click="isCategory=false"> Cancel </v-btn>
            </v-col>
            <v-col>
                <v-btn color="success" text :loading="buttonLoad" @click="submitCategory"> Confirm </v-btn>
            </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="viewDetails" width="1000" persistent>
    <v-card class="pa-10">
      <v-row>
         <v-col align-self="center" class="pa-10 ">
        <v-text-field placeholder="search" outlined v-model="search_sap"></v-text-field>
      </v-col>
       <v-col>
             Download Sap List
              <JsonExcel :data="items_download" name="sap.xls">
                <v-btn>Download</v-btn>
              </JsonExcel>
           </v-col>
      </v-row>
        <v-data-table 
        :search="search_sap"
        :loading="loadingSap"
  
        :items="sap_items" :headers="sap_headers" >
            <template #[`item.image`]="{ item }">
        <v-img :src="item.image" height="100" width="100"></v-img>
      </template>
        <template #[`item.opt`]="{ item }">
            <v-row>
               <v-col>
                <v-btn @click="viewSapFormDetail(item)">View</v-btn>
              </v-col>
              <v-col>
                <v-btn @click="status(item,'Approved')">Approve</v-btn>
              </v-col>
              <v-col>
                <v-btn @click="status(item,'Disapproved')">Disapprove</v-btn>
              </v-col>
            
            </v-row>
      </template>
        </v-data-table>
              <template #[`item.opt`]="{ item }">
        <v-menu offset-y z-index="1">
          <template v-slot:activator="{ attrs, on }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click.stop="viewSapForm(item)">
              <v-list-item-content>
                <v-list-item-title>View</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
            <v-card-actions>
        <v-row align="center">
            <v-col align="end">
                <v-btn color="grey" text @click="viewDetails=false"> Back </v-btn>
            </v-col>
            <!-- <v-col>
                <v-btn color="success" text :loading="buttonLoad" @click="submitCategory"> Confirm </v-btn>
            </v-col> -->
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>

    <sap-add :isOpen="dialogAdd" @cancel="dialogAdd=false" @refresh="loadData" :items="selectedItem" :isAdd="isAdd" />
    <v-row>
      <v-col align="start" class="pa-10 text-h5" cols="auto">
        <b>SAP Management</b>
      </v-col>
      <v-col align-self="center" align="end" class="pr-10" v-if="account_type!='Staff'">
        <v-btn
          class="rnd-btn"   
          rounded
          large
          color="black"
          depressed
          dark
          width="190"
          @click="addItem"
        >
          <span class="text-none">Request SAP</span>
        </v-btn>
      </v-col>
    </v-row>
       <v-col align-self="center" class="pa-10 ">
        <v-text-field placeholder="search" outlined v-model="search"></v-text-field>
      </v-col>
    <v-data-table
      class="pa-5"
      :headers="headers"
      :items="events"
      :search="search"
      :loading="isLoading"
    >
     <template v-slot:[`item.status`]="{ item }">
        <div>
          <v-chip align="center" :style="getColorStatus(item.status)"
            ><span>{{ item.status }} </span></v-chip
          >
        </div>
      </template>
     <template #[`item.price`]="{ item }">
          <div>
            {{formatPrice(item.price)}}
          </div>
      </template>
      <template v-slot:loading>
        <v-skeleton-loader
          v-for="n in 5"
          :key="n"
          type="list-item-avatar-two-line"
          class="my-2"
        ></v-skeleton-loader>
      </template>

      <template #[`item.opt`]="{ item }">
        <v-menu offset-y z-index="1">
          <template v-slot:activator="{ attrs, on }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click.stop="view(item)">
              <v-list-item-content>
                <v-list-item-title>View</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

import JsonExcel from 'vue-json-excel'
export default {
  created() {
    this.loadData();
  },
  data() {
    return {
      search_sap:'',
      search:'',
      viewDetails:false,
    category:'',
      buttonLoad:false,
      account_type:'',
      deleteConfirmation:false,
      selectedItem:[],
      sap_items:[],
        events:[],
      selectedItem:{},
      isLoading: false,
      users: [],
      dialogAdd:false,
      isCategory:false,
      isAdd:true,
      loadingSap:false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Barangay Name", value: "name" },
        { text: "Action", value: "opt" },
        ,
      ],
      sap_headers: [
        { text: "ID", value: "id" },
        { text: "Firstname", value: "firstname" },
        { text: "Lastname", value: "lastname" },
        { text: "Gender", value: "gender" },
        { text: "Address", value: "address" },
        { text: "Occupation", value: "occupation" },
        { text: "Monthly Salary", value: "monthly_salary" },
        //  { text: "Image", value: "image" },
          { text: "Status", value: "status" },
         { text: "Action", value: "opt" },
      ],
    };
  },
 computed:{
     items_download(){
      return this.sap_items.filter(item=>{
        return item.status!='Approved'
      })}
     },
components:{
   JsonExcel 
},  
  methods: {
    async check4ps(id){
    this.$axios.get(`/check4ps/${id}/`,{headers:{
      
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }})
        .then((res)=>{
          if(res.data){
            alert("NOTE: this user is already has 4ps benefits")
          }
        })
    },
    viewSapFormDetail(item){
      this.check4ps(item.user_id)
      this.isAdd=false
      this.dialogAdd=true
      this.selectedItem=item
    },
     editItem(){
        this.buttonLoad=true
      this.$axios.patch(`/cases/${this.users.id}/`,{
          perpetrator_name:this.users.perpetrator_name,
          perpetrator_nickname:this.users.perpetrator_nickname,
          perpetrator_age:this.users.perpetrator_age,
          perpetrator_sex:this.users.perpetrator_sex,
          perpetrator_relation:this.users.perpetrator_relation,
          perpetrator_occupation:this.users.perpetrator_occupation,
          perpetrator_address:this.users.perpetrator_address,
          perpetrator_status:this.users.perpetrator_status,
          source_of_referral:this.users.source_of_referral,
          social_worker:this.users.social_worker,
          intervention:this.users.intervention,
          referral:this.users.referral,
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(()=>{
          this.isCategory=false
          this.buttonLoad=false
          this.viewDetails=false
        //   alert('Successfully Deleted!')
          this.loadData()
      })
      },
      viewSapForm(item){
         this.sap_data=item 
      this.viewDetails=true
      this.$axios.post('/barangaysap/',{barangay:item.name},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res)=>{
        console.log(res)
        this.sap_items=res.data
      })
      },
    view(item){
      this.sap_items=[]
      this.users=item 
      this.loadingSap=true
      this.viewDetails=true
      this.$axios.post('/barangaysap/',{barangay:item.name},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res)=>{
        console.log(res)
        this.loadingSap=false
        this.sap_items=res.data
      })

    },
      approve(item){

        this.buttonLoad=true
      this.$axios.patch(`/cases/${this.selectedItem.id}/`,{
          category:this.category
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(()=>{
          this.isCategory=false
          this.buttonLoad=false
        //   alert('Successfully Deleted!')
          this.loadData()
      })
      },
    async  submitCategory() {
        this.buttonLoad=true
      this.$axios.patch(`/cases/${this.selectedItem.id}/`,{
          category:this.category
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(()=>{
          this.isCategory=false
          this.buttonLoad=false
        //   alert('Successfully Deleted!')
          this.loadData()
      })
      },
        setCategory(item){
            this.isCategory =true
            this.selectedItem = item
      },
    getColorStatus(item) {
      if (item == "Rejected") {
        return "background-color:#FFCCCC;border-radius:15px;padding:7px; width:150px; color: #344557;";
      } else if (item == "Approved") { 
        return "background-color:#CCFFCE;border-radius:15px;padding:7px; width:150px; color: #344557;";
      } else if (item == "Request For Cancellation") {
        return "background-color:#CCEBFF;border-radius:15px;padding:7px; width:150px; color: #344557;";
      } else if (item == "Pending") {
        return "background-color:#FFF5CC;border-radius:15px;padding:7px; width:150px; color: #344557;";
      } else if (item == "Cancelled") {
        return "border-radius:15px;padding:7px; width:150px; color: #344557;";
      }
      else if (item == "To Pay") {
        return "border-radius:15px;padding:7px; width:150px; color: green;";
      }
       else if (item == "completed") {
        return "border-radius:15px;padding:7px; width:150px; color: black; background-color:yellow;";
      }
    },
    async deleteValue(){
     this.buttonLoad=true
      this.$axios.delete(`/beneficiaries/${this.selectedItem.id}/`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(()=>{
          this.deleteConfirmation=false
          this.buttonLoad=false
          alert('Successfully Deleted!')
          this.loadData()
      })
    },
     deleteItem(val){
      this.selectedItem = val
      this.deleteConfirmation=true
    },

     formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    addItem(){
      this.isAdd=true
      this.dialogAdd=true
    },
    async status(data, status) {
      this.isLoading = true;
      const res = await this.$axios
        .patch(
          `/sap/${data.id}/`,
          {
            status: status,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.loadData();

        });
    },
    loadData() {
      this.sap_items=[]
      this.viewDetails=false
      this.dialogAdd=false
      this.account_type=localStorage.getItem('account_type')
      this.eventsGetall();
    },
    async eventsGetall() {
      this.isLoading = true;
      const res = await this.$axios
        .get(`/barangay/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.events = res.data;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>

</style>