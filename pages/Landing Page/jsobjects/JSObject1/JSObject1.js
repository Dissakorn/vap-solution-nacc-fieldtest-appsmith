export default {
  myVar1: [],
  myVar2: {},

  // Function to generate UUID, random number, and store both
  async generateAndStoreUUIDAndSet() {
    // Generate a UUID
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    // Generate a random number between 1 and 3
    const randomNumber = Math.floor(Math.random() * 3) + 1;

    // Store the generated UUID as 'user'
    await storeValue('user', uuid);

    // Store the random number as 'set'
    await storeValue('set', randomNumber);
  }
}
