"use strict";
const { Client } = require("@notionhq/client")

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

class Person {
  constructor(properties) {
    this.properties = properties;
  }
  get email() {
    const emailProperty = this.properties["E-mail"];
    return emailProperty ? emailProperty.email : "";
  }
  get leadType() {
    const leadTypeProperty = this.properties["Lead Type"];
    return leadTypeProperty ? leadTypeProperty.select.name : "";
  }
  get buckets() {
    const bucketProperty = this.properties["Bucket"]
    if(bucketProperty) {
      return bucketProperty.multi_select.map((bucket) => bucket.name)
    }
    return [];
  }
  get picture() {
    const pictureProperty = this.properties["Picture"]
    return pictureProperty ? pictureProperty.files[0] : "";
  }
  get lastContacted() {
    const lastContactProperty = this.properties["Contacted Last Date"]
    return lastContactProperty ? lastContactProperty.formula.date : "";
  }
  get type() {
    const leadTypeProperty = this.properties["Type"];
    return leadTypeProperty ? leadTypeProperty.select.name : "";
  }
  get name() {
    return this.properties["Name"].title
      .map(({ plain_text  }) => plain_text)
      .join("");
  }
  get organisation() {
    return this.properties["Organisation"].rich_text
      .map(({ plain_text  }) => plain_text)
      .join("");
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

    return pages.map(page => new Person(page.properties));
  }
}
module.exports = {
  People
}
