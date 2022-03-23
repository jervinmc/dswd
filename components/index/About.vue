<template>
  <div class="px-10">
    <v-row class="pa-5">
      <v-col col="6" align="center">
        <v-carousel v-model="counter" hide-delimiters>
      <v-carousel-item
        v-for="image in history_images"
        :key="image"
      >
          <v-img :src="image" height="300" width="600" contain>
        </v-img>
      </v-carousel-item>
    </v-carousel>
       
      </v-col>
      <v-col align-self="center" align="center">
        <div class="text-h3 py-5"><b>History</b></div>
        <div>
          The business owner's first idea was turn to their land to an apartment
          for the abs-cbn workers in the area. But then decided to transition to
          resorts instead and because of that the first couple of rooms are
          studio-type rooms. During the Pandemic the resorts are closed due to
          the rise of Covid19 outbreak and this time of need the resorts are
          allowed to invite frontliners in the resort especially those
          frontliners that are in need of a place to stay. On the new normal the
          resorts move on and continues it's services for the mass.
        </div>
      </v-col>
    </v-row>
   
    <!-- <v-row class="pa-10">
      <v-col cols="6">
        <div class="text-h6">More About Us</div>
        <div>
          The Villa Leonora Resorts is a family business. The resorst offers
          various of services. From public pools, venue renting, private pool
          and event packages. Frequestly Ask Questions.
        </div> -->
        <!-- <div class="text-h6 pt-5">History</div>
        <div>
          The business owner's first idea was turn to their land to an apartment
          for the abs-cbn workers in the area. But then decided to transition to
          resorts instead and because of that the first couple of rooms are
          studio-type rooms. During the Pandemic the resorts are closed due to
          the rise of Covid19 outbreak and this time of need the resorts are
          allowed to invite frontliners in the resort especially those
          frontliners that are in need of a place to stay. On the new normal the
          resorts move on and continues it's services for the mass.
        </div> -->
        <!-- <div class="text-h6 pt-5">OUR TERMS AND CONDITION</div>
        <div class="pt-5">
          <b>EAST STEP FOR RESERVATION</b>
        </div>
        <div>
          <br />
          <b>Step 1 </b> MAKE A RESERVATION AT THE BOOK SECTION!<br />
          Get your Reference Code to check your status in STATUS SECTION You can
          also check your EMAIL for the Reference Code
          <br /><b>Step 2</b>
          Type your Reference Code into Search box and click SEARCH BUTTON
          Status of reservation will show to your monitor and all about your
          reservation information
          <br /><b>Step 3</b>
          Upload your Proof of payment into the upload button in STATUS SECTION
          And wait for the confirmation of your reservation.
        </div>
        <div>
          Click the link for Terms and Condition
          <div
            class="red--text"
            style="cursor: pointer"
            @click="openTerms = true"
          >
            Terms and Conditions
          </div>
        </div>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <div>50% DOWN PAYMENT</div>
          </v-col>
          <v-col>
            <div>RESPECT</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div>NO REFUND WITHIN A DAY</div>
          </v-col>
          <v-col>
            <div>COURTESY</div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-img src="./main_image1.jpeg"> </v-img>
        <div align="center" class="text-h6 pa-2">
          Find us on Twitter & Instagram
        </div>
        <div align="center">Twitter : @VleonoraR</div>
        <div align="center">instagram: @VleonoraRV</div>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
export default {
  created() {
    // this.loadData();
  },
  methods: {
    route(link){
      window.location.href=`/${link}`
    },
    loadData() {
      this.roomsGetall();
      this.poolsGetall();
    },
    async poolsGetall() {
      // this.isLoading = true;
      const res = await this.$axios
        .get(`/pools/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.pools = res.data;
          // this.isLoading = false;
        });
    },
    async roomsGetall() {
      // this.isLoading = true;
      const res = await this.$axios
        .get(`/rooms/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.rooms = res.data;
        });
    },
  },
  data() {
    return {
      counter:0,
      history_images:["main_logo.png","main_image2.jpeg"],
      rooms: [],
      pools: [],
      openTerms: false,
    };
  },
};
</script>

<style>
</style>