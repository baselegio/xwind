<template>
  <div class="card">
    <Menubar :model="items" class="menubar">
      <template #start>
        <Image
          src="https://avatars.githubusercontent.com/u/166945492?s=200&v=4"
          width="50"
          class="logo"
        />
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a
          v-ripple
          class="flex align-items-center menu-item"
          v-bind="props.action"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <span
            v-if="item.shortcut"
            class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
            >{{ item.shortcut }}</span
          >
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down',
              { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root },
            ]"
          ></i>
        </a>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
  },
  {
    label: 'About',
    icon: 'pi pi-star',
  },
])
</script>

<style scoped>
/* Add custom styles here if needed */
.logo {
  margin-right: 10rem; /* Initial margin between logo and buttons */
}

/* Add space between logo and buttons for larger screens */
@media (min-width: 768px) {
  .menubar {
    display: flex;
    justify-content: space-between;
  }

  .logo {
    margin-right: 4rem; /* Adjust margin for larger screens */
  }
}
</style>
