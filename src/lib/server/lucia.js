import { Lucia, TimeSpan } from "lucia";
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import pg from "pg";
import { dev } from "$app/environment";
import { PG_HOST, PG_USER, PG_PASS, PG_PORT, PG_DATABASE } from "$env/static/private";

// const pool = new pg.Pool();
const pool = new pg.Pool({
	user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASS,
  port: PG_PORT
});

const adapter = new NodePostgresAdapter(pool, {
	user: "users",
	session: "sessions"
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	sessionExpiresIn: new TimeSpan(1, "h"),
	getUserAttributes: (attrs) => {
		return {
			username: attrs?.username,
			name: attrs?.name
		};
	}
});