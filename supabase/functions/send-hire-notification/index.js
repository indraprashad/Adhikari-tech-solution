import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();

    const isCompany = requestData.type === "company";
    const clientName = isCompany ? requestData.company_name : requestData.name;
    const clientEmail = isCompany
      ? requestData.company_email
      : requestData.email;
    const clientContact = isCompany
      ? requestData.company_contact
      : requestData.contact;

    // Email to admin (indraprashadsharma4@gmail.com)
    const adminEmailHtml = `
      <h1>New ${isCompany ? "Company" : "Personal"} Hire Request</h1>
      
      <h2>Client Information:</h2>
      <p><strong>Name:</strong> ${clientName}</p>
      <p><strong>Email:</strong> ${clientEmail}</p>
      <p><strong>Contact:</strong> ${clientContact}</p>
      <p><strong>Type:</strong> ${
        isCompany ? "Company Request" : "Personal Request"
      }</p>
      
      <h2>Project Details:</h2>
      <p><strong>Reason for hiring:</strong></p>
      <p>${requestData.reason}</p>
      
      ${
        isCompany && requestData.company_license_url
          ? `<p><strong>Company License:</strong> <a href="${requestData.company_license_url}">Download License</a></p>`
          : ""
      }
      
      <hr>
      <p>This request was submitted through your website's hire form.</p>
    `;

    // Email to client (confirmation)
    const clientEmailHtml = `
      <h1>Thank you for your project request!</h1>
      
      <p>Dear ${clientName},</p>
      
      <p>Thank you for submitting your ${
        isCompany ? "company" : "personal"
      } project request. I have received your request and will review it shortly.</p>
      
      <h2>Your Request Summary:</h2>
      <p><strong>Type:</strong> ${
        isCompany ? "Company Request" : "Personal Request"
      }</p>
      <p><strong>Contact Email:</strong> ${clientEmail}</p>
      <p><strong>Contact Number:</strong> ${clientContact}</p>
      
      <h3>Project Description:</h3>
      <p>${requestData.reason}</p>
      
      <p>I will get back to you within 24-48 hours to discuss your project requirements in detail.</p>
      
      <p>Best regards,<br>
      Indra Prasad Sharma<br>
      Adhikari Tech Solution</p>
    `;

    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Adhikari Tech <onboarding@resend.dev>",
      to: ["indraprashadsharma4@gmail.com"],
      subject: `New ${
        isCompany ? "Company" : "Personal"
      } Hire Request from ${clientName}`,
      html: adminEmailHtml,
    });

    console.log("Admin email sent:", adminEmailResponse);

    // Send confirmation email to client
    const clientEmailResponse = await resend.emails.send({
      from: "Adhikari Tech <onboarding@resend.dev>",
      to: [clientEmail],
      subject: "Your Project Request Confirmation - Adhikari Tech Solution",
      html: clientEmailHtml,
    });

    console.log("Client email sent:", clientEmailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        adminEmail: adminEmailResponse,
        clientEmail: clientEmailResponse,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error("Error in send-hire-notification function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);