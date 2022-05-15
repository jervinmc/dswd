<template>
<v-form ref="form">
  <v-dialog v-model="isOpen" width="1000" persistent>
    <v-card class="pa-10">
      <div align="center" class="text-h6">Request SAP</div>
      <v-row>
          <v-col cols="6" class="px-5">
        <div>Firstname</div>
        <div>
          <v-text-field outlined v-model="events.firstname"></v-text-field>
        </div>
      </v-col>
          <v-col cols="6" class="px-5">
        <div>Lastname</div>
        <div>
          <v-text-field outlined v-model="events.lastname"></v-text-field>
        </div>
      </v-col>
      <v-col cols="6" class="px-5">
        <div>Gender</div>
        <div>
          <v-select outlined v-model="events.gender" :items="['Male','Female']"></v-select>
        </div>
      </v-col>
       <v-col cols="6" class="px-5">
        <div>Address</div>
        <div>
          <v-text-field outlined v-model="events.address"></v-text-field>
        </div>
      </v-col>
      <v-col cols="6" class="px-5">
        <div>Occupation</div>
        <div>
          <v-text-field outlined v-model="events.occupation"></v-text-field>
        </div>
      </v-col>
      <v-col cols="6" class="px-5">
        <div>Monthly Salary</div>
        <div>
          <v-text-field  outlined v-model="events.monthly_salary"></v-text-field>
        </div>
      </v-col>
      <v-col cols="6" class="px-5">
        <div>Valid ID</div>
        <div>
          <v-text-field outlined v-model="events.type_of_id"></v-text-field>
        </div>
      </v-col>
      <v-col cols="6" class="px-5">
        <div>ID Number</div>
        <div>
          <v-text-field  outlined v-model="events.id_number"></v-text-field>
        </div>
      </v-col>

      <v-col cols="6" class="px-5">
        <div>Cellphone</div>
        <div>
          <v-text-field outlined v-model="events.cellphone"></v-text-field>
        </div>
      </v-col>
      <v-col cols="6" class="px-5">
        <div>Workplace</div>
        <div>
          <v-text-field  outlined v-model="events.workplace"></v-text-field>
        </div>
      </v-col>

      <v-col cols="6" class="px-5">
        <div>Sector</div>
        <div>
          <v-text-field outlined v-model="events.sector"></v-text-field>
        </div>
      </v-col>
      <v-col cols="6" class="px-5">
        <div>Health Condition</div>
        <div>
          <v-text-field  outlined v-model="events.health_condition"></v-text-field>
        </div>
      </v-col>

      <v-col cols="6" class="px-5">
        <div>Family Member</div>
        <div>
          <v-text-field outlined v-model="events.family_member"></v-text-field>
        </div>
      </v-col>
      <v-col cols="12" class="px-5">
        <div>Barangay</div>
        <div>
          <v-select outlined item-text="name" item-value="name" v-model="events.barangay" :items="barangay"></v-select>
        </div>
      </v-col>
      <v-col cols="12" class="px-5">
        <div>Mode of Payment</div>
        <div>
          <v-select :items="['Cash','Bank Transfer']"  outlined v-model="events.mop"></v-select>
        </div>
      </v-col>
      </v-row>
       <v-col>
        <span class="pt-2 pr-10 pb-10"><b>Upload Image<v-icon @click="$refs.file.click()">mdi-plus</v-icon></b></span>

        <div class="hover_pointer pt-10">
          <img
            @click="$refs.file.click()"
            :src="img_holder"
            alt="item_.js"
            height="150"
            width="150"
            class="mb-0"
          />
        </div>
      </v-col>
      <v-col class="d-none">
        <input
          style="display: none"
          type="file"
          id="fileInput"
          ref="file"
          accept="image/png, image/jpeg"
          @change="onFileUpload"
        />
      </v-col>
      <v-card-actions>
        <v-row align="center">
          <v-col align="end">
            <v-btn color="red" text @click="cancel"> Cancel </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="success"
              text
              @click="addEvents"
              :loading="buttonLoad"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-form>
</template>

<script>
export default {
  props: ["isOpen", "items", "isAdd"],
  watch: {
    items() {
        this.events=this.items
        this.img_holder=this.items.image
    },
  },
  data() {
    return {
      room_list:['Standard','Deluxe','Suite'],
      events:{
        firstname:"",
        lastname:'',
        gender:'',
        address:'',
        occupation:'',
        monthly_salary:'',
        type_of_id:'',
        id_number:'',
        cellphone:'',
        workplace:'',
        sector:'',
        barangay:'',
        mop:'',
        health_condition:'',
        family_member:''



      },
      buttonLoad: false,
      barangay:[],
      img_holder:'image_placeholder.png'
    };
  },
  created(){
    this.eventsGetall()
  },
  methods: {
    async eventsGetall() {
      const res = await this.$axios
        .get(`/barangay/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.barangay = res.data;
        });
    },
     timestamp() {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time = today.getHours() + ":" + today.getMinutes();
      var dateTime = date

      return dateTime;
    },
    async addEvents() {
      this.buttonLoad = true;
      try {
        let form_data = new FormData();
        if (this.image != null && this.image != "") {
          form_data.append("image", this.image);
        }
        form_data.append("firstname", this.events.firstname);
        form_data.append("lastname", this.events.lastname);
        form_data.append("gender", this.events.gender);
        form_data.append("address", this.events.address);
        form_data.append("occupation", this.events.occupation);
        form_data.append("date_start", this.timestamp());
        form_data.append("monthly_salary",this.events.monthly_salary );
        form_data.append("type_of_id", this.events.type_of_id);
        form_data.append("id_number", this.events.id_number);
        form_data.append("cellphone", this.events.cellphone);
        form_data.append("workplace", this.events.workplace);
  
        form_data.append("sector", this.events.sector);
        form_data.append("barangay", this.events.barangay);
        form_data.append("mop", this.events.mop);
        form_data.append("health_condition", this.events.health_condition);
        form_data.append("family_member", this.events.family_member);

        if (this.isAdd) {
                form_data.append("user_id",localStorage.getItem('id') );
          const response = await this.$axios
            .post("/sap/", form_data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(() => {
              this.$refs.form.reset()
              this.buttonLoad = false;
              this.$emit("cancel");
              this.$refs.form.reset()
              this.$emit("refresh");
            });
        } else {
          const response = await this.$axios
            .patch(`/sap/${this.events.id}/`, form_data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(() => {
              this.buttonLoad = false;
              this.$emit("cancel");
              this.$refs.form.reset()
              this.$emit("refresh");
            });
        }
      } catch (error) {
        // alert(error);
        this.buttonLoad = false;
      }
    },
    onFileUpload(e) {
      this.image = e;
      e = e.target.files[0];
      if (e["name"].length > 100) {
        alert("255 characters exceeded filename.");
        return;
      }
      try {
        if (e.size > 16000000) {
          alert("Only 15mb file can be accepted.");
          return;
        }
      } catch (error) {
        alert(error);
        return;
      }
      this.image = e;
      if (e == null) {
      } else {
        this.url, (this.img_holder = URL.createObjectURL(e));
      }
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style>
</style>