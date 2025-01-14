export default {
  myVar1: [],
  myVar2: {},

  // Your existing function
  myFun1() {
    // Write code here
    // Example: this.myVar1 = [1,2,3];
    this.myVar1 = [1, 2, 3];
  },

  // Async function that runs Get_Index SQL and stores the rowIndex
  async myFun2() {
    // Run the SQL query first
    await Get_Index.run();

    // Store the rowIndex after converting it to string
    await storeValue('rowIndex', Get_Index.data[0].rowIndex);
  }
};
