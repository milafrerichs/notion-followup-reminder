"use strict";
const { Client  } = require("@notionhq/client")

class NotionQuery {
  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_SECRET,
    })
  }
  async getPagesFromNotionDatabase(database_id, query) {
    const pages = []
    let cursor = undefined

    while (true) {
      const { results, next_cursor  } = await this.notion.databases.query({
        database_id,
        start_cursor: cursor,
        filter: {
          ...query
        }
      })
      pages.push(...results)
      if (!next_cursor) {
        break
      }
      cursor = next_cursor
    }
    return pages;
  }
}

class People {
  constructor() {
    this.database_id = "***REMOVED***"
    this.notion = new NotionQuery()
    this.dateFilter = {
      "property": "Reach out next",
      "date": {
        "on_or_before": "2021-05-10T02:43:42Z"
      }
    }
  }
  async getPeople() {
    let pages = await this.notion.getPagesFromNotionDatabase(this.database_id, this.dateFilter)

    return pages.map(page => {
      const leadTypeProperty = page.properties["Lead Type"];
      const leadType = leadTypeProperty ? leadTypeProperty.select.name : "";
      const title = page.properties["Name"].title
        .map(({ plain_text  }) => plain_text)
        .join("");
      const emailProperty = page.properties["E-mail"];
      const email = emailProperty ? emailProperty.email : "";
      return {
        pageId: page.id,
        title,
        leadType,
        email,
      }
    });
  }
}

;(async function() {
  const p = new People()
  const people = await p.getPeople()
  console.log(people)
})()
