# CT React Site

A React application with CleanTalk Bot Detector integration for spam protection. Built with Vite and React Router.

## Features

- ⚛️ React 18 with Vite
- 🛣️ React Router for navigation
- 🛡️ CleanTalk Bot Detector integration
- 📝 Contact form with validation
- 🎨 Modern, responsive UI

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-antispam
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Add CleanTalk Bot Detector

The CleanTalk Bot Detector helps protect your forms from spam by automatically detecting and blocking bot submissions.

### Step 1: Add the Bot Detector Script to HTML Header

Add the CleanTalk Bot Detector script to the `<head>` section of your `index.html` file:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Site Title</title>
    <!-- Add CleanTalk Bot Detector script -->
    <script src="https://fd.cleantalk.org/ct-bot-detector-wrapper.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### Step 2: Update Your Form Component

To collect the `ct_bot_detector_event_token` from the form, you need to:

#### 2.1. Import required React hooks

```javascript
import { useState, useRef } from 'react'
```

#### 2.2. Add a form ref to access the form element

```javascript
const formRef = useRef(null)
```

#### 2.3. Create a function to get the bot detector token

```javascript
function getBotDetectorToken() {
  if (!formRef.current) return ''
  const tokenField = formRef.current.querySelector('input[name="ct_bot_detector_event_token"]')
  return tokenField ? tokenField.value : ''
}
```

#### 2.4. Update your form submission handler

In your `handleSubmit` function, get the token before submitting:

```javascript
async function handleSubmit(e) {
  e.preventDefault()
  
  // Get the bot detector token from the hidden field
  const botToken = getBotDetectorToken()
  const formData = { ...values, ct_bot_detector_event_token: botToken }
  
  // Continue with form submission...
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
}
```

#### 2.5. Attach the ref to your form element

```javascript
return (
  <form ref={formRef} onSubmit={handleSubmit}>
    {/* Your form fields */}
  </form>
)
```

### Step 3: Add Token Validation (Optional)

Add validation to ensure the token is present before form submission:

```javascript
function validate(values) {
  const errors = {}
  // ... other validations
  if (!values.ct_bot_detector_event_token) {
    errors.ct_bot_detector_event_token = 'Bot detector event token is required'
  }
  return errors
}
```

### How It Works

1. The CleanTalk script (`ct-bot-detector-wrapper.js`) automatically injects a hidden input field with `name="ct_bot_detector_event_token"` into all forms on the page.

2. When the form is submitted, the `getBotDetectorToken()` function retrieves the token value from the hidden field.

3. The token is included in the form data sent to your server.

4. Your backend can verify the token with CleanTalk's API to validate the submission and block spam.

### Complete Example

See `src/components/ContactForm.jsx` for a complete implementation example.

## Usage

### Development

Start the development server:

```bash
npm run dev
```

### Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
react-antispam/
├── index.html              # HTML entry point with bot detector script
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main app component with routing
│   ├── styles.css          # Global styles
│   ├── components/
│   │   ├── ContactForm.jsx # Form component with bot detector integration
│   │   └── NavBar.jsx      # Navigation component
│   └── pages/
│       ├── Home.jsx
│       ├── About.jsx
│       ├── Contact.jsx     # Contact page using ContactForm
│       └── NotFound.jsx
└── README.md
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Dependencies

- **react** ^18.3.1
- **react-dom** ^18.3.1
- **react-router-dom** ^6.26.2
- **vite** ^5.4.8 (dev)

## Backend Integration

When submitting forms, make sure your backend receives and validates the `ct_bot_detector_event_token`. You can verify the token using CleanTalk's API to ensure the submission is legitimate.

For more information about CleanTalk Bot Detector, visit: [CleanTalk Documentation](https://cleantalk.org)

## License

Private project

