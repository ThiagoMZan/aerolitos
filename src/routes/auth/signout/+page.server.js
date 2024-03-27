import { redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/lucia';

export const load = async(event) => {
  const { session } = event.locals;

  if (session) {
    await lucia.invalidateUserSessions(session.userId);
  }

  redirect(302, "/auth/signin");
}