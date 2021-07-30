"use strict";

const personTemplate = function(p) {
  return `
  <mj-section background-color="#fff" padding-bottom="20px" padding-top="20px">
    <mj-group>
      <mj-column>
    <mj-text align="left" color="#333" font-size="15px" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="0px"><strong>${p.name}</strong></mj-text>
      <mj-text align="left" color="#333" font-size="13px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="20px" padding-top="10px">${p.organisation}</mj-text>
      </mj-column>
    </mj-group>
    <mj-column>
    <mj-text align="left" color="#333" font-size="13px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="20px" padding-top="10px">Last contacted ${p.lastContacted}</mj-text>
    </mj-column>
    <mj-column>
    <mj-button href="mailto:${p.email}" font-family="Helvetica" background-color="#f45e43" color="white">
        E-Mail
       </mj-button>
    </mj-column>
  </mj-section>
    `
}
const sectionHead = function(title) {
  return `
   <mj-section background-color="#3e3e3e" padding-bottom="20px" padding-top="20px">
         <mj-column>
          <mj-text align="left" color="#fff" font-size="15px" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="0px"><strong>${title}</strong></mj-text>
          </mj-column>
        </mj-section>
  `
}

module.exports = {
  sectionHead,
  personTemplate,
}
