# Freedom Processing Form

This project is a web-based form designed to streamline the process of collecting and processing user data. It supports both English and Arabic languages, and includes a dark mode feature for better user experience. The form is designed to be responsive and works well on both desktop and mobile devices.

## Features

- **Multi-language Support**: The form supports both English and Arabic. Users can toggle between the two languages using the language toggle button.
- **Dark Mode**: Users can switch between light and dark modes using the theme toggle button.
- **Automatic Data Mapping**: Users can paste data into the text area, and the form will automatically map the data to the appropriate fields.
- **Print and Clear Options**: Users can print the form or clear all fields with the click of a button.
- **Required Files Checkbox**: Users can select the required files from a list of checkboxes.
- **Modal for Instructions**: A modal window provides instructions on how to use the form and information about the developer.

## Technical Details

### File Structure

- **index.html**: The main HTML file that structures the form and includes links to the CSS and JavaScript files.
- **style.css**: The CSS file that styles the form, including the dark mode and responsive design.
- **script.js**: The JavaScript file that handles the form's functionality, including data mapping, language toggling, and dark mode toggling.
- **logo.png**: The logo image for the light mode.
- **logo2.png**: The logo image for the dark mode.
- **service-worker.js**: A service worker script that caches the necessary files for offline use.

### How It Works

1. **Language Toggle**: The language toggle button switches between English and Arabic. It updates the text content of the form and adjusts the text direction (LTR for English and RTL for Arabic).
2. **Dark Mode Toggle**: The theme toggle button switches between light and dark modes. It changes the background color, text color, and logo image.
3. **Data Mapping**: When data is pasted into the text area, the JavaScript code processes the data and maps it to the appropriate form fields. It also checks for required files and updates the checkboxes accordingly.
4. **Print and Clear**: The print button allows users to print the form, while the clear button resets all fields and checkboxes.
5. **Modal Window**: The modal window provides instructions on how to use the form and information about the developer. It can be opened manually or automatically after 5 seconds of the page loading.

### Service Worker

The service worker caches the necessary files (HTML, CSS, JavaScript, and images) to allow the form to work offline. It also handles updates by reloading the page when a new version of the service worker is detected.

### Usage

1. **Paste Data**: Paste your data into the text area at the top of the form. The form will automatically map the data to the appropriate fields.
2. **Fill in Fields**: If any fields are not automatically filled, you can manually enter the data.
3. **Select Required Files**: Check the boxes for the required files.
4. **Print or Clear**: Use the print button to print the form or the clear button to reset all fields.
5. **Toggle Language and Theme**: Use the language and theme toggle buttons to switch between English/Arabic and light/dark modes.

### Installation

To use this project locally, follow these steps:

1. Clone the repository or download the files.
2. Open the `index.html` file in your web browser.
3. The form should be fully functional, with all features working as described.

### Dependencies

- **Font Awesome**: Used for icons in the form.
- **Google Fonts**: The Cairo font is used for better readability in both English and Arabic.

### Customization

- **Logo**: Replace `logo.png` and `logo2.png` with your own logo images.
- **Colors**: Modify the colors in `style.css` to match your branding.
- **Form Fields**: Adjust the form fields in `index.html` and update the data mapping logic in `script.js` if necessary.

### Known Issues

- **Data Mapping**: The data mapping logic assumes a specific format for the pasted data. If the format changes, the mapping may not work correctly.
- **Service Worker**: The service worker may not work correctly in all browsers, especially if the browser does not support service workers.

### Future Improvements

- **Validation**: Add form validation to ensure that all required fields are filled before printing.
- **More Languages**: Add support for additional languages.
- **Enhanced Data Mapping**: Improve the data mapping logic to handle more complex data formats.

## Credits

- **Developer**: Mohammed Aloshari
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Cairo)

## License

This project is open-source and available under the MIT License. Feel free to use, modify, and distribute it as needed.

---

For any questions or issues, please contact the developer at [email@example.com](mailto:email@example.com).
