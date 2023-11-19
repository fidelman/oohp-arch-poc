import { Types } from "./Types";
import { BaseIOC } from "./BaseIOC";
import { HttpGateway } from "../Core/HttpGateway";

export const container = new BaseIOC().buildBaseTemplate();

container.bind(Types.IDataGateway).to(HttpGateway).inSingletonScope();
