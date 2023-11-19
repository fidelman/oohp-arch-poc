import { Types } from "./Types";
import { BaseIOC } from "./BaseIOC";
import { HttpGateway } from "../Core/HttpGateway";
import { RouterGateway } from "../Routing/RouterGateway";

export const container = new BaseIOC().buildBaseTemplate();

container.bind(Types.IDataGateway).to(HttpGateway).inSingletonScope();
container.bind(Types.IRouterGateway).to(RouterGateway).inSingletonScope();
