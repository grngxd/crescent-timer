// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ params }: Parameters<PageServerLoad>[0]) => {
	console.log(params.profile);
    // TODO: Load profile data
};