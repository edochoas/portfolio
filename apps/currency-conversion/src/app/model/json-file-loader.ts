import { ExchangeRule } from "./exchange-rule";
import { RuleLoader } from "./rule-loader";
import { join } from "path";
import { readFileSync } from "fs";

export class JSONFileLoader  implements RuleLoader {
  load(): ExchangeRule[] {
    const jsonPath = join(__dirname,  'assets', 'data.json');
    const jsonString = readFileSync(jsonPath, 'utf8');
    const rules = JSON.parse(jsonString);
    return rules;
  }
}
