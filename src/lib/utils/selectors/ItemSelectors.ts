import { ItemData } from "$lib/data/items/ItemData";
import type { ItemMetadata } from "../../../models/meta/ItemMetadata";

const getDefaultMetadata = () => ItemData[0];

export const getItemMetadata = (name: string): ItemMetadata => {
	const metadata = ItemData[name];
	if (!metadata) {
		console.error(`getItemMetadata: no item ${name}`);
		return getDefaultMetadata();
	}
	return metadata;
};