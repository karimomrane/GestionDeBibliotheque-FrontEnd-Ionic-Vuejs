<template>
  <ion-page>
   
    

    <ion-header translucent>
        <ion-toolbar color="primary"> 
             <ion-buttons slot="start">
                <ion-back-button default-href="Books"></ion-back-button>
              </ion-buttons>
            <ion-title>
               Modifier un livre
            </ion-title>
            <ion-buttons slot="start">
          </ion-buttons>
        </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
    
  <ion-card id="container">
      <ion-card-header>
         <ion-card-title>Modifier un livre</ion-card-title>
      </ion-card-header>
      <ion-card-content>   
        <form>
        <ion-item>
          <ion-label position="floating">Titre de livre</ion-label>
          <ion-input v-model="titre"></ion-input>
        </ion-item>
         <ion-item>
          <ion-label position="floating">ISBN</ion-label>
          <ion-input v-model="isbn"></ion-input>
        </ion-item>
         <ion-item>
          <ion-label position="floating">Année</ion-label>
          <ion-input v-model="annee_edition"></ion-input>
        </ion-item>
        <ion-item>
    <ion-label position="floating">Resume</ion-label>
    <ion-textarea v-model="resume"></ion-textarea>
  </ion-item>
         <ion-item>
          <ion-label position="floating">Nombre d'exemplaire</ion-label>
          <ion-input v-model="nbr_exemplaire"></ion-input>
        </ion-item>
       <ion-item>
          <ion-label position="floating">Image URL</ion-label>
          <ion-input v-model="image"></ion-input>
        </ion-item>
         <ion-button expand="block" @click="formSubmit(this.$route.params.id)">Modifier</ion-button>
        </form>
      </ion-card-content>
  </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonTextarea, IonContent, IonHeader, IonPage, IonItem, 
IonLabel, IonInput, IonButton, IonCard, IonCardContent,toastController, IonCardTitle,IonBackButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { addIcons } from "ionicons";
import { image } from "ionicons/icons";
import axios from 'axios';
addIcons({
  "image": image
})

export default defineComponent({
  data() {
    return {
       titre:this.$route.params.titre,
       isbn:this.$route.params.isbn,
      'annee_edition':this.$route.params.annee,
       resume:this.$route.params.resume,
      'nbr_exemplaire':this.$route.params.nbr_exemplaire,
       image:this.$route.params.image,
       data:null,
    }
  },
   created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    axios
        .get('http://127.0.0.1:8000/api/livres/')
        .then()
        .catch(error => this.$router.push({name: 'Home'}))
  },
  methods: {  
            formSubmit(id: BigInteger) {  
               axios.put('http://127.0.0.1:8000/api/livres/'+id,
               {
                   titre: this.titre,
                   isbn: this.isbn,
                  'annee_edition':this.annee_edition,
                   resume: this.resume,
                   'nbr_exemplaire':this.nbr_exemplaire,
                   image: this.image,
               })
              .then(async (response) => {  
                 if(response.status==200){
                   
                const toast = await toastController
                  .create({
                    message: 'Le livre a été modifié',
                    color: 'success',
                    duration: 2000
                  })
                return toast.present();
                }
                 }).catch(async error => {
                   const toast = await toastController
                  .create({
                    message: error,
                    color: 'danger',
                    duration: 2000
                  })
                return toast.present();
                 });
            } 
             
        },  
  
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonItem,
    IonInput,
    IonLabel, IonButton, IonCardTitle, IonCard, IonCardContent,IonTextarea,
IonBackButton
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