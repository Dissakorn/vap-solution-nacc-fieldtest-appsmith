export default {
  async classifyText() {
    // Get the text from the input widget
    const textData = Inp_Accusation.text;  // Replace Inp_Textbox with your input widget name

    // Define your API endpoint
    const apiEndpoint = 'https://lr26qwqqso5cdoz2qrwe4575ke0ktiqp.lambda-url.ap-southeast-1.on.aws/';  // Add your API endpoint here

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

      // Format the response
      let formattedResult = '';

      if (result.result.Summary) {
        formattedResult += `สรุปข้อกล่าวหา: ${result.result.Summary}\n`;
      }
      if (result.result.AllegedParty) {
        formattedResult += `ผู้ถูกกล่าวหา: ${result.result.AllegedParty}\n`;
      }
      if (result.result.Accusation) {
        formattedResult += `เรื่องที่กล่าวหา: ${result.result.Accusation}\n`;
      }
      if (result.result.Location) {
        formattedResult += `สถานที่: ${result.result.Location}\n`;
      }
      if (result.result.Amount) {
        formattedResult += `มูลค่าความเสียหาย: ${result.result.Amount}`;
      }

      // Update the result text box widget
      await storeValue('formattedResult', formattedResult.trim());

      // Assign the formatted result to your result text box widget
      Inp_Summarizer.setValue(appsmith.store.formattedResult); // Replace Inp_ResultTextBox with your result widget name
    } catch (error) {
      console.error('Error:', error);
      showAlert('Error occurred while processing the request.');
    }
  }
};
