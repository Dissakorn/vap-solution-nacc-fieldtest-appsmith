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

      // Initialize the formatted result string and missing fields array
      let formattedResult = '';
      const missingFields = [];

      // Handle each field with a check
      if (result.result.Summary) {
        formattedResult += `สรุปข้อกล่าวหา: ${result.result.Summary}\n`;
      } else {
        formattedResult += `สรุปข้อกล่าวหา: ไม่พบข้อมูล กรุณาตรวจสอบอีกครั้ง\n`;
        missingFields.push('สรุปข้อกล่าวหา');
      }

      if (result.result.AllegedParty) {
        formattedResult += `ผู้ถูกกล่าวหา: ${result.result.AllegedParty}\n`;
      } else {
        formattedResult += `ผู้ถูกกล่าวหา: ไม่พบข้อมูล กรุณาตรวจสอบอีกครั้ง\n`;
        missingFields.push('ผู้ถูกกล่าวหา');
      }

      if (result.result.Accusation) {
        formattedResult += `เรื่องที่กล่าวหา: ${result.result.Accusation}\n`;
      } else {
        formattedResult += `เรื่องที่กล่าวหา: ไม่พบข้อมูล กรุณาตรวจสอบอีกครั้ง\n`;
        missingFields.push('เรื่องที่กล่าวหา');
      }

      if (result.result.Location) {
        formattedResult += `สถานที่: ${result.result.Location}\n`;
      } else {
        formattedResult += `สถานที่: ไม่พบข้อมูล กรุณาตรวจสอบอีกครั้ง\n`;
        missingFields.push('สถานที่');
      }

      if (result.result.Amount) {
        formattedResult += `มูลค่าของโครงการ: ${result.result.Amount}`;
      } else {
        formattedResult += `มูลค่าของโครงการ: ไม่พบข้อมูล กรุณาตรวจสอบอีกครั้ง`;
        missingFields.push('มูลค่าของโครงการ');
      }

      // Update the result text box widget
      await storeValue('formattedResult', formattedResult.trim());

      // Assign the formatted result to your result text box widget
      Inp_Summarizer.setValue(appsmith.store.formattedResult); // Replace Inp_ResultTextBox with your result widget name

      // Show warning if there are missing fields
      if (missingFields.length > 0) {
        showAlert(`พบข้อมูลบางส่วนหายไป: ${missingFields.join(', ')}`, 'warning');
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert('Error occurred while processing the request.', 'error');
    }
  }
};
