import { ExchangeRule } from "./exchange-rule";

export interface RuleLoader {
  load(): ExchangeRule[]
}