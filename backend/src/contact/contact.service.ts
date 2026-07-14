import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { executeQuery } from '../config/db.config';
import nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  private static localMessages: any[] = [];
  private static nextId = 1;

  async submitContactForm(body: { name: string; email: string; subject: string; budget: string; details: string }) {
    const { name, email, subject, budget, details } = body;

    if (!name || !email || !subject || !details) {
      throw new BadRequestException('Please provide all required fields: name, email, subject, details.');
    }

    // 1. Save to Database if configured
    let savedToDb = false;
    let messageId = 0;
    const dbQuery = 'INSERT INTO messages (name, email, subject, budget, details) VALUES (?, ?, ?, ?, ?)';
    const result = await executeQuery<any>(dbQuery, [name, email, subject, budget, details]);
    if (result) {
      savedToDb = true;
      messageId = (result as any)?.insertId || Math.floor(Math.random() * 100000);
      console.log(`💾 Successfully logged secure contact submission from "${name}" to MySQL table!`);
    } else {
      messageId = ContactService.nextId++;
      ContactService.localMessages.push({
        id: messageId,
        name,
        email,
        subject,
        budget,
        details,
        created_at: new Date()
      });
      console.warn(`⚠️ MySQL not connected or table missing. Cached message in memory instead.`);
    }

    // 2. Process SMTP Emails
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || `"Muneeb Codes Portfolio" <${smtpUser || 'noreply@muneebcodes.tech'}>`;
    const receiverEmail = process.env.CONTACT_RECEIVER || 'muneebshahid765@gmail.com';

    let mailSent = false;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // Email 1: Notification to Owner
        const ownerMailOptions = {
          from: smtpFrom,
          to: receiverEmail,
          subject: `🔥 New Portfolio Lead: ${subject}`,
          html: `
            <div style="font-family: sans-serif; padding: 24px; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #fafafa;">
              <h2 style="color: #0f172a; margin-top: 0;">New Inquiry Transmitted</h2>
              <p style="font-size: 14px; color: #475569;">A prospective client has submitted an inquiry via your portfolio website (muneebcodes.tech).</p>
              
              <div style="margin: 20px 0; padding: 16px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #00f2fe;">
                <p style="margin: 8px 0; font-size: 13px;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 8px 0; font-size: 13px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p style="margin: 8px 0; font-size: 13px;"><strong>Subject:</strong> ${subject}</p>
                <p style="margin: 8px 0; font-size: 13px;"><strong>Budget:</strong> <span style="color: #0284c7; font-weight: bold;">${budget}</span></p>
                <p style="margin: 8px 0; font-size: 13px; line-height: 1.5;"><strong>Briefing / Specifications:</strong><br/>${details.replace(/\n/g, '<br/>')}</p>
              </div>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;"/>
              <p style="font-size: 11px; color: #94a3b8; font-family: monospace;">SECURE TRANSACTION LOGGED ON PORT: 3000</p>
            </div>
          `,
        };

        // Email 2: Confirmation Auto-reply to Client
        const clientMailOptions = {
          from: smtpFrom,
          to: email,
          subject: `✔ Transmission Confirmed - Muneeb Shahid`,
          html: `
            <div style="font-family: sans-serif; padding: 24px; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
              <h2 style="color: #0f172a; margin-top: 0;">Inquiry Confirmed</h2>
              <p style="font-size: 14px; color: #475569; line-height: 1.5;">Hello <strong>${name}</strong>,</p>
              <p style="font-size: 14px; color: #475569; line-height: 1.5;">Thank you for initiating a custom pipeline request. This automated message confirms that your project parameters have been decrypted, logged, and queued in my communication dashboard.</p>
              
              <p style="font-size: 14px; color: #475569; line-height: 1.5;">I am currently reviewing your briefing for the project: <strong>"${subject}"</strong>, with a budget scope of <strong>"${budget}"</strong>.</p>
              
              <p style="font-size: 14px; color: #475569; line-height: 1.5;">You can expect a direct personal response within 12 to 24 business hours to coordinate our initial alignment call.</p>
              
              <div style="margin: 24px 0; padding: 16px; background-color: #f8fafc; border-radius: 8px; font-size: 12px; color: #64748b; font-family: monospace;">
                STATUS: QUEUED FOR DIRECT RESPONSE<br/>
                LOCATION: SAN FRANCISCO, CA
              </div>
              
              <p style="font-size: 13px; color: #475569; margin-bottom: 4px;">Best regards,</p>
              <p style="font-size: 14px; color: #0f172a; font-weight: bold; margin-top: 0;">Muneeb Shahid</p>
              <p style="font-size: 11px; color: #94a3b8; margin-top: -8px;">Senior Full-Stack Developer</p>
            </div>
          `,
        };

        // Send mails
        await transporter.sendMail(ownerMailOptions);
        await transporter.sendMail(clientMailOptions);
        mailSent = true;
        console.log(`✉️ Success: SMTP emails dispatched to both administrator and client!`);
      } catch (mailError) {
        console.error('❌ Nodemailer failed to send email:', mailError.message);
      }
    } else {
      console.warn('⚠️ SMTP MAIL CREDENTIALS MISSING: SMTP_HOST, SMTP_USER, or SMTP_PASS are not specified. Mail dispatch simulated in console.');
      console.log(`[SIMULATED EMAIL TO OWNER]: to ${receiverEmail}, subject: Portfolio Lead: ${subject}, budget: ${budget}`);
      console.log(`[SIMULATED EMAIL TO SENDER]: to ${email}, subject: Alignment Confirmed`);
    }

    return {
      status: 'success',
      id: messageId,
      message: 'Transmission successfully processed.',
      savedToDb,
      mailSent
    };
  }

  async getAllMessages() {
    const query = 'SELECT * FROM messages ORDER BY id DESC';
    const rows = await executeQuery<any>(query);

    if (!rows || rows.length === 0) {
      return ContactService.localMessages;
    }

    return rows.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      subject: row.subject,
      budget: row.budget,
      details: row.details,
      created_at: row.created_at
    }));
  }

  async deleteMessage(id: any) {
    const numId = Number(id);
    const query = 'DELETE FROM messages WHERE id = ?';
    const result = await executeQuery<any>(query, [numId]);

    if (result === null) {
      const idx = ContactService.localMessages.findIndex((m: any) => Number(m.id) === numId);
      if (idx === -1) throw new NotFoundException('Message not found');
      ContactService.localMessages.splice(idx, 1);
      return { success: true };
    }

    return { success: true };
  }
}
