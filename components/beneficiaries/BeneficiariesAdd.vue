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
         <div ref="content"  class="d-none">
        <div align="center" style="font-size:30px;text-align:center;padding-bottom:20px" class="text-h6">
         <b> Beneficiaries Form</b>
        </div>
         <div>Fullname : {{events.firstname}} {{events.lastname}}</div>
          <div>Occupation : {{events.occupation}}</div>
           <div>Beneficiaries Type : {{events.beneficiaries_type}} {{events.lastname}}</div>
            <div>Location : {{events.location}} {{events.lastname}}</div>
         <div>Mode of Payment : {{events.mop}}</div>
         </div>
       <div>
        <v-icon color="red" @click="cancel">mdi-close</v-icon>
      </div>
      <div align="center" class="text-h6">Beneficiaries</div>
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
        <div>Occupation</div>
        <div>
          <v-text-field outlined v-model="events.occupation"></v-text-field>
        </div>
      </v-col>
      <v-col cols="12" class="px-0">
        <div>Beneficiaries Type</div>
        <div>
          <v-select outlined :items="['Burial Type','Medical Type','Educational Type']" v-model="events.beneficiaries_type"></v-select>
        </div>
      </v-col>
        <v-col cols="12" class="px-0">
        <div>Contact Number</div>
        <div>
          <v-text-field outlined v-model="events.contact_number"></v-text-field>
        </div>
      </v-col>
      <v-col cols="12" class="px-0">
        <div>Location</div>
        <div>
          <v-text-field :items="selection" outlined v-model="events.location"></v-text-field>
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
           <v-col>
            <v-btn
              color="success"
              text
              v-if="!isAdd"
              @click="downloadPdf"
              :loading="buttonLoad"
            >
              Print
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-form>
</template>

<script>
import jspdf from 'jspdf'
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
      fullscreenImage:false,
      image2:'',
      image3:'',
      img_holder2:'',
      img_holder3:'',
      room_list:['Standard','Deluxe','Suite'],
      events:{
        "lastname":"",
        "middlename":"",
        "firstname":"",
        "occupation":"",
        "mop":"",
        "beneficiaries_type":"",
        "location":""
      },
      buttonLoad: false,
      img_holder:'image_placeholder.png'
    };
  },
  methods: {
        downloadPdf(){
       const doc = new jspdf()
      const html = this.$refs.content.innerHTML
      doc.fromHTML(html,15,15,{
        width:150
      })
      doc.save('output.pdf')
    
    },
     cancelImage(){
      this.isOpen=true
      this.fullscreenImage=false
    },
    viewImage(image){
      this.image_view = image
      this.fullscreenImage = true
      this.isOpen=false
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
          form_data.append("image1", this.image2);
        }
        if (this.image3 != null && this.image3 != "") {
          form_data.append("image2", this.image3);
        }
        form_data.append("lastname", this.events.lastname);
         form_data.append("contact_number", this.events.contact_number);
        form_data.append("middlename", this.events.middlename);
        form_data.append("firstname", this.events.firstname);
        form_data.append("occupation", this.events.occupation);
        form_data.append("mop", this.events.mop);
        form_data.append("beneficiaries_type", this.events.beneficiaries_type);
       
     
        form_data.append("date_start", this.timestamp());
        form_data.append("location", this.events.location);
        if (this.isAdd) {
           form_data.append("status", "Pending");
             form_data.append("user_id", localStorage.getItem('id'));
          const response = await this.$axios
            .post("/beneficiaries/", form_data, {
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
            .patch(`/beneficiaries/${this.events.id}/`, form_data, {
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
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style>
</style>