import { redirect } from '@sveltejs/kit';

/* Ideas
    A gondola that shifts through a chasm while somber music plays, descriptive text
*/

export function load() {
	throw redirect(307, "/mainmenu");
}
