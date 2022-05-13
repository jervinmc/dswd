<template>
<v-form ref="form">
  <v-dialog v-model="isOpen" width="1000" persistent>
    <v-card class="pa-10">
      <div align="center" class="text-h6">Request 4ps</div>
      <v-col cols="12" class="px-0">
        <div>Lastname</div>
        <div>
          <v-text-field outlined v-model="events.lastname"></v-text-field>
        </div>
      </v-col>
      <v-col cols="12" class="px-0">
        <div>Firstname</div>
        <div>
          <v-text-field outlined v-model="events.firstname"></v-text-field>
        </div>
      </v-col>
       <v-col cols="12" class="px-0">
        <div>Middlename</div>
        <div>
          <v-text-field outlined v-model="events.middlename"></v-text-field>
        </div>
      </v-col>
      <v-col cols="12" class="px-0">
        <div>Remarks</div>
        <div>
          <v-textarea outlined v-model="events.remarks"></v-textarea>
        </div>
      </v-col>
        <v-col cols="12" class="px-5">
        <div>Mode of Payment</div>
        <div>
          <v-select :items="['Cash','Bank Transfer']"  outlined v-model="events.mop"></v-select>
        </div>
      </v-col>
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
        lastname:'',
        middlename:'',
        firstname:'',
        remarks:'',
        mop:'',
        location:''
      },
      buttonLoad: false,
      img_holder:'image_placeholder.png'
    };
  },
  methods: {
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
        form_data.append("lastname", this.events.lastname);
        form_data.append("middlename", this.events.middlename);
        form_data.append("firstname", this.events.firstname);
        form_data.append("remarks", this.events.remarks);
        form_data.append("status", "Pending");
        form_data.append("mop", this.events.mop);
        form_data.append("date_start", this.timestamp());
        form_data.append("location", this.events.location);
        if (this.isAdd) {
          const response = await this.$axios
            .post("/ps/", form_data, {
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
            .patch(`/ps/${this.events.id}/`, form_data, {
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