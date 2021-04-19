import React from 'react';

import FullPageForm from '../full-page-form.jsx'
import FormField from '../_form-field.jsx'
//import Countries from '../static/data/countries.json'
import { getLeadSourceDetailForForm } from '../../utils/lead-utils.js'
// import Select from 'react-select';


const ContactUs = ({ item }) => {

	item = item.customFields;
	console.log('item.customFields', item);


	// var countryOptions = Countries.map(country => {
	// 	return <div key={country.country} className="option"><button onClick={getCountryValue}>{country.country}</button></div>

	// });

	// const roleOptions = [
	// 	{ value: "C-Suite", label: "C-Suite" },
	// 	{ value: "Marketer", label: "Marketer" },
	// 	{ value: "Procurement", label: "Procurement" },
	// 	{ value: "Developer", label: "Developer" },
	// 	{ value: "IT", label: "IT" },
	// 	{ value: "Partner", label: "Partner" }
	// ];

	// const handleRoleChange = selectedOption => {
	// 	document.getElementById("role").value = selectedOption.value;
	// };

	// const customStyles = {

	// 	control: (provided) => {

	// 		const obj = {
	// 			label: "control",
	// 			alignItems: "center",
	// 			borderStyle: "solid",
	// 			borderWidth: 1,
	// 			boxShadow: null,
	// 			cursor: "default",
	// 			display: "flex",
	// 			flexWrap: "wrap",
	// 			justifyContent: "space-between",
	// 			minHeight: 38,
	// 			outline: "0 !important",
	// 			position: "relative",
	// 			transition: "all 100ms",
	// 			"&:hover": {borderColor: "hsl(0, 0%, 70%)"},
	// 			boxSizing: "border-box"
	// 		}

	// 		return obj;
	// 	}
	//   }

	return (

		<FullPageForm
			colour={item.backgroundColour}
			title={item.leftColumnTitle}
			subTitle={null}
			text={item.leftColumnBody}
			formTitle={item.rightColumnTitle}
			thanksMessage={item.thanksMessage}
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
			<FormField id="company" label={ item.companyLabel }>
				<input id="company" className="changed" type="text" placeholder={ item.companyLabel } required />
			</FormField>
			<FormField id="email" label={ item.emailLabel }>
				<input id="email" className="changed" type="email" placeholder={ item.emailLabel } required />
			</FormField>
			<FormField id="phonenumber" label={ item.phoneLabel }>
				<input id="phonenumber" className="changed" type="tel" placeholder={ item.phoneLabel } minLength="9" maxLength="20" message="Please enter your phone number." required />
			</FormField>

			{/* <FormField id="role" label="Role">

				<Select className="react-select" classNamePrefix="rs"
				styles={customStyles}
					onChange={handleRoleChange}
					options={roleOptions}
					placeholder="Role"
				/>



				<input id="role" name="role" required className="hidden" />



                </FormField>

				<FormField id="comment" label="Comment">
					<textarea id="comment" className="changed"  placeholder="Questions or Comments" ></textarea>
				</FormField> */}

				<input type="hidden" id="leadsourcedetail" name="leadsourcedetail" value={getLeadSourceDetailForForm(item.formID)} />
				<input type="hidden" name="_autopilot_session_id" />



            </FullPageForm>


        );

}
export default ContactUs;