<script setup lang="ts">

const eventName = ref('')
const eventDescription = ref('')

const handleAddEvent = async () => {
  await useFetch('/api/events', {
    method: 'POST',
    body: {
      title: eventName.value,
      published: true,
      status: 'UPCOMING',
      organiser: '',
      date: new Date(),
      description: eventDescription.value,
      extraDetail: '',
      location: '',
      linkToTickets: ''
    }
  })
  eventName.value = ''
  eventDescription.value = ''
  refresh()
}


const { data: events, refresh, pending } = await useFetch('/api/events', {
  key: `all events`
})


</script>

<template>
  <div>
    <h1>Homepage</h1>
    <div class="my-5 bg-slate-300 p-5 rounded">
      <form @submit.prevent>
        <div class="my-2">
          <label class="w-[100px] inline-block" for="eventName">Name</label>
          <input class="border px-3 py-1" id="eventName" type="text" v-model="eventName" />
        </div>
        <div class="my-2">
          <label class="w-[100px] inline-block" for="eventName">Description</label>
          <input class="border px-3 py-1" id="eventDescription" type="text" v-model="eventDescription" />
        </div>
        <div class="mt-5">
          <button type="submit" class="bg-green-600 text-white px-3 py-1 rounded" @click="handleAddEvent()">Add Event</button>
        </div>
      </form>
    </div>

    <div>
      <p>Events:</p>
      <div class="relative">
        <div v-if="pending" class="absolute top-0 left-0 w-full h-full bg-slate-800/10">
          Loading...
        </div>
        <div v-for="event in events">
          <div class="my-3 border-b py-3">
            <div class="text-xl">{{ event.title }}</div>
            <div>{{ event.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
