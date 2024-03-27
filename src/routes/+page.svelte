<script>
	export let data;
</script>

{#if data.user}
<h2>Olá, {data.user.name}</h2>
<p><a href="/auth/signout">Logout</a></p>
<!-- <form action="/?/logout" method="POST">
  <button type="submit">logout</button>
</form> -->
{/if}

<h1>Welcome to SvelteKit</h1>

<p><a href="/auth/signin">Login</a></p>