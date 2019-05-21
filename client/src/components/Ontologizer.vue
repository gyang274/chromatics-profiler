<template>
  <v-container fluid>
    <v-treeview
      v-model="tree"
      :open="open"
      :items="items"
      activatable
      item-key="name"
      open-on-click
    >
      <template v-slot:prepend="{ item, open }">
        <v-icon :color="item.hex">
          {{ open ? 'folder_open' : 'folder' }}
        </v-icon>
      </template>
      <template v-slot:label="{ item }">
        {{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }}
      </template>
    </v-treeview>
  </v-container>
</template>

<script>
  import ontology from './static/ontology.json'

  export default {
    data: () => ({
      open: ['color'],
      files: {
        html: 'language-html5',
        js: 'nodejs',
        json: 'json',
        md: 'markdown',
        pdf: 'file-pdf',
        png: 'file-image',
        txt: 'file-document-outline',
        xls: 'file-excel'
      },
      tree: [],
      items: ontology
    }),
    computed: {

    }
  }
</script>

<style>

</style>
