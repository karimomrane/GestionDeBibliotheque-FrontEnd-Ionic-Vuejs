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
               Liste des Livres
            </ion-title>
            <ion-fab-button size="small" router-link="/addbook" edge slot="end" color="primary"><ion-icon  name="add-circle"></ion-icon></ion-fab-button>
            <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
             <ion-searchbar animated show-cancel-button="focus" debounce="400" color="light" v-model="keyword"></ion-searchbar>
          </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-item v-for="(livre,index) in livres" :key="index">
        <ion-card>
            <ion-img :src="livre.image"></ion-img>
            <ion-card-content>
            <ion-card-title>{{ livre.titre }}</ion-card-title>
            <ion-card-subtitle>{{ livre.isbn }}</ion-card-subtitle>
            
            <ion-item>
            
                <ion-label class="ion-text-wrap">
                  {{ livre.resume }}
                </ion-label>

            </ion-item>

            <ion-item>
                 <router-link
                  :to="{ name: 'Updatebook', 
                  params: { 
                    id: livre.id,
                    titre:livre.titre,
                    isbn:livre.isbn,
                    annee:livre.annee_edition,
                    resume:livre.resume,
                    nbr_exemplaire:livre.nbr_exemplaire,
                    image:livre.image
                     } }">
                   <ion-fab-button size="small" color="primary">
                     <ion-icon name="create"></ion-icon>
                     </ion-fab-button>
                     </router-link>
                <ion-fab-button @click="deletelivre(livre.id,index)" size="small" color="danger"><ion-icon name="trash"></ion-icon></ion-fab-button>
               <ion-label v-if="livre.nbr_exemplaire>0"><ion-badge color="success" slot="end">Disponible</ion-badge></ion-label> 
               <ion-label v-if="livre.nbr_exemplaire==0"><ion-badge color="danger" slot="end">Non Disponible</ion-badge></ion-label>
            </ion-item>
            
            </ion-card-content>
        </ion-card>
</ion-item>
               

    </ion-content>


  </ion-page>
</template>

<script lang="ts">
import { IonSearchbar, IonFabButton,toastController, IonBadge, IonLabel, IonIcon, IonItem, IonContent,IonList, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardSubtitle,IonMenu } from '@ionic/vue';
import { defineComponent } from 'vue';
import { addIcons } from "ionicons";
import { create,trash, addCircle, book, person, logOut } from "ionicons/icons";
import axios from 'axios';
addIcons({
  "create": create,
  "trash" : trash,
  "add-circle" : addCircle,
  "book" : book,
  "person" : person,
  "log-out" : logOut
})

export default defineComponent({
  data() {
    return {
      name:localStorage.getItem('name'),
      keyword: null,
       livres: [],
    }
  },
  async mounted () {
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}` 
     axios
        .get('http://127.0.0.1:8000/api/livres/')
        .then(response => (this.livres = response.data))
        .catch(error => this.$router.push({name: 'Home'}))
  },
  watch: {
        keyword() {
            this.getResults();
        }
    },
  methods: {
    
    deletelivre(id: BigInteger,index: number) {
    axios.delete('http://127.0.0.1:8000/api/livres/' + id)
         .then(async (response) => {
    if(response.status==200){
      this.livres.splice(index,1);
       const toast = await toastController
                  .create({
                    message: 'Le livre est supprimé',
                    color: 'danger',
                    duration: 2000
                  })
                return toast.present();
    }
}, (error) => {
    console.log(error);
})
},
logout(){
  axios.post('http://127.0.0.1:8000/api/logout')
  .then(async (response) =>{
            localStorage.removeItem('token')
            this.$router.push({name: 'Home'})
      })
            
},
getResults() {
  if(this.keyword){
    axios.get('http://127.0.0.1:8000/api/livres/search/'+this.keyword)
                .then(res => this.livres = res.data);
  }
   else{
      axios
        .get('http://127.0.0.1:8000/api/livres/')
        .then(response => (this.livres = response.data));
   }         
        }
  },
  name: 'Tp01',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,  IonSearchbar, IonItem, IonCardSubtitle, IonCard,
     IonCardContent, IonIcon, IonBadge, IonFabButton,IonMenu,IonList
  },
 
  
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
.clickable {
pointer-events: auto !important;
}
</style>