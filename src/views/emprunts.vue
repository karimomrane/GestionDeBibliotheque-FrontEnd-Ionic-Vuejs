<template>
  <ion-page>
    <ion-menu side="start" menu-id="usermenu" content-id="usermenucontent">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>{{name}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
         <ion-item class="clickable" router-link='/books'><ion-icon slot="start" name="book"></ion-icon>Liste des Livres</ion-item>
        <ion-item class="clickable" router-link='/emprunts'><ion-icon slot="start" name="file-tray-full"></ion-icon>Emprunts</ion-item>
        <ion-item class="clickable" router-link='/historique'><ion-icon slot="start" name="list"></ion-icon>Historique</ion-item>
                <ion-item class="clickable" router-link='/userprofile'><ion-icon slot="start" name="person"></ion-icon>Profile</ion-item>

        <ion-item class="clickable"><ion-button @click="logout()" expand="full" fill="clear"><ion-icon slot="start" name="log-out"></ion-icon>Déconnexion</ion-button></ion-item>
      </ion-list>
    </ion-content>
    </ion-menu>
    

    <ion-header translucent>
        <ion-toolbar color="primary"> 
            <ion-title>
               Emprunts
            </ion-title>
            <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
        </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" forceOverscroll>
     <ion-card>
        <ion-card-content>
           <ion-list-header>
        <h2>Emprunt</h2> 
        </ion-list-header>
      <ion-item>
         <ion-label>Les utilisateurs</ion-label>
           <ion-select v-model="user" interface="action-sheet">
            <ion-select-option v-for="user in users" :key="user" :value="user.id" >{{user.name}}</ion-select-option>
          </ion-select>
      </ion-item>
       <ion-item>
         <ion-label>Les livres</ion-label>
           <ion-select v-model="livre" interface="action-sheet">
            <ion-select-option v-for="livre in livres" :key="livre" :value="livre.id">{{livre.titre}}</ion-select-option>
          </ion-select>
      </ion-item>
      <ion-button @click="emprunter()">Emprunter</ion-button>
        </ion-card-content>
    </ion-card>      
  <ion-card>
      <ion-card-content>   
         
          <ion-list-header>
        <h2>Liste des Emprunts</h2> 
        </ion-list-header>
        <ion-list v-for="(emp,index) in emps" :key="index">
        

        <ion-item>
            <ion-item>
         <ion-icon name="person-circle-outline" size="large"></ion-icon> 
            </ion-item>
          <ion-label>
            <h2>{{ emp.user.name }}</h2>
            <h2>{{ emp.livre.titre }}</h2>
            <p>{{emp.created_at}}</p>
            <ion-button slot="end" @click="rendre(emp.user.id,emp.livre.id,emp.created_at,emp.id,index)" color="warning">Rendre</ion-button>
          </ion-label>
        </ion-item>
        </ion-list>

      </ion-card-content>
  </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage,IonIcon, IonItem,toastController, IonLabel, IonCard, IonCardContent,IonMenu,IonToolbar,IonSelect,IonSelectOption } from '@ionic/vue';
import { defineComponent } from 'vue';
import { addIcons } from "ionicons";
import { image,personCircle,fileTrayFull } from "ionicons/icons";
import router from '../router';
import axios from 'axios';
addIcons({
  "image": image,
  "person-circle-outline":personCircle,
  "file-tray-full":fileTrayFull
})

export default defineComponent({
  data() {
    return {
     emps:[],
     users:[],
     livres:[],
     livre:'',
     user:'',
     
    }
  },
   created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    axios
        .get('http://127.0.0.1:8000/api/emprunts/')
        .then(response=>this.emps=response.data)
        .catch(error => this.$router.push({name: 'Home'}))
    axios
        .get('http://127.0.0.1:8000/api/users/')
        .then(response=>this.users=response.data)
        .catch(error => this.$router.push({name: 'Home'}))
    axios
        .get('http://127.0.0.1:8000/api/livres/')
        .then(response=>this.livres=response.data)
        .catch(error => this.$router.push({name: 'Home'}))
  },
  methods: {
    emprunter(){
      axios.post('http://127.0.0.1:8000/api/emprunts/',
               {
                  livre:this.livre,
                  user:this.user
               }).then(async (response) => {
                  axios
        .get('http://127.0.0.1:8000/api/emprunts/')
        .then(response=>this.emps=response.data)
        .catch(error => this.$router.push({name: 'Home'}))
                const toast = await toastController
                  .create({
                    message: response.data,
                    color: 'success',
                    duration: 2000
                  })
                return toast.present();
               
                 }).catch(async error => {
                   const toast = await toastController
                  .create({
                    message: error,
                    color: 'danger',
                    duration: 2000
                  })
                return toast.present();
                 })
    },
    rendre(user: any,livre: any,dateemp: any,emp: any, index: number){
      axios.post('http://127.0.0.1:8000/api/historique/',{
        livre:livre,
        user:user,
        'created_at':dateemp,
        emprunt:emp
      }).then(response=>{
        this.emps.splice(index,1);
      })
    }
  },
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonItem,
    IonLabel, IonCard, IonCardContent,IonMenu,IonToolbar,IonIcon,
    IonSelect,IonSelectOption
    
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

.avatar {

margin-left: 42%;

}
.clickable {
pointer-events: auto !important;
}
</style>