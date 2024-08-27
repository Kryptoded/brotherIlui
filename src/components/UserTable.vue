<template>
  <q-card ref="card">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <q-markup-table>
        <thead>
          <q-th>Номер телефона</q-th>
          <q-th>DG_ID</q-th>
        </thead>
        <tbody>
          <tr
            v-for="user in props.data"
            :key="user.id"
            style="cursor: pointer"
            @click="onUserClick(user)"
            :class="{'active': props.activeUser?.dg_id === user.dg_id}"
          >
            <q-td class="text-center">
              {{ user.phone }}
            </q-td>
            <q-td class="text-center">
              {{ user.dg_id }}
            </q-td>
          </tr>
        </tbody>
      </q-markup-table>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false
  },
  activeUser: {
    type: Object,
    default: null
  }
});

const emits = defineEmits(["onUserClick", "load"]);

function onUserClick(user) {
  emits("onUserClick", user);
}

function onLoad(index, done) {
  emits('load', done)
}

</script>

<style scoped>

.active {
  background-color: var(--q-primary) !important;
  color: white !important;
}
</style>
