<template>
  <ion-page>
    <ion-header :translucent="true"> </ion-header>
    
    <ion-content :fullscreen="true">
    
  <ion-card id="container">
      <ion-card-header>
         <ion-card-title>Connexion</ion-card-title>
      </ion-card-header>
      <ion-card-content>   
        <ion-item>
          <ion-label position="floating">Nom d'utilisateur</ion-label>
          <ion-input type="text" v-model="username"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Mot de passe</ion-label>
          <ion-input type="password" v-model="password"></ion-input>
        </ion-item>

          <ion-button expand="block" @click="login(username,password)">Connexion</ion-button><br />
          <ion-label>Si vous avez pas un compte <ion-label color="danger" router-link='/signup'>inscription ici </ion-label></ion-label>
      </ion-card-content>
  </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader,toastController, IonPage, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardTitle } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios'; 
export default defineComponent({
  data() {
    return {
      username:'',
      password:''
    }
  },
  methods: {
    login(username: any,password: any){
      if (localStorage.getItem('token')) {
        this.$router.push('/books');
      }else{
      axios.post('http://127.0.0.1:8000/api/login',{
        email:this.username,
        password:this.password
      }).then(async (response) =>{
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('name',response.data.user.name)
        localStorage.setItem('email',response.data.user.email)
        this.$router.push('/books')
      }).catch(async error =>{
        const toast = await toastController
                  .create({
                    message:'Bad creds',
                    color: 'danger',
                    duration: 2000
                  })
                return toast.present();
      })
      }
    }
  },
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonItem,
    IonInput,
    IonLabel, IonButton, IonCardTitle, IonCard, IonCardContent

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