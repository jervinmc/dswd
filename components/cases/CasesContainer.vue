<template>
  <div>
    <v-snackbar
      top
      absolute
      bottom
      color="error"
      outlined
      centered
      v-model="snackbar"
    >
      Wrong Credentials
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
     <v-snackbar
      top
      absolute
      bottom
      color="error"
      outlined
      centered
      v-model="snackbarisVerified"
    >
      Not yet verified. Please check your email. Thank you!
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbarisVerified = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-card width="1300">
      <div
        style="background-color: #6609af; color: white"
        align="start"
        class="pa-5"
      >
        Case Form 
      </div>
      <div class="pa-5" align="start">
        <v-row>
           <v-col cols="12">
            <div>Category</div>
            <div>
              <v-select outlined v-model="users.case_category" :items="['Women','Child','Men']"></v-select>
            </div>
          </v-col>
          <v-col>
            <div>Firstname</div>
            <div>
              <v-text-field outlined v-model="users.firstname"></v-text-field>
            </div>
          </v-col>
          <v-col cols="4">
            <div>Lastname</div>
            <div>
              <v-text-field outlined v-model="users.lastname" ></v-text-field>
            </div>
          </v-col>
          <v-col cols="4">
            <div>Middlename</div>
            <div>
              <v-text-field outlined v-model="users.middlename" ></v-text-field>
            </div>
          </v-col>
          <v-col cols="4">
            <div>Place of Birthplace</div>
            <div>
              <v-text-field outlined v-model="users.birthplace"></v-text-field>
            </div>
          </v-col>
          <v-col cols="4">
            <div>Age</div>
            <div>
              <v-text-field outlined v-model="users.age" ></v-text-field>
            </div>
          </v-col>
          <v-col cols="4">
            <div>Sex</div>
            <div>
             <v-select outlined v-model="users.sex" :items="['Male','Female']"></v-select>
            </div>
          </v-col>
          <v-col cols="4">
            <div>Religion</div>
            <div>
              <v-text-field outlined v-model="users.religion" ></v-text-field>
            </div>
          </v-col>
           <v-col cols="4">
            <div>Number of Siblings</div>
            <div>
              <v-text-field outlined v-model="users.number_of_siblings" ></v-text-field>
            </div>
          </v-col>
           <v-col cols="4">
            <div>Address</div>
            <div>
              <v-text-field outlined v-model="users.address" ></v-text-field>
            </div>
          </v-col>
          <v-col cols="4">
            <div>Contact Number</div>
            <div>
              <v-select outlined v-model="users.contact_number" :items="['In-School','OSY']" ></v-select>
            </div>
          </v-col>
          <v-col cols="4">
            <div>Educational Attainment</div>
            <div>
              <v-select outlined v-model="users.attainment" :items="['In-School','OSY']" ></v-select>
            </div>
          </v-col>
          <v-col cols="4">
            <div>Last School Attended</div>
            <div>
              <v-text-field outlined v-model="users.attended" ></v-text-field>
            </div>
          </v-col>
          <v-col cols="3">
            <div>Name of Father</div>
            <div>
             <v-text-field outlined v-model="users.fathername" ></v-text-field>
            </div>
          </v-col>
          <v-col cols="3">
            <div>Father's Birthplace</div>
            <div>
              <v-text-field outlined v-model="users.birthplace_father" ></v-text-field>
            </div>
          </v-col>
           <v-col cols="3">
            <div>Occupation</div>
            <div>
              <v-text-field outlined v-model="users.occupation_father" ></v-text-field>
            </div>
          </v-col>
          <v-col cols="3">
            <div>Monthly Income</div>
            <div>
              <v-text-field outlined v-model="users.income_father" ></v-text-field>
            </div>
          </v-col>
           <v-col cols="3">
            <div>Name of Mother</div>
            <div>
              <v-text-field outlined v-model="users.mothername" ></v-text-field>
            </div>
          </v-col>
          <v-col cols="3">
            <div>Mother's Birthplace</div>
            <div>
              <v-text-field outlined v-model="users.birthplace_mother" ></v-text-field>
            </div>
          </v-col>
           <v-col cols="3">
            <div>Occupation</div>
            <div>
              <v-text-field  outlined v-model="users.occupation_mother" ></v-text-field>
            </div>
          </v-col>
          <v-col cols="3">
            <div>Monthly Income</div>
            <div>
              <v-text-field  outlined v-model="users.income_mother" ></v-text-field>
            </div>
          </v-col>
           <v-col cols="12">
            <div>Parent's Address</div>
            <div>
              <v-text-field outlined v-model="users.parentsaddress" ></v-text-field>
            </div>
          </v-col>
          <v-col cols="12">
            <div>Remarks</div>
            <div>
              <v-textarea outlined v-model="users.remarks"></v-textarea>
            </div>
          </v-col>
          <v-col cols="12">
          <v-row>
            <v-col>
              <v-col>
                <div>Please Upload I.D</div>
                <span class="pt-2 pr-10 pb-10"><b>Upload Image</b></span>
                <div class="hover_pointer pt-10">
                  <img
                    @click="$refs.file.click()"
                    :src="img_holder"
                    alt="item_.js"
                    height="150"
                    contain
                    width="250"
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
          </v-row>
          </v-col>
        </v-row>
        <div align="center">
          <v-btn depressed color="#6609af" dark @click="submit" :loading="isLoaded"> Submit </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar:false,
      img_holder: 'image_placeholder.png',
      image: '',
      url: '',
      users:[],
      isLoaded:false,
      snackbarisVerified:false
    }
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
      onFileUpload(e) {
      this.image = e
      e = e.target.files[0]
      if (e['name'].length > 100) {
        alert('255 characters exceeded filename.')
        return
      }
      try {
        if (e.size > 16000000) {
          alert('Only 15mb file can be accepted.')
          return
        }
      } catch (error) {
        alert(error)
        return
      }
      this.image = e
      if (e == null) {
      } else {
        this.url, (this.img_holder = URL.createObjectURL(e))
      }
    },
     async submit() {
      this.isLoaded = true;
      try {
        let form_data = new FormData()
        if (this.image != null && this.image != '') {
          form_data.append('image', this.image)
        }
        form_data.append('status', 'Pending')
        form_data.append('firstname', this.users.firstname)
        form_data.append('case_category', this.users.case_category)
        form_data.append('middlename', this.users.middlename)
        form_data.append('lastname', this.users.lastname)
        form_data.append('bithplace', this.users.bithplace)
        form_data.append('age', this.users.age)
        form_data.append('sex', this.users.sex)
        form_data.append('religion', this.users.religion)
        form_data.append('number_of_siblings', this.users.number_of_siblings)
        form_data.append('address', this.users.address)
        form_data.append('attainment', this.users.attainment)
        form_data.append('attended', this.users.attended)
        form_data.append('birthplace', this.users.birthplace)
        form_data.append('fathername', this.users.fathername)
        form_data.append("date_start", this.timestamp());
        form_data.append('birthplace_father', this.users.birthplace_father)
        form_data.append('occupation_father', this.users.occupation_father)
        form_data.append('mothername', this.users.mothername)
        form_data.append('contact_number', this.users.contact_number)
        form_data.append('birthplace_mother', this.users.birthplace_mother)
        form_data.append('occupation_mother', this.users.occupation_mother)
        form_data.append('parentsaddress', this.users.parentsaddress)
        form_data.append('income_mother', this.users.income_mother)
        form_data.append('income_father', this.users.income_father)
        form_data.append('remarks', this.users.remarks)
        const response = await this.$axios
          .post('/cases/', form_data, {
            headers: {},
          })
          .then(() => {
            this.isRegistered = true
            // this.$refs.form.reset()
            this.isRegistered = true
            this.isLoaded = false
          })
      } catch {
        this.isLoaded = false
      }
    },
    onFileUpload(e) {
      this.image = e
      e = e.target.files[0]
      if (e['name'].length > 100) {
        alert('255 characters exceeded filename.')
        return
      }
      try {
        if (e.size > 16000000) {
          alert('Only 15mb file can be accepted.')
          return
        }
      } catch (error) {
        alert(error)
        return
      }
      this.image = e
      if (e == null) {
      } else {
        this.url, (this.img_holder = URL.createObjectURL(e))
      }
    },
  },
}
</script>

<style>
</style>