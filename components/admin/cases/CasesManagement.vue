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
    <div align="center" class="text-h6">Case Form</div>
      <div>
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
              <v-text-field outlined v-model="users.contact_number"  ></v-text-field>
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
                <span class="pt-2 pr-10 pb-10"><b>Uploaded Image</b></span>
                <div class="hover_pointer pt-10">
                  <img
                    @click="$refs.file.click()"
                    :src="users.image"
                    alt="item_.js"
                    height="150"
                    contain
                    width="250"
                    class="mb-0"
                  />
                </div>
              </v-col>
            </v-col>
          </v-row>
          <v-divider></v-divider>
           <div class="text-h6"><b>Category</b></div>
            <div class="pt-5">
              <v-row>
                <v-col cols="4">
                    <div>Case Category</div>
                    <div>
                    <v-select outlined readonly v-model="users.case_category" :items="['Child','Women','Men']"></v-select>
                    </div>
                  </v-col>
              </v-row>
            </div>
               <div class="text-h6">Case Category(Child)</div>
                    <div  v-if="users.case_category=='Child'" >
                     <v-row>
                       <v-col cols="3">
                          <v-checkbox
                          v-model="selected_case"
                          label="Abandoned"
                          value="Abandoned"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Neglected"
                          value="Neglected"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Voluntary committed/surrendered"
                          value="Voluntary committed/surrendered"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Sexually Abused"
                          value="Sexually Abused"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Sexually Exploited"
                          value="Sexually Exploited"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Physically Abused"
                          value="Physically Abused"
                        ></v-checkbox>
                       </v-col>
                         <v-col cols="3">
                          <v-checkbox
                          v-model="selected_case"
                          label="Victims of Bullying"
                          value="Victims of Bullying"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Children in Emergency Situation"
                          value="Children in Emergency Situation"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Children in Situations of Armed Conflict"
                          value="Children in Situations of Armed Conflict"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Victims of Child Labor"
                          value="Victims of Child Labor"
                        ></v-checkbox>
                         <v-checkbox
                          v-model="selected_case"
                          label="Victims of Child Trafficking"
                          value="Victims of Child Trafficking"
                        ></v-checkbox>
                         <v-checkbox
                          v-model="selected_case"
                          label="Street Children"
                          value="Street Children"
                        ></v-checkbox>
                       </v-col>
                         <v-col cols="3">
                          <v-checkbox
                          v-model="selected_case"
                          label="Victims of Illegal Recruitment"
                          value="Victims of Illegal Recruitment"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Children with HIV/AIDS"
                          value="Children with HIV/AIDS"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Children with Disabilities"
                          value="Children with Disabilities"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Children with Behavioral Problem"
                          value="Children with Behavioral Problem"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Children with Emotional Problem"
                          value="Children with Emotional Problem"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Children in Marital Conflict(Custody)"
                          value="Children in Marital Conflict(Custody)"
                        ></v-checkbox>
                       </v-col>
                         <v-col cols="3">
                          <v-checkbox
                          v-model="selected_case"
                          label="Children in Marital Conflict(Support)"
                          value="Children in Marital Conflict(Support)"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Stow Away"
                          value="Stow Away"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Missing"
                          value="Missing"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Children with Problem in Relationship(Parent/Child)"
                          value="Children with Problem in Relationship(Parent/Child)"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Children with Problem in Relationship(Siblings)"
                          value="Children with Problem in Relationship(Siblings)"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Others"
                          value="Others"
                        ></v-checkbox>
                       </v-col>
                     </v-row>
                    </div>
                    <div v-else >
                     <v-row>
                       <v-col cols="3">
                          <v-checkbox
                          v-model="selected_case"
                          label="Sexually Abused"
                          value="Sexually Abused"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Victims of Armed Conflict"
                          value="Victims of Armed Conflict"
                        ></v-checkbox>
                        
                       </v-col>
                         <v-col cols="3">
                         <v-checkbox
                          v-model="selected_case"
                          label="Physically Abused/Maltreated/Battered"
                          value="Physically Abused/Maltreated/Battered"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Women/Men in Detention"
                          value="Women/Men in Detention"
                        ></v-checkbox>
                       </v-col>
                         <v-col cols="3">
                          <v-checkbox
                          v-model="selected_case"
                          label="Victims of Illegal Recruitment"
                          value="Victims of Illegal Recruitment"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Women/Men in Marital Confict"
                          value="Women/Men in Marital Confict"
                        ></v-checkbox>
                       </v-col>
                         <v-col cols="3">
                          <v-checkbox
                          v-model="selected_case"
                          label="Victims of Involuntary Prostitution"
                          value="Victims of Involuntary Prostitution"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_case"
                          label="Women/Men in Marital Conflict"
                          value="Women/Men in Marital Conflict"
                        ></v-checkbox>
                       </v-col>
                     </v-row>
                    </div>
                
           <div class="text-h6"><b>Type of Intervention</b></div>
           <div >
                     <v-row>
                       <v-col cols="3">
                          <v-checkbox
                          v-model="selected_intervention"
                          label="Intake Interview"
                          value="Intake Interview"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_intervention"
                          label="Letter of Invitation"
                          value="Letter of Invitation"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_intervention"
                          label="Briefing/Preparation to Client for Procedural Proceedings"
                          value="Briefing/Preparation to Client for Procedural Proceedings"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_intervention"
                          label="Mediation Dialouge"
                          value="Mediation Dialouge"
                        ></v-checkbox>
                       </v-col>
                         <v-col cols="3">
                          <v-checkbox
                          v-model="selected_intervention"
                          label="Home Visitation"
                          value="Home Visitation"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_intervention"
                          label="Reunification / Re-integration to Family"
                          value="Reunification / Re-integration to Family"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_intervention"
                          label="Intervention / Prevention Proceedings"
                          value="Intervention / Prevention Proceedings"
                        ></v-checkbox>
                       </v-col>
                         <v-col cols="3">
                          <v-checkbox
                          v-model="selected_intervention"
                          label="Rescue Operation"
                          value="Rescue Operation"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_intervention"
                          label="Social Case Study Report"
                          value="Social Case Study Report"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_intervention"
                          label="Travel Clearance (Local,Abroad)"
                          value="Travel Clearance (Local,Abroad)"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_intervention"
                          label="Mediation Conference/Family"
                          value="Mediation Conference/Family"
                        ></v-checkbox>
                       </v-col>
                         <v-col cols="3">
                          <v-checkbox
                          v-model="selected_intervention"
                          label="Psychosocial Processing"
                          value="Psychosocial Processing"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_intervention"
                          label="Attendance to Court Hearing"
                          value="Attendance to Court Hearing"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_intervention"
                          label="Others"
                          value="Others"
                        ></v-checkbox>
                       </v-col>
                     </v-row>
                    </div>
            <div class="text-h6"><b>Referral</b></div>
           <div >
                     <v-row>
                       <v-col cols="3">
                          <v-checkbox
                          v-model="selected_referral"
                          label="Medico Legal Exam"
                          value="Medico Legal Exam"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_referral"
                          label="Temporary Shelter"
                          value="Temporary Shelter"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_referral"
                          label="MSWDO / CSWDO / LSWDO"
                          value="MSWDO / CSWDO / LSWDO"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_referral"
                          label="Refer to DSWD Region IV-A"
                          value="Refer to DSWD Region IV-A"
                        ></v-checkbox>
                       </v-col>
                         <v-col cols="3">
                          <v-checkbox
                          v-model="selected_referral"
                          label="Medical Check up"
                          value="Medical Check up"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_referral"
                          label="Refer to Court / PAO"
                          value="Refer to Court / PAO"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_referral"
                          label="LGU-Case Management"
                          value="LGU-Case Management"
                        ></v-checkbox>
                           <v-checkbox
                          v-model="selected_referral"
                          label="Refer to Cit, Health Office"
                          value="Refer to Cit, Health Office"
                        ></v-checkbox>
                       </v-col>
                         <v-col cols="3">
                       
                        <v-checkbox
                          v-model="selected_referral"
                          label="Psychological Evaluation (NCMH/Private Psychiatrist/Psychologist)"
                          value="Psychological Evaluation (NCMH/Private Psychiatrist/Psychologist)"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_referral"
                          label="Legal Assistance: Affidavit, Bail Processing, ROR"
                          value="Legal Assistance: Affidavit, Bail Processing, ROR"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selected_referral"
                          label="Others"
                          value="Others"
                        ></v-checkbox>
                       </v-col>    
                     </v-row>
                    </div>
          <!-- <div>
            <v-select outlined v-model="users.intervention" :items="['Intake Interview','Letter of Invitation','Briefing / Preparation to Client for Procedural Proceedings','Meditation Dialogue','Home Visitation','Reunification / Re-integration to Family','Intervention/Prevention Proceedings','Rescue Operation','Social Case Study Report','Travel Clearance','Mediation Conference']"></v-select>
          </div> -->
          <div v-if="users.intervention!='' && users.intervention!=undefined">
           
            <div class="text-h6"><b>Information of the alleged perpetrator</b></div>
            <div class="pt-5">
              <v-row>
                <v-col cols="3">
                    <div>Name</div>
                    <div>
                    <v-text-field outlined v-model="users.perpetrator_name"></v-text-field>
                    </div>
                  </v-col>
           
                <v-col cols="3">
                    <div>Nickname</div>
                    <div>
                    <v-text-field outlined v-model="users.perpetrator_nickname"></v-text-field>
                    </div>
                  </v-col>
           
                <v-col cols="3">
                    <div>Age</div>
                    <div>
                    <v-text-field outlined v-model="users.perpetrator_age"></v-text-field>
                    </div>
                  </v-col>
            
                <v-col cols="3">
                    <div>Sex</div>
                    <div>
                    <v-select outlined v-model="users.perpetrator_sex" :items="['Male','Female']"></v-select>
                    </div>
                  </v-col>
          
                <v-col cols="3">
                    <div>Relation to Victim</div>
                    <div>
                    <v-text-field outlined v-model="users.perpetrator_relation"></v-text-field>
                    </div>
                  </v-col>
           
                <v-col cols="3">
                    <div>Occupation</div>
                    <div>
                    <v-text-field outlined v-model="users.perpetrator_occupation"></v-text-field>
                    </div>
                  </v-col>
                
                <v-col cols="3">
                    <div>Address</div>
                    <div>
                    <v-text-field outlined v-model="users.perpetrator_address"></v-text-field>
                    </div>
                  </v-col>
                     <v-col cols="3">
                    <div>Civil Status</div>
                    <div>
                    <v-select outlined v-model="users.perpetrator_status" :items="['Married','Single']"></v-select>
                    </div>
                  </v-col>
                  </v-row>
            </div>
          </div>
          <div v-if="users.intervention!='' && users.intervention!=undefined" class="text-h6"><b>Source of Referral</b></div>
          <div v-if="users.intervention!='' && users.intervention!=undefined">
            <v-select outlined v-model="users.source_of_referral" :items="['Walk in','MSWDO/CSWDO','PNP/WCPD','Womens Desk','Others']"></v-select>
          </div>
          <div v-if="users.intervention!='' && users.intervention!=undefined" class="text-h6"><b>Assigning Social Worker</b></div>
          <div v-if="users.intervention!='' && users.intervention!=undefined">
            <v-select outlined v-model="users.social_worker" :items="['E. Alvarez','F. Ortega','R. Mendoza','Others']"></v-select>
          </div>
          <div v-if="users.intervention!='' && users.intervention!=undefined" class="text-h6"><b>Referral</b></div>
          <div v-if="users.intervention!='' && users.intervention!=undefined">
            <v-select outlined v-model="users.referral" :items="['Medico Legal Exam','Temporary Shelter','MSWDO/ CSWDO','Refer to DSWD Region IV-A','Medical Check up','Refer to Court / PAO','LGU-Case Management','Refer to city Health Office','PNP/WCPD (Inquiry, Blotter, Case Filing)','Psychological Evaluation','Legal Assistance','Others']"></v-select>
          </div>
          <!-- <div v-if="users.category=='Women'">
             <v-row>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isAbandoned"
                    label="Abandoned"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isBullied"
                    label="Victims of Bullying"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isRecruited"
                    label="Victims of Illegal Recruitement"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isConflicted"
                    label="Children in marital conflict"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
          </v-row>
          <v-row>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isNeglected"
                    label="Neglected"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isEmergency"
                    label="Children in Emergency Situation"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isAids"
                    label="Children with HIV/AIDS"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isAway"
                    label="Stow Away"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
          </v-row>
           <v-row>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isSurrendered"
                    label="Voluntary committed/surrendered"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isArmed"
                    label="Children in Situation of Armed Conflict"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isDisablity"
                    label="Children with Disabilities"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isMissing"
                    label="Missing"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
          </v-row>
          
           <v-row>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isAbused"
                    label="Sexually abused"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isLabor"
                    label="Victims of Child Labor"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isBehavior"
                    label="Children with Behavioral Problem"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isRelationship"
                    label="Children with Problem in Relationship(Parent/Child)"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
          </v-row>

          <v-row>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isAbused"
                    label="Sexually abused"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isLabor"
                    label="Victims of Child Labor"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isBehavior"
                    label="Children with Behavioral Problem"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isRelationship"
                    label="Children with Problem in Relationship(Parent/Child)"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
          </v-row>

          <v-row>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isExploited"
                    label="Sexually exploited"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isTraffic"
                    label="Victims of Child Trafficking"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isBehavior"
                    label="Children with Emotional Problem"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isSiblings"
                    label="Children with Problem in Relationship(Siblings)"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
          </v-row>

          <v-row>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isPhysicallyAbused"
                    label="Physically abused/Maltreated/Battered"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isStreetChildren"
                    label="Street Children"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isMaritalConflict"
                    label="Children in Marital Conflict"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
              <v-col cols="3">
                 <v-checkbox
                    v-model="category.isOthers"
                    label="Others"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
              </v-col>
          </v-row>
          </div> -->
          </v-col>
        </v-row>
      </div>
    </v-card>
      </div>
      <v-card-actions>
        <v-row align="center">
            <v-col align="end">
                <v-btn color="red" text @click="viewDetails=false"> Cancel </v-btn>
            </v-col>
            <v-col>
                <v-btn color="success" text :loading="buttonLoad" @click="editItem"> Confirm </v-btn>
            </v-col>
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
    <!-- <beneficiaries-add :isOpen="dialogAdd" @cancel="dialogAdd=false" @refresh="loadData" :items="selectedItem" :isAdd="isAdd" /> -->
    <v-row>
      <v-col align="start" class="pa-10 text-h5" >
        <b>Cases Management</b>
      </v-col>
       <v-row>
        <v-col align-self="center" class="pa-10 ">
        <v-text-field placeholder="search" outlined v-model="search"></v-text-field>
      </v-col>
       <!-- <v-col class="pa-10 ">
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
       </v-col> -->
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
            <v-list-item @click.stop="view(item)">
              <v-list-item-content>
                <v-list-item-title>View</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
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

      items_all:[],
      date:[],
      search:'',
      viewDetails:false,
    category:'',
      buttonLoad:false,
      account_type:'',
      deleteConfirmation:false,
      selectedItem:[],
        events:[],
      selectedItem:{},
      isLoading: false,
      users:{
        firstname:"",
        lastname:'',
        middlename:'',
        birthplace:'',
        age:'',
        sex:'',
        religion:'',
        number_of_siblings:'',
        address:'',
        contact_number:'',
        mothername:'',
        birthplace_mother:'',
        occupation_mother:'',
        referral:'',
    mother_income:'',
    social_worker:'',
    intervention:'',
    source_of_referral:"",
    perpetrator_occupation:'',
    perpetrator_address:'',
    selected_referral:[],
    perpetrator_status:'',
    remarks:'',
    perpetrator_name:'',
    perpetrator_relation:'',
    perpetrator_nickname:'',
    perpetrator_sex:'',
    perpetrator_age:'',

      parentsaddress:'',

        attainment:'',
        attended:'',
        fathername:'',
        birthplace_father:'',
        occupation_father:'',
        father_income:'',
      },
      selected_case:[],
      dialogAdd:false,
      isCategory:false,
      isAdd:true,
      headers: [
        { text: "ID", value: "id" },
        { text: "Firstname", value: "firstname" },
        { text: "Lastname", value: "lastname" },
        { text: "Remarks", value: "remarks" },
        { text: "Category", value: "case_category" },
        { text: "Date", value: "date_start" },
        { text: "Status", value: "status" },
        { text: "Action", value: "opt" },
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
     editItem(){
        this.buttonLoad=true
         var status = 'Pending'
        if(this.users.intervention!='' && this.users.intervention!=undefined){
          status = 'Approved'
        }
      this.$axios.post(`/casecategory-bulk/`,{cases:this.selected_case,referral:this.selected_referral,intervention:this.selected_intervention,case_id:this.users.id},{
         headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      this.$axios.patch(`/cases/${this.users.id}/`,{
          firstname:this.users.firstname,
          lastname:this.users.lastname,
          middlename:this.users.middlename,
          birthplace:this.users.birthplace,
          age:this.users.age,
          sex:this.users.sex,
          religion:this.users.religion,
          number_of_siblings:this.users.number_of_siblings,
          address:this.users.address,
          contact_number:this.users.contact_number,
          attainment:this.users.attainment,
          attended:this.users.attended,
          fathername:this.users.fathername,
          birthplace_father:this.users.birthplace_father,
          occupation:this.users.occupation_father,
          father_income:this.users.father_income,
          mothername:this.users.mothername,
          birthplace_mother:this.users.birthplace_mother,
          occupation_mother:this.users.occupation_mother,
          mother_income:this.users.mother_income,
          parentsaddress:this.users.parentsaddress,
          remarks:this.users.remarks,
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
          status:status,
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
      this.$axios.get(`/casecategory-userid/${item.id}/`,{
         headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res)=>{
        this.selected_case=res.data.cases
        this.selected_intervention = res.data.intervention
        this.selected_referral = res.data.referral
      })
      this.users=item 
      this.viewDetails=true
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
        .get(`/cases/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.events = res.data;
          this.items_all = res.data;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>

</style>