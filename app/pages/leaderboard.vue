<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui'
import { h, resolveComponent } from 'vue'
import ProfileModal from '~/components/modal/ProfileModal.vue'
import { useLeaderBoardHelper } from '~/composables/leaderboard'
import { achievementsList } from '~/constants/activity/achievements'
import { truncateString } from '~/helpers/stringFormat.helper'

const { t } = useI18n()
const UBadge = resolveComponent('UBadge')
const UAvatar = resolveComponent('UAvatar')

interface Payment {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}
const mockData = [
  {
    id: '1',
    photo_url: 'https://i.pravatar.cc/120?img=1',
    username: 'alexander1_botsadasdasdasdsad',
    name: 'Александр Иванов',
    count: 14,
    lastActivity: 1,
    achievement: [4],
  },
  {
    id: '2',
    photo_url: 'https://i.pravatar.cc/120?img=2',
    username: 'ekaterina2_bot',
    name: 'Екатерина Петрова',
    count: 12,
    lastActivity: 0,
    achievement: [1, 3],
  },
  {
    id: '3',
    photo_url: 'https://i.pravatar.cc/120?img=3',
    username: 'dmitry3_bot',
    name: 'Дмитрий Сидоров',
    count: 9,
    lastActivity: '2',
    achievement: [0, 1, 2],
  },
  {
    id: '4',
    photo_url: 'https://i.pravatar.cc/120?img=4',
    username: 'anna4_bot',
    name: 'Анна Смирнова',
    count: 7,
    lastActivity: '3',
    achievement: [0, 2, 3, 6],
  },
  {
    id: '5',
    photo_url: 'https://i.pravatar.cc/120?img=5',
    username: 'ivan5_bot',
    name: 'Иван Кузнецов',
    count: 4,
    lastActivity: 6,
    achievement: [1, 2, 3, 4, 5],
  },
]

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'id',
    header: '#',
  },
  {
    accessorKey: 'name',
    header: t('leaderboard.table.key.name'),
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center  gap-3' }, [
        h(UAvatar, {
          src: row.original.photo_url,
          size: 'lg',
        }),
        h('div', undefined, [
          h('p', { class: 'font-medium text-(--ui-text-highlighted)' }, `@${row.original.username}`),
        ]),
      ])
    },
  },
  {
    accessorKey: 'last_activity',
    header: t('leaderboard.table.key.lastActivity'),
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center justify-center gap-3' }, [
        h(UBadge, {
          color: useLeaderBoardHelper().lastActivityColor(row.original.lastActivity),
          variant: 'outline',
          size: 'sm',
          label: useLeaderBoardHelper().formatLastActivity(row.original.lastActivity),
        }),
      ])
    },
  },
  {
    accessorKey: 'count',
    header: t('leaderboard.table.key.score'),
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center justify-center gap-3' }, [
        h(UBadge, {
          color: 'neutral',
          variant: 'outline',
          label: row.original.count,
          trailingIcon: 'ic:round-star-border',
          size: 'sm',
          ui: {
            trailingIcon: '',
          },
        }),
      ])
    },
  },

]
const table = useTemplateRef('table')

const rowSelection = ref<Record<string, boolean>>({})
const overlay = useOverlay()

function onSelect(row: TableRow<Payment>, e?: Event) {
  // row.toggleSelected(!row.getIsSelected())
  console.warn(e)
  const modal = overlay.create(ProfileModal, {
    props: {
      userInfo: row.original,
    },
  })
  modal.open()
}
</script>

<template>
  <div class=" flex w-full flex-1 gap-1">
    <div class="flex-1">
      <UTable
        ref="table"
        v-model:row-selection="rowSelection"
        :data="mockData"
        :columns="columns"
        :ui="{
          th: 'px-1 text-nowrap text-xs text-center',
          td: 'px-3.5',
        }"
        @select="onSelect"
      >
        <template #name-cell="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar :src="`https://i.pravatar.cc/120?img=${row.original.id}`" size="lg" />
            <div>
              <p class="font-medium text-(--ui-text-highlighted) text-sm">
                {{ truncateString(row.original.username, 10) }}
              </p>
              <div class="flex -space-x-2">
                <template v-for="achievement in row.original.achievement" :key="achievement">
                  <UIcon
                    v-if="achievementsList.find(a => a.id === achievement)?.icon"
                    :name="achievementsList.find(a => a.id === achievement)?.icon"
                    class="size-4 hover:z-10 transition-transform hover:scale-110"
                  />
                </template>
              </div>
            </div>
          </div>
        </template>
      </UTable>
    </div>
  </div>
</template>
