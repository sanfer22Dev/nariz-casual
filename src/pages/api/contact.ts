import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { Resend } from 'resend';

export const prerender = false;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: Record<string, string>, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	});

export const POST: APIRoute = async ({ request }) => {
	const formData = await request.formData();

	const nombre = String(formData.get('nombre') ?? '').trim();
	const email = String(formData.get('email') ?? '').trim();
	const asunto = String(formData.get('asunto') ?? '').trim();
	const mensaje = String(formData.get('mensaje') ?? '').trim();
	const privacidad = String(formData.get('privacidad') ?? '').trim();
	const website = String(formData.get('website') ?? '').trim();

	if (website) {
		return json({ ok: 'true', message: 'Mensaje recibido.' });
	}

	if (!nombre || nombre.length < 2 || nombre.length > 80) {
		return json({ ok: 'false', message: 'Introduce un nombre valido.' }, 400);
	}

	if (!emailPattern.test(email) || email.length > 120) {
		return json({ ok: 'false', message: 'Introduce un email valido.' }, 400);
	}

	if (!asunto || asunto.length < 3 || asunto.length > 120) {
		return json({ ok: 'false', message: 'Introduce un asunto valido.' }, 400);
	}

	if (!mensaje || mensaje.length < 10 || mensaje.length > 4000) {
		return json({ ok: 'false', message: 'El mensaje debe tener entre 10 y 4000 caracteres.' }, 400);
	}

	if (privacidad !== 'accepted') {
		return json({ ok: 'false', message: 'Debes aceptar la politica de privacidad.' }, 400);
	}

	const resendApiKey = env.RESEND_API_KEY;
	const contactToEmail = env.CONTACT_TO_EMAIL ?? 'hola@narizcasual.com';
	const contactFromEmail = env.CONTACT_FROM_EMAIL ?? 'Nariz Casual <contact@narizcasual.com>';

	if (!resendApiKey) {
		return json({ ok: 'false', message: 'Falta configurar RESEND_API_KEY en el entorno.' }, 500);
	}

	try {
		const resend = new Resend(resendApiKey);

		await resend.emails.send({
			from: contactFromEmail,
			to: [contactToEmail],
			replyTo: email,
			subject: `[Nariz Casual] ${asunto}`,
			text: [
				`Nombre: ${nombre}`,
				`Email: ${email}`,
				`Asunto: ${asunto}`,
				'',
				'Mensaje:',
				mensaje
			].join('\n')
		});

		return json({ ok: 'true', message: 'Mensaje enviado correctamente.' });
	} catch (error) {
		console.error('Error sending contact email', error);
		return json({ ok: 'false', message: 'No se pudo enviar el mensaje. Intentalo de nuevo mas tarde.' }, 500);
	}
};