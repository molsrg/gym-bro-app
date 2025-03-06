<script lang="ts" setup>
import { prerelease, version } from '~~/package.json'

const items = computed(() => {
  return [
    [
      {
        label: useTgWebAppStore().initDataUnsafe?.first_name || 'User',
        avatar: { src: useTgWebAppStore().initDataUnsafe?.photo_url || 'https://avatars.githubusercontent.com/u/739984?v=4' },
        to: '/',
      },
    ],
    [
      { badge: `${version}${prerelease ? '-alpha' : ''}` },
      {
        icon: 'material-symbols-light:social-leaderboard-outline',
        to: '/leaderboard',
      },
      {
        icon: 'i-solar-chart-outline',
        to: '/statistic',
      },
      {
        icon: 'i-solar-settings-broken',
        to: '/settings',
      },
    ],
  ]
})
</script>

<template>
  <UNavigationMenu
    :items="items"
    :ui="{
      link: 'text-md',
      linkLeadingAvatarSize: 'xs',
      linkLeadingIcon: 'size-6',
    }"
    class="data-[orientation=horizontal]:border-b border-[var(--ui-border)] data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48 mx-auto max-w-[99%]"
    highlight
    highlight-color="primary"
    orientation="horizontal"
  />
  <slot />
</template>
