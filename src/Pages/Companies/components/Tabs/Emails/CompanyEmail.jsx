// import React from "react";
// import EmailDetails from "../../../../Leads/components/Tabs/Emails/EmailDetails";
// import CompanyLeftPanel from "../../CompanyLeftPanel";
// import { companyTabs } from "../CompanyTabs";

// export default function CompanyEmail() {
//   return (
//     <>
//       <CompanyLeftPanel>
//         <EmailDetails tabs={companyTabs} />
//       </CompanyLeftPanel>
//     </>
//   );
// }


import React from "react";
import { useParams } from "react-router-dom";

import EmailDetails from "../../../../Leads/components/Tabs/Emails/EmailDetails";
import CompanyLeftPanel from "../../CompanyLeftPanel";
import { companyTabs } from "../CompanyTabs";


export default function CompanyEmail() {

  // Get company ID from URL
  // Example:
  // /companies/5/activity/emails
  //
  // id will be "5"

  const { id } = useParams();

  console.log("Company ID in CompanyEmail:", id);

  return (
    <>
      <CompanyLeftPanel>

        <EmailDetails
          tabs={companyTabs}
          companyId={id}
        />

      </CompanyLeftPanel>
    </>
  );
}

