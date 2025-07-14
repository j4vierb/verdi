import React, { useState } from 'react';
import { Form, Button, Card, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const EventualidadForm = () => {
	const intl = useIntl();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState('');
	const [errors, setErrors] = useState({});


	const handlePriorityChange = (val) => setPriority(val);

	let titlePlaceholder = "Ingrese el título";
	let descriptionPlaceholder = "Ingrese la descripción";
	if (intl.locale.startsWith('en')) {
		titlePlaceholder = "Enter the title";
		descriptionPlaceholder = "Enter the description";
	}

	const validateForm = () => {
		const newErrors = {};
		if (!title.trim()) newErrors.title = intl.formatMessage({ id: "admin-register-eventuality.form.error.title" });
		if (!description.trim()) newErrors.description = intl.formatMessage({ id: "admin-register-eventuality.form.error.description" });
		if (!priority) newErrors.priority = intl.formatMessage({ id: "admin-register-eventuality.form.error.priority" });

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			const eventualidadData = {
				titulo: title, // Si el backend espera "titulo"
				tipo: priority, // Debe ser 'Alta', 'Media' o 'Baja'
				fecha: new Date().toISOString(), // Fecha actual
				descripcion: description,
			};

			try {
				const response = await fetch('http://localhost:3000/api/v1/eventualidades	/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(eventualidadData),
				});

				if (!response.ok) {
					console.log(response);
					throw new Error('Error al enviar la eventualidad');
				}

				const result = await response.json();
				console.log('Respuesta del servidor:', result);

				alert('Formulario enviado con éxito');
				// navigate('/admin/notificaciones');
			} catch (error) {
				console.error('Error en la petición:', error);
				alert('Ocurrió un error al enviar los datos');
			}
		}
	};

	return (
		<Card style={{ width: '25rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Card.Header style={{ backgroundColor: '#0f3b2f', color: 'white', textAlign: 'center', width: '100%', height: "3rem", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<FormattedMessage id="admin-register-eventuality.title" />
			</Card.Header>
			<Card.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formTitle">
						<Form.Label><strong>
							<FormattedMessage id="admin-register-eventuality.form.title" />
						</strong></Form.Label>
						<Form.Control
							type="text"
							placeholder={titlePlaceholder}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							isInvalid={!!errors.title}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.title}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formDescription">
						<Form.Label><strong>
							<FormattedMessage id="admin-register-eventuality.form.description" />
						</strong></Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							placeholder={descriptionPlaceholder}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							isInvalid={!!errors.description}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.description}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label><strong>
							<FormattedMessage id="admin-register-eventuality.form.priority" />
						</strong></Form.Label>

						<ToggleButtonGroup
							type="radio"
							name="priority"
							value={priority}
							onChange={handlePriorityChange}
							className="d-flex justify-content-center"
						>
							<ToggleButton id="btn-high" variant="danger" value="Alta">
								<FormattedMessage id="admin-register-eventuality.form.priority-high" />
							</ToggleButton>
							<ToggleButton id="btn-medium" variant="warning" value="Media">
								<FormattedMessage id="admin-register-eventuality.form.priority-medium" />
							</ToggleButton>
							<ToggleButton id="btn-low" variant="success" value="Baja">
								<FormattedMessage id="admin-register-eventuality.form.priority-low" />
							</ToggleButton>
						</ToggleButtonGroup>
						{errors.priority && (
							<div className="text-danger mt-2">{errors.priority}</div>
						)}
					</Form.Group>

					<div className="d-flex justify-content-center">
						<Button variant="outline-secondary" className="mx-2">
							<Link to="/admin/notificaciones/" style={{ textDecoration: "none", color: "black" }}>
								<FormattedMessage id="admin-register-eventuality.form.cancel" />
							</Link>
						</Button>

						<Button variant="dark" type="submit">
							<FormattedMessage id="admin-register-eventuality.form.save" />
						</Button>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default EventualidadForm;