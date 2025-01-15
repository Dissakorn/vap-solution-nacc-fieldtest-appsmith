export default {
  // Sleep function to pause execution
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  async classifyAndSelectCategory() {
    // Delay for 2 seconds before starting
    await this.sleep(2000);  // Sleep for 2000 ms (2 seconds)

    // Get the text from the input widget
    const textData = Input1.text;  // Replace Inp_Textbox with your text box widget name

    // Define your API endpoint
    const apiEndpoint = 'https://6gzwkq3j6kzapmic7bjokysf7m0hftpj.lambda-url.ap-southeast-1.on.aws/';  // Add your API endpoint here

    // Prepare the data to send
    const data = {
      message: textData
    };

    try {
      // Make the API call
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('Success:', result);

      // Slc_Category.setSelectedOption(result.toString);
      // Return the result object
      return result;

    } catch (error) {
      console.error('Error:', error);
      showAlert('Error occurred while processing the request.');
      return null;
    }
  }
};
