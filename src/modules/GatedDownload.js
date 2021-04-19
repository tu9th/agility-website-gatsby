import React from 'react';
import FullPageForm from '../components/full-page-form.jsx'
import FormField from '../components/_form-field.jsx'

import { getLeadSourceDetailForForm } from '../utils/lead-utils.js'

import "./GatedDownload.scss"

const GatedDownload = ({ item }) => {

	item = item.customFields

	return (
		<FullPageForm
				colour={item.backgroundColour}
				title={item.leftColumnTitle}
				subTitle={null}
				text={item.leftColumnBody}
				formTitle={item.rightColumnTitle}
				conversionScript={item.conversionScript}
				redirectURL={item.redirectURL}
				postURL={item.submissionPOSTURL}
				submissionCopy={item.submissionCopy}
				submitButtonLabel={ item.submitButtonLabel }
			>
				<FormField id="firstname" label={ item.firstNameLabel }>
					<input id="firstname" className="changed" type="text" placeholder={ item.firstNameLabel } required />
				</FormField>
				<FormField id="lastname" label={ item.lastNameLabel }>
					<input id="lastname" className="changed" type="text" placeholder={ item.lastNameLabel } required />
				</FormField>
				<FormField id="email" label={ item.emailLabel }>
					<input id="email" className="changed" type="email" placeholder={ item.emailLabel } required />
				</FormField>
				<FormField id="phonenumber" label={ item.phoneLabel }>
					<input id="phonenumber" className="changed" type="tel" placeholder="XXX-XXX-XXXX" minLength="9" maxLength="20" required />
				</FormField>

				<FormField id="company" label={ item.companyLabel }>
					<input id="company" className="changed" type="text" placeholder={ item.companyLabel } required />
				</FormField>

				<input type="hidden" id="journeytrigger" name="journeytrigger" value={item.autopilotJourneyTrigger} />
				<input type="hidden" id="leadsourcedetail" name="leadsourcedetail" value={getLeadSourceDetailForForm(item.formID)} />
				<input type="hidden" name="_autopilot_session_id" />
			</FullPageForm>
	);
}

export default GatedDownload;
