<template>
  <ion-page>
    <ion-header :translucent="true"> </ion-header>
    
    <ion-content :fullscreen="true">
    
  <ion-card id="container">
      <ion-card-header>
         <ion-card-title>Inscription</ion-card-title>
      </ion-card-header>
      <ion-card-content>   
        <ion-item>
          <ion-label position="floating">Nom et Prenom</ion-label>
          <ion-input type="text" placeholder="Nom et Prenom" v-model="nom"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input type="email" placeholder="Email" v-model="email"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Mot de passe</ion-label>
          <ion-input type="password" placeholder="Mot de passe" v-model="mdp"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Re-Mot de passe</ion-label>
          <ion-input type="password" placeholder="Re-Mot de passe" v-model="remdp"></ion-input>
        </ion-item>


        <ion-item>
          <ion-label>Date de naissance</ion-label>
          <ion-datetime value="1990-02-19" placeholder="Date de naissance" v-model="date"></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label>Classe</ion-label>
          <ion-select value="Classe" v-model="classe">
            <ion-select-option value="classe1">L1TI</ion-select-option>
            <ion-select-option value="classe2">L2DSI</ion-select-option>
            <ion-select-option value="classe3">L3DSI</ion-select-option>
          </ion-select>
        </ion-item>

          <ion-button expand="block" @click="register(nom,email,mdp,remdp,date,classe)">Inscription</ion-button><br />
          <ion-label>Si vous avez Dèja un compte <ion-label color="danger" router-link="/home">Connexion Ici </ion-label></ion-label>
          <ion-label>{{date}}</ion-label>
      </ion-card-content>
  </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonDatetime, IonSelect, IonSelectOption,toastController, IonContent, IonHeader, IonPage, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardTitle } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import moment from 'moment'
export default defineComponent({
  data() {
    return {
      nom:'',
      email:'',
      mdp:'',
      remdp:'',
      date:'',
      classe:''
      
    }
  },
  methods: {
    register(name: any,email: any,password: any,passwordconfirmation: any,date: Date,classe: any){
         axios.post('http://127.0.0.1:8000/api/register',{
        name:this.nom,
        email:this.email,
        password:this.mdp,
        passwordconfirmation :this.remdp,
        date:moment(String(this.date)).format('YYYY-MM-DD'),
        classe:this.classe,
      }).then(async (response) =>{
        const toast = await toastController
                  .create({
                    message:'User created',
                    color: 'success',
                    duration: 2000
                  })
                return toast.present(),this.$router.push('/home');
        
      }).catch(async error =>{
        const toast = await toastController
                  .create({
                    message:error,
                    color: 'danger',
                    duration: 2000
                  })
                return toast.present();
      })
    }
  },
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonItem,
    IonInput,
    IonLabel, IonButton, IonCardTitle, IonCard, IonCardContent, IonSelectOption, IonDatetime, IonSelect

  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}

</style>