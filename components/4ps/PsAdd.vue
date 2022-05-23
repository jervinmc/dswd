<template>
<v-form ref="form">
   <v-overlay
            :absolute="true"
            :value="fullscreenImage"
          >  
           <v-card height="700">
                <v-img :src="image_view"  width="800">
                  <div align="end" class="pa-10"> 
            <div class="pt-16">
                <v-icon @click="cancelImage" color="red" size="40">
                mdi-close
              </v-icon>
            </div>
            </div>
              </v-img>
           </v-card>
       </v-overlay>
  <v-dialog v-model="isOpen" width="1000" persistent>
    <v-card class="pa-10">
     <div>
        <v-icon color="red" @click="cancel">mdi-close</v-icon>
      </div>
      <div align="center" class="text-h6">Request 4ps</div>
      <div>
        <v-row>
          <v-col  cols="6" align="center">
              <v-img src="/main_logo.png" height="80" width="80"></v-img>
          </v-col>
          <v-col cols="6" align="center">
             <v-img src="/calamba_logo.png" height="80" width="80"></v-img>
          </v-col>
        </v-row>
      </div>
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
    <v-row>
        <v-col>
           <v-col>
        <span class="pt-2 pr-10 pb-10"><b>Upload Image<v-icon @click="$refs.file.click()">mdi-plus</v-icon></b></span>

        <div class="hover_pointer pt-10">
          <img
            @click="viewImage(img_holder)"
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
        </v-col>
        <v-col>
           <v-col>
        <span class="pt-2 pr-10 pb-10"><b>Upload Image 2<v-icon @click="$refs.file2.click()">mdi-plus</v-icon></b></span>

        <div class="hover_pointer pt-10">
          <img
            @click="viewImage(img_holder2)"
            :src="img_holder2"
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
                id="fileInput2"
                ref="file2"
                accept="image/png, image/jpeg"
                @change="onFileUpload2"
              />
            </v-col>
        </v-col>
        <v-col>
           <v-col>
        <span class="pt-2 pr-10 pb-10"><b>Upload Image 3<v-icon @click="$refs.file3.click()">mdi-plus</v-icon></b></span>

        <div class="hover_pointer pt-10">
          <img
            @click="viewImage(img_holder3)"
            :src="img_holder3"
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
                id="fileInput3"
                ref="file3"
                accept="image/png, image/jpeg"
                @change="onFileUpload3"
              />
            </v-col>
        </v-col>
      </v-row>
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
        this.img_holder2=this.items.image1
        this.img_holder3=this.items.image2
    },
  },
  data() {
    return {
      image2:'',
      image3:'',
img_holder2:'',
      img_holder3:'',
      room_list:['Standard','Deluxe','Suite'],
      events:{
        lastname:'',
        middlename:'',
        firstname:'',
        remarks:'',
        mop:'',
        location:''
      },
      fullscreenImage:false,
      buttonLoad: false,
      img_holder:'image_placeholder.png'
    };
  },
  methods: {
     cancelImage(){
      this.isOpen=true
      this.fullscreenImage=false
    },
    viewImage(image){
      this.image_view = image
      this.fullscreenImage = true
      this.isOpen=false
    },
       onFileUpload2(e) {
      this.image2 = e;
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
      this.image2 = e;
      if (e == null) {
      } else {
        this.url, (this.img_holder2 = URL.createObjectURL(e));
      }
    },
     onFileUpload3(e) {
      this.image3 = e;
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
      this.image3 = e;
      if (e == null) {
      } else {
        this.url, (this.img_holder3 = URL.createObjectURL(e));
      }
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
        if (this.image2 != null && this.image2 != "") {
          form_data.append("image1" ,this.image2);
        }
        if (this.image3 != null && this.image3 != "") {
          form_data.append("image2", this.image3);
        }
        form_data.append("lastname", this.events.lastname);
        form_data.append("middlename", this.events.middlename);
        form_data.append("firstname", this.events.firstname);
        form_data.append("remarks", this.events.remarks);
        
        form_data.append("mop", this.events.mop);
        form_data.append("date_start", this.timestamp());
        form_data.append("location", this.events.location);
        if (this.isAdd) {
          form_data.append("status", "Pending");
          form_data.append("user_id", localStorage.getItem('id'));
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