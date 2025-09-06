import { allure } from "allure-playwright";

export class BaseFragment {
  constructor(page) {
    this.page = page;
  }
}
