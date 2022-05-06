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
                <v-btn color="red" text @click="deleteConfirmation=false"> Cancel </v-btn>
            </v-col>
            <v-col>
                <v-btn color="success" text :loading="buttonLoad" @click="deleteValue"> Confirm </v-btn>
            </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
    <beneficiaries-add :isOpen="dialogAdd" @cancel="dialogAdd=false" @refresh="loadData" :items="selectedItem" :isAdd="isAdd" />
    <v-row>
      <v-col align="start" class="pa-10 text-h5" >
        <b>4PS Management</b>
      </v-col>
         <v-row>
        <v-col align-self="center" class="pa-10 ">
        <v-text-field placeholder="search" outlined v-model="search"></v-text-field>
      </v-col>
       <v-col class="pa-10 ">
          <v-menu
          class="pa-0"
          ref="eventDate"
          v-model="eventDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
            hide-details=""
              v-model="date"
              outlined
              label="Date"
              persistent-hint
              v-bind="attrs"
              @blur="date = date"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            @change="changeDate"
            v-model="date"
            no-title
            range
          ></v-date-picker>
        </v-menu>
       </v-col>
     </v-row>
      <!-- <v-col align-self="center" align="end" class="pr-10" v-if="account_type!='Staff'">
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
          <span class="text-none">Request Beneficiaries</span>
        </v-btn>
      </v-col> -->
    </v-row>
    <ps-add :isOpen="dialogAdd" @cancel="dialogAdd=false" @refresh="loadData" :items="selectedItem" :isAdd="isAdd"  />
    <v-data-table
      :search="search"
      class="pa-5"
      :headers="headers"
      :items="items_all"
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
            <v-list-item @click.stop="viewItem(item,'activate')">
              <v-list-item-content>
                <v-list-item-title>View</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="status(item,'activate')">
              <v-list-item-content>
                <v-list-item-title>Approve</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="status(item,'deactivate')">
              <v-list-item-content>
                <v-list-item-title>Disapprove</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="status(item,'Done')">
              <v-list-item-content>
                <v-list-item-title>Done</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import PsAdd from './PsAdd.vue';
// import BeneficiariesAdd from './BeneficiariesAdd.vue';

export default {
  components: { PsAdd },
    // components:{
    //     BeneficiariesAdd
    // },
  created() {
    this.loadData();
  },
  data() {
    return {
      items_all:[],
date:[],
      search:'',
      buttonLoad:false,
      account_type:'',
      deleteConfirmation:false,
      selectedItem:[],
        events:[],
      selectedItem:{},
      isLoading: false,
      users: [],
      dialogAdd:false,
      isAdd:true,
      headers: [
        { text: "ID", value: "id" },
        { text: "Firstname", value: "firstname" },
        { text: "Lastname", value: "lastname" },
        { text: "Date", value: "date_start" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "opt" },
        ,
      ],
    };
  },
  methods: {
    changeDate(){
          this.items_all = []
           for(let key in this.events){
          if(new Date(this.date[0])<=new Date(this.events[key].date_start) && new Date(this.date[1])>=new Date(this.events[key].date_start)){
             this.items_all.push(this.events[key])
          }
        } 
      },
    viewItem(item,s){
      this.isAdd=false
      this.selectedItem = item
      this.dialogAdd=true
    },
       status(item,status){
    this.buttonLoad=true
      this.$axios.patch(`/ps/${item.id}/`,{
          status: status=='activate' ? 'Approved' : status=='deactivate' ? 'Disapproved' : 'Done'
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
    getColorStatus(item) {
    if (item == "Pending") {
        return "background-color:#FFF5CC;border-radius:15px;padding:7px; width:150px; color: #344557;";
      }
      else if(item =='Approved'){
          return "background-color:green;border-radius:15px;padding:7px; width:150px; color:white;";
      } else if(item=='Disapproved') { 
        return "background-color:red;border-radius:15px;padding:7px; width:150px; color: white;";
      } 
      else  { 
        return "background-color:grey;border-radius:15px;padding:7px; width:150px; color: white;";
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
    editItem(val){
      this.selectedItem=val
      this.dialogAdd=true
      this.isAdd=false
    },
    addItem(){
      this.isAdd=true
      this.dialogAdd=true
    },
    // async status(data, status) {
    //   this.isLoading = true;
    //   const res = await this.$axios
    //     .patch(
    //       `/beneficiaries/${data.id}/`,
    //       {
    //         is_active: status == "Deactivate" ? false : true,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       this.loadData();
    //     });
    // },
    loadData() {
      this.account_type=localStorage.getItem('account_type')
      this.eventsGetall();
    },
    async eventsGetall() {
      this.isLoading = true;
      const res = await this.$axios
        .get(`/ps/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.events = res.data;
          this.items_all = res.data;
          this.isLoading = false;
          console.log(res.data);
          this.events = res.data;
          this.isLoading = false;
          if(this.$route.query.id!=undefined){
            for(let key in this.events){
              if(this.events[key].id==this.$route.query.id){
                this.viewItem(this.events[key],'')
              }
            }
          }
        });
    },
  },
};
</script>

<style>

</style>