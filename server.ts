import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON request body parser
  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Send Email Endpoint
  app.post('/api/send-email', async (req, res) => {
    try {
      const { fname, lname, email, phone, apptType, apptMode, message } = req.body;

      // Basic validation
      if (!fname || !lname || !email || !phone || !apptType || !apptMode) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const recipientEmail = 'info@pinnaclehealthwellness.ca';
      const submittedAt = new Date().toLocaleString('en-US', {
        timeZone: 'America/Toronto',
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      // Construct a clean, highly professional email format
      const emailSubject = `New Appointment Request: ${fname} ${lname} - ${apptType}`;
      
      const emailText = `
        Pinnacle Health & Wellness Clinic
        ------------------------------------------
        New Appointment Request Received
        
        Patient Details:
        - Name: ${fname} ${lname}
        - Email: ${email}
        - Phone: ${phone}
        
        Consultation Request:
        - Type: ${apptType}
        - Format: ${apptMode}
        - Requested At: ${submittedAt} EST
        
        Message / Concern:
        "${message || 'No specific description provided.'}"
        ------------------------------------------
        This request was logged on Pinnacle Health & Wellness Clinic booking portal.
      `;

      const emailHtml = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #ede7dc; background-color: #fdfaf6; color: #2a2a2a;">
          <div style="border-bottom: 2px solid #2c4a30; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="font-family: Georgia, serif; color: #2c4a30; margin: 0; font-size: 24px; font-weight: normal;">Pinnacle Health & Wellness</h1>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #7a9e7e; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Booking & Consultation Registry</p>
          </div>
          
          <h2 style="font-size: 16px; font-weight: 600; color: #2c4a30; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em;">New Appointment Request</h2>
          
          <div style="background-color: #ffffff; border: 1px solid #ede7dc; border-radius: 4px; padding: 20px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #5a5a5a; width: 140px; font-weight: bold;">Patient Name:</td>
                <td style="padding: 6px 0; font-size: 14px; color: #2a2a2a;">${fname} ${lname}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #5a5a5a; font-weight: bold;">Email Address:</td>
                <td style="padding: 6px 0; font-size: 14px; color: #2a2a2a;"><a href="mailto:${email}" style="color: #4e7153; text-decoration: underline;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #5a5a5a; font-weight: bold;">Phone Number:</td>
                <td style="padding: 6px 0; font-size: 14px; color: #2a2a2a;"><a href="tel:${phone}" style="color: #4e7153; text-decoration: underline;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #5a5a5a; font-weight: bold;">Service Type:</td>
                <td style="padding: 6px 0; font-size: 14px; color: #2a2a2a; font-weight: 500;">${apptType}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #5a5a5a; font-weight: bold;">Preferred Format:</td>
                <td style="padding: 6px 0; font-size: 14px; color: #2a2a2a;">${apptMode}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #5a5a5a; font-weight: bold;">Submitted At:</td>
                <td style="padding: 6px 0; font-size: 13px; color: #5a5a5a;">${submittedAt} EST</td>
              </tr>
            </table>
          </div>

          <h3 style="font-size: 13px; font-weight: 600; color: #2c4a30; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Message / Health Concern</h3>
          <div style="background-color: #f7f3ed; border-left: 3px solid #7a9e7e; padding: 14px; font-size: 13px; line-height: 1.6; color: #2a2a2a; font-style: italic; margin-bottom: 24px; border-radius: 0 4px 4px 0;">
            "${message ? message.replace(/\n/g, '<br />') : 'No specific description provided.'}"
          </div>

          <div style="border-top: 1px solid #ede7dc; padding-top: 16px; font-size: 11px; color: #5a5a5a; text-align: center; line-height: 1.5;">
            <p style="margin: 0;">This is an automated notification from your clinical booking page.</p>
            <p style="margin: 4px 0 0 0;">Pinnacle Health & Wellness Clinic · Windsor, Ontario</p>
          </div>
        </div>
      `;

      // Check if SMTP or customized environment variables are set for email dispatching
      const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

      if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
        console.log(`Sending real booking request email to ${recipientEmail} via SMTP...`);
        
        // Setup transporter with TLS options optimized for Office 365 / standard SMTP servers
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: parseInt(SMTP_PORT || '587', 10),
          secure: parseInt(SMTP_PORT || '587', 10) === 465, // true for port 465, false for other ports
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
          tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
          },
          requireTLS: true
        });

        // Send email
        const info = await transporter.sendMail({
          from: SMTP_FROM || `"Pinnacle Bookings" <${SMTP_USER}>`,
          to: recipientEmail,
          replyTo: `"${fname} ${lname}" <${email}>`,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        });

        console.log('Email sent successfully. MessageID:', info.messageId);
        res.status(200).json({ success: true, emailSent: true, messageId: info.messageId });
      } else {
        // Fallback for development/preview sandbox where credentials aren't yet filled
        console.warn('--------------------------------------------------');
        console.warn('⚠️ EMAIL DISPATCH CREDENTIALS NOT CONFIGURED YET ⚠️');
        console.warn('Add SMTP_HOST, SMTP_USER, SMTP_PASS, and SMTP_FROM in Secrets panel.');
        console.warn(`Recipient: ${recipientEmail}`);
        console.warn(`Subject: ${emailSubject}`);
        console.warn(`Message: ${emailText}`);
        console.warn('--------------------------------------------------');
        
        res.status(200).json({ 
          success: true, 
          emailSent: false, 
          devMode: true,
          message: 'Booking saved successfully! Note: Configure SMTP keys in the Secrets panel to enable live email delivery.'
        });
      }
    } catch (error: any) {
      console.error('Error handling booking request / dispatching email:', error);
      res.status(500).json({ error: error.message || 'Internal server error', details: error.message || error });
    }
  });

  // Setup Vite development middleware OR serve production compiled static files
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite development server middleware mounted.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving compiled production static assets from dist.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
