<script lang="ts">
import { page } from '$app/stores'
import { trpc } from '$lib/trpc/client'
import type { User } from '$lib/types/users'

let users: User[] = []
let loading = false

let newUser = {
  name: '',
  email: '',
}

</script>

<svelte:head>
  <title>Users</title>
  <meta name="description" content="Users" />
</svelte:head>

<div class="text-column">
  <h1>Users</h1>

  <div>
    <h2>New User</h2>
    <form on:submit|preventDefault={async () => {
      await trpc($page).createUser.mutate(newUser)
      newUser = {
        name: '',
        email: '',
      }
    }}>
      <label for="name">Name</label>
      <input type="text" id="name" bind:value={newUser.name} />
      <label for="email">Email</label>
      <input type="email" id="email" bind:value={newUser.email} />
      <button type="submit">Create</button>
    </form>
  </div>

  <div>
    <h2>Users</h2>
    <a
      href="#load"
      role="button"
      class="secondary"
      aria-busy={loading}
      on:click|preventDefault={async () => {
        loading = true
        users = await trpc($page).listUsers.query()
        loading = false
      }}>Load</a
    >
    <ul>
      {#each users as user}
        <li>{user.name} - {user.email}</li>
      {/each}
    </ul>
  </div>
</div>
