import React from 'react';

import SingleForm from '../single-form.jsx'
import FormField from '../_form-field.jsx'
//import Countries from '../static/data/countries.json'
import { getLeadSourceDetailForForm } from '../../utils/lead-utils.js'
// import Select from 'react-select';
import './DownloadEbookForm.scss';


const DownloadEbookForm = ({ item, slug }) => {
	item = item.customFields;
	const firstNameLabel = item.firstNameLabel ?? 'First Name'
	const lastNameLabel = item.lastNameLabel ?? 'Last Name'
	const emailLabel = item.emailLabel ?? 'Email'
	const phoneLabel = item.phoneLabel ?? 'Phone'
	const companyLabel = item.companyLabel ?? 'Company'

  // const redirectUrl = item.redirectURL//.replace('##URL##', slug)
  const redirectUrl = {
    ...item.redirectURL,
    href: item.redirectURL.href.replace('##URL##', slug)
  }
  // console.log('redirectUrl', redirectUrl);
	return (
    <div className="download-form text-center">
      <h3>{ item.formTitle || `Get the Resource Title`}</h3>
      <SingleForm
        colour={item.backgroundColour}
        title={item.leftColumnTitle}
        subTitle={null}
        text={item.leftColumnBody}
        formTitle={item.rightColumnTitle}
        thanksMessage={item.thanksMessage}
        conversionScript={item.conversionScript}
        redirectURL={redirectUrl}
        postURL={item.submissionPOSTURL}
        submissionCopy={item.submissionCopy}
        submitButtonLabel={ item.submitButtonLabel }
      >
        <FormField id="firstname" label={ firstNameLabel }>
          <input id="firstname" className="changed" type="text" placeholder={ firstNameLabel } required />
        </FormField>
        <FormField id="lastname" label={ lastNameLabel }>
          <input id="lastname" className="changed" type="text" placeholder={ lastNameLabel } required />
        </FormField>
        <FormField id="company" label={ companyLabel }>
          <input id="company" className="changed" type="text" placeholder={ companyLabel } required />
        </FormField>
        <FormField id="email" label={ emailLabel }>
          <input id="email" className="changed" type="email" placeholder={ emailLabel } required />
        </FormField>
        <FormField id="phonenumber" label={ phoneLabel }>
          <input id="phonenumber" className="changed" type="tel" placeholder={ phoneLabel } minLength="9" maxLength="20" message="Please enter your phone number." required />
        </FormField>

          <input type="hidden" id="leadsourcedetail" name="leadsourcedetail" value={getLeadSourceDetailForForm(item.formID)} />
          <input type="hidden" name="_autopilot_session_id" />
      </SingleForm>
    </div>
  );

}
export default DownloadEbookForm;