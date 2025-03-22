import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import "dotenv/config";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  const { email, name } = await req.json();

  if (!email || !name) {
    return NextResponse.json(
      { error: "Email and Name are required" },
      { status: 400 }
    );
  }

  try {
    // Step 1: Create Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    const filePath = path.join(
      process.cwd(),
      "private/docs/Prateek_Abbi_Resume.pdf"
    );

    // Step 2: Configure Email with PDF Attachment
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: email,
      subject:
        "Guidance for Full Stack | Data Analysis role",
      html: `
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p style="color: #000">Dear ${name},</p>

            <p style="color: #000">I hope you are doing well. My name is <strong>Prateek Abbi</strong>, and I recently graduated with a Master’s degree in Computer Science from the <strong>University of Florida</strong> (December 2024), achieving a <strong>GPA of 3.76</strong>. I am reaching out to seek your valuable guidance for full-stack or data analysis role.</p>

            <h3 style="color: #0056b3;">About Me</h3>
            <p style="color: #000">I have a strong foundation in machine learning and data science, further strengthened by completing <strong>Google’s Data Analytics Professional Certificate</strong>. This certification has equipped me with expertise in <strong>data visualization, statistical analysis, and database management</strong>, all of which I have applied to real-world projects.</p>

            <p style="color: #000">During my time at the <strong>Florida Institute for Cybersecurity and Research</strong>, I contributed to the development of an <strong>AI model for detecting false positives in thermal images</strong> using the FLIR Thermal dataset. Leveraging <strong>PyTorch, NumPy, Pandas, and YOLOv5</strong> for object detection, I ensured efficient and accurate model performance.</p>

            <p style="color: #000">In addition to my experience in data science and machine learning, I have hands-on expertise in full-stack development. At <strong>MindKind Inc.</strong>, I led the development of a backend system using <strong>TypeScript, Node.js, and Firebase</strong>. Alongside designing secure and optimized APIs, I have also built a dashboard with <strong>Next.js</strong> to enhance data visualization for users. Moreover, I have experience working with <strong>MongoDB and PostgreSQL</strong> to efficiently manage and retrieve over 1 TB of stock data.</p>

            <h3 style="color: #0056b3;">Projects & Certificates</h3>
            <a href="https://propolis.now/" style="color: #0056b3;">Propolis</a> |
            <a href="https://prateekabbi.netlify.app/" style="color: #0056b3;">Portfolio</a> |
            <a href="https://nextecomstore.vercel.app/" style="color: #0056b3;">Ecommerce Store</a> |
            <a href="https://nextecomadmin.vercel.app/" style="color: #0056b3;">Ecommerce Admin</a> |
            <a href="https://github.com/PrateekAbbi/chat-app.git" style="color: #0056b3;">Chat App</a> |
            <a href="https://github.com/PrateekAbbi/cyclistic-case-study.git" style="color: #0056b3;">Cyclistic Case Study</a> |
            <a href="https://github.com/PrateekAbbi/Data-Processing-and-Augmentation.git" style="color: #0056b3;">Data Processing and Augmentation</a> |
            <a href="https://github.com/PrateekAbbi/gatorTaxi.git" style="color: #0056b3;">Gator Taxi</a> |
            <a href="https://github.com/PrateekAbbi/Computer-Architecture-Principles---CDA-5155.git" style="color: #0056b3;">RISC-V Architecture Simulation</a> |
            <a href="https://github.com/PrateekAbbi/MealsApp" style="color: #0056b3;">Meals Application</a> |
            <a href="https://github.com/PrateekAbbi/Expense-Tracker.git" style="color: #0056b3;">Expense Tracker</a> |
            <a href="https://github.com/PrateekAbbi/Distributed-Operating-System-Principles---COP-5615/tree/main/Project%201/PA1" style="color: #0056b3;">Client Server Architecture in F#</a> |
            <a href="https://github.com/PrateekAbbi/Distributed-Operating-System-Principles---COP-5615/tree/main/Project%202" style="color: #0056b3;">Chord Protocol in F#</a> |
            <a href="https://github.com/PrateekAbbi/Distributed-Operating-System-Principles---COP-5615/tree/main/Project%203" style="color: #0056b3;">Gossip Algorithm in F#</a> |
            <a href="https://www.coursera.org/account/accomplishments/verify/R24TM29VK43W" style="color: #0056b3;">Data Analysis with R Programming</a> |
            <a href="https://www.coursera.org/account/accomplishments/professional-cert/7QN9858LGCUL" style="color: #0056b3;">Google Data Analytics</a>

            <h3 style="color: #0056b3;">How You Can Help</h3>
            <p style="color: #000">Now since, I have experience through personal/academic projects, few internships, and certificates, I would really love to know how I can make my profile stand out in this tough job market.</p>
            <p style="color: #000">I would really appreciate it if you could review my profile and guide me to keep my first foot in the industry.</p>
            <p style="color: #000">I am available at your convenience for a quick zoom call. Please let me know your availability.</p>

            <p style="color: #000">Thank you for your time and consideration.</p>
            
            <p style="color: #000">
            Sincerely,<br />
            <strong>Prateek Abbi</strong> <br />
            📞 <a href="tel:+13528716444" style="color: #0056b3;">+1 (352) 871-6444</a> <br />
            ✉️ <a href="mailto:prateek26abbi@gmail.com" style="color: #0056b3;">prateek26abbi@gmail.com</a> <br />
            🔗 <a href="https://www.linkedin.com/in/prateekabbi" style="color: #0056b3;">LinkedIn</a> | <a href="https://github.com/prateekabbi" style="color: #0056b3;">GitHub</a>
            </p>
            
            <p style="color: #000"><em>Hoping for your positive response!</em></p>
        </body>
      `,
      attachments: [
        {
          filename: "Prateek_Abbi_Resume.pdf",
          content: fs.createReadStream(filePath),
          contentType: "application/pdf",
        },
      ],
    };

    // Step 3: Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
