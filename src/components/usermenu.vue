<template>
  <ion-menu side="start" menu-id="usermenu" content-id="usermenucontent">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item button @click="$router.push('/books')"><ion-icon slot="start" name="book"></ion-icon>Liste des Livres</ion-item>
        <ion-item><ion-icon slot="start" name="person"></ion-icon>Profile</ion-item>
        <ion-item><ion-icon slot="start" name="log-out"></ion-icon>Déconnexion</ion-item>
      </ion-list>
    </ion-content>
    </ion-menu>  
</template>

<script>
export default {
  name: "usermenu"
};
</script>