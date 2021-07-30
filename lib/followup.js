"use strict";
const mjml2html = require('mjml');

const { sendEmail } = require('./email');
const { People } = require('./notion');
const { randomX } = require('./utils');
const { sectionHead, personTemplate } = require('./template');

const sendNextContactEmail = async () => {
  const p = new People();
  const people = await p.getPeople();
  const f = new FollowUp(people);
  const from = process.env.FROM_EMAIL;
  const to = process.env.TO_EMAIL;
  const subjectLine = process.env.SUBJECT_LINE;
  const result = await sendEmail(from, to, subjectLine, f.email().html )
  return result;
}

class FollowUp {
  constructor(people) {
    this.people = people;
  }
  hot(people) {
    return people.filter((person) => person.type === "Hot")
  }
  warm(people) {
    return people.filter((person) => person.type === "Warm")
  }
  cold(people) {
    return people.filter((person) => person.type === "Cold")
  }
  leads(people) {
    return people.filter((person) => person.leadType === "Lead")
  }
  oldLeads(people) {
    return people.filter((person) => person.leadType === "Old-Lead")
  }
  clients(people) {
    return people.filter((person) => person.leadType === "Client")
  }
  oldClients(people) {
    return people.filter((person) => person.leadType === "Old Client")
  }
  hotLeads(people) {
    return this.hot(this.leads(people))
  }
  warmLeads(people) {
    return this.warm(this.leads(people))
  }
  hotMjM() {
    const hotLeads = this.hotLeads(this.people)
    if(hotLeads.length > 0) {
      return `
      ${sectionHead("Hot leads")}
      ${hotLeads.map((h) => personTemplate(h))}
      `
    }
    return "";
  }
  warmMjM() {
    const warmLeads = this.warmLeads(this.people)
    if(warmLeads.length > 0) {
      return `
        ${sectionHead("Warm leads")}
        ${warmLeads.map((h) => personTemplate(h))}
      `
    }
    return "";

  }
  oldLeadsMjM() {
    return `
      ${sectionHead("Old leads")}
      ${randomX(this.oldLeads(this.people),2).map((h) => personTemplate(h))}
    `
  }
  oldClientsMjM() {
    return `
      ${sectionHead("Old Clients")}
      ${randomX(this.oldClients(this.people),2).map((h) => personTemplate(h))}
    `
  }
  currentClientsMjM() {
    return `
      ${sectionHead("Clients")}
      ${this.clients(this.people).map((h) => personTemplate(h))}
    `
  }
  email() {
    return mjml2html(`<mjml>
          <mj-body>
          <mj-section background-color="#fff" padding-bottom="20px" padding-top="20px">
                <mj-column>
                      <mj-text align="left" color="#333" font-size="15px" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="0px">You should reach out to the following leads:</mj-text>
                            </mj-column>
                                </mj-section>
            ${this.hotMjM()}
            ${this.warmMjM()}
            ${this.oldLeadsMjM()}
            ${this.oldClientsMjM()}
            ${this.currentClientsMjM()}
          </mj-body>
        </mjml>`);
  }
}
module.exports = {
  sendNextContactEmail
}
