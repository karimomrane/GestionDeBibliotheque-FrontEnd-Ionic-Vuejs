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
        <ion-item class="clickable" router-link='/userprofile'><ion-icon slot="start" name="person"></ion-icon>Profile</ion-item>
        <ion-item class="clickable" router-link='/emprunts'><ion-icon slot="start" name="emp"></ion-icon>Emprunts</ion-item>
        <ion-item class="clickable"><ion-button @click="logout()" expand="full" fill="clear"><ion-icon slot="start" name="log-out"></ion-icon>Déconnexion</ion-button></ion-item>
      </ion-list>
    </ion-content>
    </ion-menu>
    

    <ion-header translucent>
        <ion-toolbar color="primary"> 
            <ion-title>
               Profile
            </ion-title>
            <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
        </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" forceOverscroll>
           
  <ion-card id="container">
      <ion-card-header>
         <ion-card-title>Profile</ion-card-title>
      </ion-card-header>
      <ion-card-content>   
        <ion-item>
            <ion-avatar class="avatar">
                <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png">
            </ion-avatar>
        </ion-item>
        <ion-item>
          <ion-label>{{ name }}</ion-label>     
          
        </ion-item>
          <ion-item>
           
          <ion-label>{{ email }}</ion-label>    
        </ion-item>
        <ion-list>
            <ion-item>
                TITRE 1 : 20/10/2021 08:00 AM <ion-badge color="success" slot="end"> re le 20/11/2021 </ion-badge>
            </ion-item>

            <ion-item>
                TITRE 2 : 20/10/2021 09:00 AM <ion-badge color="success" slot="end"> re le 20/11/2021 </ion-badge>
            </ion-item>

            <ion-item>
                TITRE 3 : 20/10/2021 10:00 AM <ion-badge color="danger" slot="end"> annuler </ion-badge>
            </ion-item>

            <ion-item>
                TITRE 4 : 20/10/2021 11:00 AM <ion-badge color="danger" slot="end"> annuler </ion-badge>
            </ion-item>
        </ion-list>

      </ion-card-content>
  </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonItem, IonLabel, IonCard, IonCardContent, IonCardTitle,IonMenu } from '@ionic/vue';
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
      name:localStorage.getItem('name'),
      email:localStorage.getItem('email')
    }
  },
   created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    axios
        .get('http://127.0.0.1:8000/api/livres/')
        .then()
        .catch(error => this.$router.push({name: 'Home'}))
  },
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonItem,
    IonLabel, IonCardTitle, IonCard, IonCardContent,IonMenu
    
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