<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 600px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <div class="q-pa-sm q-pl-md row items-center">
          <q-btn-toggle
            v-model="model"
            push
            glossy
            toggle-color="teal"
            :options="[
          {value: 'move', slot: 'move'},
          {value: 'circle', slot: 'circle'},
          {value: 'rectangle', slot: 'rectangle'},
          {value:'line',slot:'line'}
        ]"
          >

          <template v-slot:move>
              <q-icon name="fas fa-arrows-alt"></q-icon>
              <q-tooltip>Move Tool</q-tooltip>
            </template>
            <template v-slot:circle>
              <q-icon name="far fa-circle"></q-icon>
              <q-tooltip>Circle</q-tooltip>
            </template>

            <template v-slot:rectangle>
              <q-icon name="far fa-square"></q-icon>
              <q-tooltip>Rectangle</q-tooltip>
            </template>
            <template v-slot:line>
              <q-icon name="fas fa-grip-lines"></q-icon>
              <q-tooltip>Line</q-tooltip>
            </template>
          </q-btn-toggle>
        </div>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-md">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>

export default {
  name: "MainLayout",
  data: function() {
    return {
      model: 'one'
    };
  }
};
</script>
