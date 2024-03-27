<script>
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';
  import { createForm } from 'felte';
  import { applyAction } from '$app/forms';
  import { getFelteSuccessResponse } from '$lib/felte.js';

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
  });

  async function handleSuccess(event) {
    var response = await getFelteSuccessResponse(event);

    data.message = response?.data?.message;

    return applyAction(response);
  }

  const { form, errors, touched } = createForm({
    validate: validateSchema(schema)
  });

  export let data;
</script>

<form
  use:form
  method="post"
  on:feltesuccess={handleSuccess}
>
  {#if data?.message}
    <p>{data?.message}</p>
  {/if}

  <div>
    <label for="username">Username</label>
    <input type="text" name="username">
  </div>

  {#if $touched.username && $errors.username}
		<span class="error">{$errors.username[0]}</span>
	{/if}
  
  <div>
    <label for="password">Password</label>
    <input type="password" name="password">
  </div>

  {#if $touched.password && $errors.password}
		<span class="error">{$errors.password[0]}</span>
	{/if}

  <button type="submit">Sign In</button>
</form>

<style>
  label,
  span.error {
    display: block;
  }

  button {
    margin-top: 10px;
  }
</style>