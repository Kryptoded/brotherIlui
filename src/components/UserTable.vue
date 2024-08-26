<template>
  <q-card>
    <q-inner-loading :showing="props.loading" v-if="props.loading" />
    <q-markup-table v-else>
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
  </q-card>
</template>

<script setup>
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

const emits = defineEmits(["onUserClick"]);

function onUserClick(user) {
  emits("onUserClick", user);
}
</script>

<style scoped>

.active {
  background-color: var(--q-primary) !important;
  color: white !important;
}
</style>
