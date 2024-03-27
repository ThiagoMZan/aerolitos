import { lucia } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import { validateCredentials } from "$lib/server/auth";

export const load = async (event) => {
	// const form = await superValidate(joi(authSchema));

	// return { form };

	return {};
};

export const actions = {
	default: async ({ cookies, request }) => {
		const { username, password } = Object.fromEntries(await request.formData());

		// procura o usuário pelas credenciais
		const user = await validateCredentials({ username, password });

		if (user.error) {
			return fail(400, {
				message: user.error
			});
		}

		// cria a sessão e o cookie
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/");
	}
};