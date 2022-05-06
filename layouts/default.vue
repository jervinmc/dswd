<template>
  <v-app dark>
    <v-dialog v-model="isOpenLogout" width="500" persistent>
    <v-card class="pa-10">
    <div align="center" class="text-h6">Logout User</div>
    <div align="center" class="pa-10">
        Would you like to logout?
    </div>
      <v-card-actions>
        <v-row align="center">
            <v-col align="end">
                <v-btn color="red" text @click="isOpenLogout=false"> Cancel </v-btn>
            </v-col>
            <v-col>
                <v-btn color="success" text @click="confirm"> Logout </v-btn>
            </v-col>
        </v-row>  
      </v-card-actions>
    </v-card>
  </v-dialog>
    <v-app-bar
      color="white"
      :clipped-left="clipped"
      fixed
      app
      elevation="1"
      v-if=" $route.name=='register' || $route.name=='index' || $route.name=='cases' || $route.name=='about' || $route.name=='market' || $route.name=='login' || $route.name=='seller'"
    >
    <v-row>
      <v-col cols="auto">
        <v-img src="/calamba_logo.png" height="60" width="60" contain style="cursor:pointer" @click="route('index')"></v-img>
      </v-col>
      <v-col>
              <v-img src="/main_logo.png" height="60" width="60" contain style="cursor:pointer" @click="route('index')"></v-img>
      </v-col>
    </v-row>
      <v-spacer></v-spacer>
      <v-toolbar-title class="px-4 black--text" style ="cursor:pointer;font-size:16px" @click="route('index')"><v-icon class="pb-1">mdi-home</v-icon>Home</v-toolbar-title>
      <v-toolbar-title class="px-4 black--text" style="cursor:pointer;font-size:16px" @click="route('cases')"><v-icon class="pb-1">mdi-store</v-icon> Cases</v-toolbar-title>
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-toolbar-title class="px-4"  v-on="on" v-bind="attrs" style="cursor:pointer;font-size:16px"><v-icon class="pb-1">mdi-store</v-icon> Cases</v-toolbar-title>
        </template>
              <v-list>
          <v-list-item v-if="account_type=='Admin'" @click="route('discussionadmin')">
            <v-list-item-title>SAP</v-list-item-title>
          </v-list-item>
          <v-list-item @click="route('discussionspace')">
            <v-list-item-title>4ps</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <v-toolbar-title class="px-4 black--text" style="cursor:pointer;font-size:16px" @click="route('about')"><v-icon class="pb-1">mdi-information</v-icon> About us</v-toolbar-title>
      <div class="pl-16"></div>
      <v-toolbar-title v-if="token==null" class="px-4 black--text" style="cursor:pointer;font-size:16px" @click="route('login')"> <v-icon class="pb-1">mdi-login</v-icon>Login</v-toolbar-title>
      <v-toolbar-title v-else class="px-4 black--text" style="cursor:pointer;font-size:16px" @click="account_type=='Seller' ?  route('seller/dashboard') : account_type=='Customer' ?  route('customer/transaction') : route('admin/dashboard')"> <v-icon class="pb-1">mdi-login</v-icon>{{name}}</v-toolbar-title>
      <v-toolbar-title v-if="token==null" class="px-4 black--text" style="cursor:pointer;font-size:16px" @click="route('register')"><v-icon class="pb-1">mdi-plus</v-icon> Register</v-toolbar-title>
     
    </v-app-bar>
     <v-app-bar  color="#6609af" :clipped-left="clipped" fixed app elevation="1" v-else-if="account_type=='Admin'" >
    <v-app-bar-nav-icon @click="drawer=true" color="white"></v-app-bar-nav-icon>
    <v-row>
      <v-col cols="auto">
        <v-img src="/calamba_logo.png" height="60" width="60" contain style="cursor:pointer" @click="route('index')"></v-img>
      </v-col>
      <v-col cols="auto">
              <v-img src="/main_logo.png" height="60" width="60" contain style="cursor:pointer" @click="route('index')"></v-img>
      </v-col>
      <v-col  align-self="center">
        <div class="white--text">
        DSWD ADMIN
      </div>
      </v-col>
    </v-row>
    <div class="white--text">
      {{$route.name=='admin-configuration' ? 'System Configuration' : ''}}
    </div>
    </v-app-bar>
     <v-app-bar  color="#6609af" :clipped-left="clipped" fixed app elevation="1"  v-else-if="account_type=='Seller'" >
    <v-app-bar-nav-icon @click="drawer=true" color="white"></v-app-bar-nav-icon>
    <div class="white--text">
       DSWD User
    </div>
    </v-app-bar>
     <v-app-bar  color="#6609af" :clipped-left="clipped" fixed app elevation="1"  v-else >
    <v-app-bar-nav-icon @click="drawer=true" color="white"></v-app-bar-nav-icon>
    <div class="white--text">
       DSWD
    </div>
    </v-app-bar>
    <v-main >
      <v-container fluid class="pa-0">
        <Nuxt />
        
      </v-container>
    </v-main>
 
       <v-navigation-drawer v-model="drawer" absolute bottom temporary  color="#6609af">
         <!--eslint-disable-->
      <v-list nav dense   v-if="account_type=='Admin'">
        <v-list-item-group active-class="primary" color="white">
          <v-list-item
        
          color="white"
            :to="items[index].to"
            v-for="(key, index) in items"
            :key="index"
          > 
            <v-icon class="pr-2" color="white">{{ items[index].icon }}</v-icon>
            <v-list-item-title style="color:white">{{ items[index].title }}</v-list-item-title>
          </v-list-item>
          <v-list-item
          color="white"
          @click="logout"
          > 
            <v-icon class="pr-2" color="white">mdi-logout</v-icon>
            <v-list-item-title style="color:white">Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list nav dense  v-else>
        <v-list-item-group active-class="primary" color="white">
          <v-list-item
        
          color="white"
            :to="items_client[index].to"
            v-for="(key, index) in items_client"
            :key="index"
          > 
            <v-icon class="pr-2" color="white">{{ items_client[index].icon }}</v-icon>
            <v-list-item-title style="color:white">{{ items_client[index].title }}</v-list-item-title>
          </v-list-item>
          <v-list-item
          color="white"
          @click="logout"
          > 
            <v-icon class="pr-2" color="white">mdi-logout</v-icon>
            <v-list-item-title style="color:white">Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!-- <v-list nav dense   v-if="account_type=='Seller'">
        <v-list-item-group active-class="primary" color="white">
          <v-list-item
        
          color="white"
            :to="items_seller[index].to"
            v-for="(key, index) in items_seller"
            :key="index"
          > 
            <v-icon class="pr-2" color="white">{{ items_seller[index].icon }}</v-icon>
            <v-list-item-title style="color:white">{{ items_seller[index].title }}</v-list-item-title>
          </v-list-item>
          <v-list-item
          color="white"
          @click="logout"
          > 
            <v-icon class="pr-2" color="white">mdi-logout</v-icon>
            <v-list-item-title style="color:white">Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list> -->
      <!-- <v-list nav dense   >
        <v-list-item-group active-class="primary" color="white">
          <v-list-item
        
          color="white"
            :to="items_customer[index].to"
            v-for="(key, index) in items_customer"
            :key="index"
          > 
            <v-icon class="pr-2" color="white">{{ items_customer[index].icon }}</v-icon>
            <v-list-item-title style="color:white">{{ items_customer[index].title }}</v-list-item-title>
          </v-list-item>
          <v-list-item
          color="white"
          @click="logout"
          > 
            <v-icon class="pr-2" color="white">mdi-logout</v-icon>
            <v-list-item-title style="color:white">Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list> -->
    </v-navigation-drawer>

  </v-app>
</template>

<script>
// import LogoutDialog from '../components/custom/LogoutDialog.vue';
export default {
  created(){
    this.loadData()
  },

      name: "DefaultLayout",

  data() {
    return {
      profileImage:'',
      clipped: false,
      drawer: false,
      name:'',
      account_type:'',
      isOpenLogout:false,
      fixed: false,
      items_client:[
         { 
          icon: "mdi-cog",
          title: "Beneficiaries",
          to: "/beneficiaries",
        },
        {
          icon: "mdi-account-group",
          title: "SAP",
          to: "/sap",
        },
        {
          icon: "mdi-account-group",
          title: "4Ps",
          to: "/4ps",
        },
        {
          icon: "mdi-account-group",
          title: "Donate",
          to: "/donate",
        },
      ],
      items: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/admin/dashboard",
        },
        // {
        //   icon: "mdi-calendar-multiple",
        //   title: "Transactions",
        //   to: "/events_management",
        // },
        { 
          icon: "mdi-cog",
          title: "Usermanagement",
          to: "/admin/usermanagement",
        },
        { 
          icon: "mdi-cog",
          title: "Requests",
          to: "/admin/requests",
        },
        {
          icon: "mdi-account-group",
          title: "Donation",
          to: "/admin/donate",
        },
        {
          icon: "mdi-alert",
          title: "Beneficiaries",
          to: "/admin/beneficiaries",
        },
        {
          icon: "mdi-alert",
          title: "SAP",
          to: "/admin/sap",
        },
        {
          icon: "mdi-alert",
          title: "4PS",
          to: "/admin/4ps",
        },
        {
          icon: "mdi-home",
          title: "Case Report",
          to: "/admin/cases",
        },
      ],
      items_seller: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/seller/dashboard",
        },
        {
          icon: "mdi-scale-unbalanced",
          title: "Bid",
          to: "/seller/bid",
        },
        {
          icon: "mdi-bullhorn",
          title: "Messages",
          to: "/seller/messages",
        },
        {
          icon: "mdi-garage",
          title: "Transactions",
          to: "/seller/transactions",
        },
        {
          icon: "mdi-swap-horizontal-bold",
          title: "Swap Cars",
          to: "/seller/swap",
        },
        {
          icon: "mdi-calendar-check",
          title: "Create a Listing",
          to: "/seller/c-listing",
        },
        {
          icon: "mdi-calendar-text",
          title: "Listing",
          to: "/seller/listing",
        },
        {
          icon: "mdi-currency-usd",
          title: "Sold",
          to: "/seller/sold",
        },
        {
          icon: "mdi-alert",
          title: "Reports",
          to: "/seller/reports",
        },
        {
          icon: "mdi-home",
          title: "Homepage",
          to: "/",
        },
        
      ],
      items_customer: [
        {
          icon: "mdi-calendar-multiple",
          title: "Messages",
          to: "/customer/messages",
        },
        {
          icon: "mdi-calendar-multiple",
          title: "Transactions/Activity",
          to: "/customer/transaction",
        },
        {
          icon: "mdi-account-group",
          title: "Reports",
          to: "/customer/reports",
        },
         {
          icon: "mdi-calendar-multiple",
          title: "Homepage",
          to: "/",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      account_type:'',
      token:null
    };
  },
 methods:{
   loadData(){
     this.token = localStorage.getItem('token')
     this.name=localStorage.getItem('firstname')+' '+localStorage.getItem('lastname')
     this.account_type = localStorage.getItem('account_type')
   },
   confirm(){
     localStorage.clear();
    window.location.href="/"
     this.isOpenLogout=false
   },
   logout(){
     this.isOpenLogout=true;
   },
   route(name){
     if(name=='index'){
       this.$router.push('/')
       return
     }
   
     window.location.href='/'+name
   }
 }
};
</script>
