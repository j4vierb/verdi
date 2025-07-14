import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import "./RegistrarPagoPage.css"

const RegistrarPagoPage = () => {
	const [formData, setFormData] = useState({
		cardType: "",
		cardNumber: "",
		expirationMonth: "",
		expirationYear: "",
		cvn: ""
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const newErrors = {};
		const currentYear = new Date().getFullYear();

		if (!formData.cardType) newErrors.cardType = true;
		if (!/^[0-9]{16}$/.test(formData.cardNumber)) newErrors.cardNumber = true;
		if (formData.expirationMonth < 1 || formData.expirationMonth > 12) newErrors.expirationMonth = "Mes inválido";
		if (formData.expirationYear < currentYear) newErrors.expirationYear = "Año inválido";
		if (!/^[0-9]{3,4}$/.test(formData.cvn)) newErrors.cvn = "CVN inválido";

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			alert("Pago registrado con éxito");
		}
	};

	return (<>
		<div className="purchases-title">
			<h2><FormattedMessage id="register-payment-method.title" /></h2>
		</div>
		<div className="d-flex justify-content-center">
			<Form className="payment-form m-5 p-4 border rounded bg-light" onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label className="fw-bold">
						<FormattedMessage id="register-payment-method.card-type" />
					</Form.Label>
					<div>
						{["Visa", "Mastercard", "Amex", "Diners"].map((type) => (
							<Form.Check
								key={type}
								inline
								label={type}
								type="radio"
								name="cardType"
								value={type}
								onChange={handleChange}
							/>
						))}
					</div>
					{errors.cardType && <div className="text-danger">
						<FormattedMessage id="register-payment-method.errors.card-type" />	
					</div>}
				</Form.Group>

				<Form.Group className="mt-3">
					<Form.Label>
						<FormattedMessage id="register-payment-method.card-number" />
					</Form.Label>
					<Form.Control
						type="text"
						name="cardNumber"
						placeholder="409* **** **** ****"
						value={formData.cardNumber}
						onChange={handleChange}
					/>
					{errors.cardNumber && 
						<div className="text-danger">
							<FormattedMessage id="register-payment-method.errors.card-number" />	
						</div>}
				</Form.Group>

				<Row className="mt-3">
					<Col>
						<Form.Group>
							<Form.Label>
								<FormattedMessage id="register-payment-method.expiration-month" />
							</Form.Label>
							<Form.Control
								type="number"
								name="expirationMonth"
								placeholder="Mes"
								value={formData.expirationMonth}
								onChange={handleChange}
							/>
							{errors.expirationMonth && <div className="text-danger">
								<FormattedMessage id="register-payment-method.errors.expiration-month" />
							</div>}
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label>
								<FormattedMessage id="register-payment-method.expiration-year" />
							</Form.Label>
							<Form.Control
								type="number"
								name="expirationYear"
								placeholder="Año"
								value={formData.expirationYear}
								onChange={handleChange}
							/>
							{errors.expirationYear && <div className="text-danger">
								<FormattedMessage id="register-payment-method.errors.expiration-year" />
							</div>}
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label>CVN</Form.Label>
							<Form.Control
								type="password"
								name="cvn"
								placeholder="***"
								value={formData.cvn}
								onChange={handleChange}
							/>
							{errors.cvn && <div className="text-danger">
								<FormattedMessage id="register-payment-method.errors.cvn" />	
							</div>}
						</Form.Group>
					</Col>
				</Row>

				<div className="mt-4 form-options d-flex justify-content-center">
					<Button className="me-3" variant="outline-dark" type="button">
						<FormattedMessage id="register-payment-method.cancel" />
					</Button>
					<Button variant="dark" type="submit">
						<FormattedMessage id="register-payment-method.submit" />
					</Button>
				</div>
			</Form>
		</div>
	</>);
}

export default RegistrarPagoPage;