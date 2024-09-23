// pages/api/subscribe.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Validate email format
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
    
    // Mailchimp API URL
    const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

    const data = {
      email_address: email,
      status: 'subscribed',
    };

    try {
      // Make a request to Mailchimp
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        },
      });

      // Check for errors in the response
      if (response.status >= 400) {
        return res.status(400).json({ error: 'Error subscribing to the newsletter.' });
      }

      // Successful subscription
      return res.status(201).json({ message: 'Successfully subscribed!' });
    } catch (error) {
      console.error('Error during Mailchimp subscription:', error.response ? error.response.data : error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
