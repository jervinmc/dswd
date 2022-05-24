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
         <b> SAP Form</b>
        </div>
         <div>Fullname : {{events.firstname}} {{events.lastname}}</div>
          <div>Gender : {{events.gender}}</div>
           <div>Address : {{events.address}} {{events.lastname}}</div>
            <div>Occupation : {{events.occupation}} {{events.lastname}}</div>
         <div>Valid ID : {{events.valid_id}}</div>
          <div>ID Number : {{events.id_number}}</div>
           <div>Contact Number : {{events.contact_number}}</div>
            <div>Workplace : {{events.workplace}}</div>
             <div>Sector : {{events.sector}}</div>
              <div>Health Condition : {{events.health_condition}}</div>
  <div>Family Member : {{events.family_member}}</div>
  <div>Barangay : {{events.barangay}}</div>
  <div>Mode of Payment : {{events.mop}}</div>
         </div>
   <div>
        <v-icon color="red" @click="cancel">mdi-close</v-icon>
      </div>
      <div align="center" class="text-h6">Request SAP</div>
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
      <v-row v-if="$route.name=='admin-requests'">
        <v-col align="end">
              <v-btn color="red" :loading="isLoading" text @click="status('Disapproved')"> Disapprove </v-btn>
        </v-col>
        <v-col>
           <v-btn
              color="success"
              text
              @click="status('Approved')"
              :loading="isLoading"
            >
              Approve
            </v-btn>
        </v-col>
      </v-row>
      <div>
         <div>
          Note : *Sector-   A. Nakakatanda B. Buntis C. Nag papasusong-ina  D. PWD E. Solo parent F. Walang tirahan
*health condition- 1. Sakit sa puso 2. Altapresyon 3. Sakit sa baga 4. Dyabetis 5. Kanser
        </div>
      </div>
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
           <v-col  v-if="!isAdd">
            <v-btn
              color="success"
              text
             
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
      image_view:'',
      image2:'',
      image3:'',
img_holder2:'',
      img_holder3:'',
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
        family_member:'',
        



      },
      fullscreenImage:false,
      buttonLoad: false,
      barangay:[],
      img_holder:'image_placeholder.png'
    };
  },
  created(){
    this.eventsGetall()
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
     async status(status) {
      this.isLoading = true;
      const res = await this.$axios
        .patch(
          `/sap/${this.events.id}/`,
          {
            status: status ,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.$emit('refresh')
      
        });
    },
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
        if (this.image2 != null && this.image2 != "") {
          form_data.append("image1", this.image2);
        }
        if (this.image3 != null && this.image3 != "") {
          form_data.append("image2", this.image3);
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
          form_data.append("status", "Pending");
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