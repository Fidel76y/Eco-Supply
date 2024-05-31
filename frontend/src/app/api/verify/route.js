// app/actions/contact.ts
import nodemailer from "nodemailer";

export async function POST(request) {
	const { name, email, message, file, address, role } = await request.json();

	const transporter = nodemailer.createTransport({
		service: "gmail", 
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
	});

	const messageData = {
		message,
		address,
		role,
	};

	const mailOptions = {
		from: email,
		to: process.env.EMAIL_TO,
		subject: `New Verification Request Submission from ${name}`,
		text: JSON.stringify(messageData),
		attachments: [
			{
				filename: file.name,
				path: file.path,
				contentType: file.type,
			},
		],
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Message sent: %s", info.messageId);
		return new Response("Email sent successfully", { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
