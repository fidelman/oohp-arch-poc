import { injectable } from "inversify";
import { getThinkEasy } from "./OpenApi/Methods";

export interface DataGateway {
  methods: ReturnType<typeof getThinkEasy>;
}

@injectable()
export class HttpGateway implements DataGateway {
  get methods() {
    return getThinkEasy();
  }
}
