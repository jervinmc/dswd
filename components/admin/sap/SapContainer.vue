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
        <v-data-table :items="sap_items" :headers="sap_headers">
        </v-data-table>

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
  <v-dialog v-model="isCategory" width="500" persistent>
    <v-card class="pa-10">
    <div align="center" class="text-h6">Category</div>
    <div align="center" class="pa-10">
        Please select category.
    </div>
    <div>
        <v-select outlined :items="['Category1','Category2','Category3']"  v-model="category" ></v-select>
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
    <sap-add :isOpen="dialogAdd" @cancel="dialogAdd=false" @refresh="loadData" :items="selectedItem" :isAdd="isAdd" />
    <v-row>
      <v-col align="start" class="pa-10 text-h5" cols="auto">
        <b>SAP Management</b>
      </v-col>
      <v-spacer></v-spacer>
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
    <v-data-table
      class="pa-5"
      :headers="headers"
      :items="events"
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
            <!-- <v-list-item @click.stop="approve(item)">
              <v-list-item-content>
                <v-list-item-title>Approve</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="deleteItem(item)">
              <v-list-item-content>
                <v-list-item-title>Disapprove</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="setCategory(item)">
              <v-list-item-content>
                <v-list-item-title>Set Category</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>


export default {
  created() {
    this.loadData();
  },
  data() {
    return {
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
      headers: [
        { text: "ID", value: "id" },
        { text: "Barangay Name", value: "name" },
        { text: "Action", value: "opt" },
        ,
      ],
      sap_headers: [
        { text: "ID", value: "id" },
        { text: "Fullname", value: "fullname" },
        { text: "Gender", value: "gender" },
        { text: "Address", value: "address" },
        { text: "Occupation", value: "occupation" },
        { text: "Monthly Salary", value: "monthly_salary" },
         { text: "Image", value: "image" },
      ],
    };
  },
  methods: {
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
    view(item){
      this.users=item 
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
          `/announcement/${data.id}/`,
          {
            is_active: status == "Deactivate" ? false : true,
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