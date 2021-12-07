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
        <ion-item class="clickable" href='/emprunts'><ion-icon slot="start" name="file-tray-full"></ion-icon>Emprunts</ion-item>
        <ion-item class="clickable" router-link='/historique'><ion-icon slot="start" name="list"></ion-icon>Historique</ion-item>
                <ion-item class="clickable" router-link='/userprofile'><ion-icon slot="start" name="person"></ion-icon>Profile</ion-item>

        <ion-item class="clickable"><ion-button @click="logout()" expand="full" fill="clear"><ion-icon slot="start" name="log-out"></ion-icon>Déconnexion</ion-button></ion-item>
      </ion-list>
    </ion-content>
    </ion-menu>
    

    <ion-header translucent>
        <ion-toolbar color="primary"> 
            <ion-title>
               Historique
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
        <h2>Historique</h2> 
        </ion-list-header>
        <ion-list v-for="(his,index) in historiques" :key="index">
        <ion-item>
            <ion-item>
         <ion-icon name="person-circle-outline" size="large"></ion-icon> 
            </ion-item>
          <ion-label>
            <h2>{{ his.user.name }}</h2>
            <h2>{{ his.livre.titre }}</h2>
            <p>{{his.created_at}}</p>
            <p>{{his.updated_at}}</p>
          </ion-label>
        </ion-item>
        </ion-list>

      </ion-card-content>
  </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage,IonIcon, IonItem,toastController, IonLabel, IonCard, IonCardContent,IonMenu,IonToolbar} from '@ionic/vue';
import { defineComponent } from 'vue';
import { addIcons } from "ionicons";
import { image,personCircle,fileTrayFull,listOutline } from "ionicons/icons";
import router from '../router';
import axios from 'axios';
addIcons({
  "image": image,
  "person-circle-outline":personCircle,
  "file-tray-full":fileTrayFull,
  "list":listOutline
})

export default defineComponent({
  data() {
    return {
     historiques:[]
    }
  },
   created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    axios
        .get('http://127.0.0.1:8000/api/historique/')
        .then(response=>this.historiques=response.data)
        .catch(error => this.$router.push({name: 'Home'}))
  },
  methods: {
   
  },
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonItem,
    IonLabel, IonCard, IonCardContent,IonMenu,IonToolbar,IonIcon,
    
    
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