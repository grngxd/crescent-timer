import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	console.log(params.profile);
    // TODO: Load profile data
};