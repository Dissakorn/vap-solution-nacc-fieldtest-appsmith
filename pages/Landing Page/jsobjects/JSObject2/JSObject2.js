export default {
	myVar1: [],
	myVar2: {},
	async storeIndex () {
    await Updated_By.run();
		await Get_Index.run();
    // Return the rowIndex from the Get_Index query
		storeValue('index', Get_Index.data[0].rowIndex)
    return appsmith.store.index;
}
}