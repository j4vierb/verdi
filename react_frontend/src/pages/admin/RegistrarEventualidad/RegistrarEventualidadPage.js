import { FormattedMessage } from "react-intl";
import EventualidadForm from "../../../components/EventualidadForm/EventualidadForm";

const RegistrarEventualidadPage = () => {
	return (<>
		<div className="purchases-title">
			<h2>
				<FormattedMessage id="admin-register-eventuality.title" />
			</h2>
		</div>
		<div className="d-flex justify-content-center my-5">
			<EventualidadForm />
		</div>
	</>);
}

export default RegistrarEventualidadPage;