export default {
  startTime: null,
  elapsedTime: 0,
  timerInterval: null,

  // Function to start the stopwatch
  startStopwatch() {
    // Save the start time
    this.startTime = Date.now();
    
    // Reset elapsed time to 0
    this.elapsedTime = 0;

    // Set an interval to keep track of the time
    this.timerInterval = setInterval(() => {
      const currentTime = Date.now();
      this.elapsedTime = (currentTime - this.startTime) / 1000; // Convert milliseconds to seconds
    }, 1000); // Update every second
  },

  // Function to stop the stopwatch and store the elapsed time
  stopStopwatch() {
    // Clear the interval to stop the stopwatch
    clearInterval(this.timerInterval);
    
    // Store the elapsed time in Appsmith store (in seconds)
    storeValue('elapsedTimeInSeconds', this.elapsedTime);
    
    // Return the stored value
    return appsmith.store.elapsedTimeInSeconds;
  },
	myFun1 () {
		// Setting all input fields to empty string
		Inp_Summarizer.setValue('');
		Slc_Category.setSelectedOption('');
	}
};
