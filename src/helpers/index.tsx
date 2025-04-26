export function FilterList(list: ItemProps[], currentDate: string) {
	return list.filter((item) => {
		const [itemYear, itemMonth] = item.date.split("-");
		const [currentYear, currentMonth] = currentDate.split("-");

		return itemYear === currentYear && itemMonth === currentMonth;
	});
}

export function uppercaseFirstLetter(word: string) {
	return word[0].toUpperCase() + word.slice(1);
}
